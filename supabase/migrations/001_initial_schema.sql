-- ============================================================
-- BlastTax CRM - Initial Database Schema
-- Migration 001: All tables, indexes, RLS policies, triggers
-- ============================================================

-- -----------------------------------------------------------
-- 0. Extensions & Utility Functions
-- -----------------------------------------------------------

CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Helper: attach the trigger to any table
CREATE OR REPLACE FUNCTION public.attach_updated_at_trigger(tbl regclass)
RETURNS void AS $$
BEGIN
  EXECUTE format(
    'CREATE TRIGGER set_updated_at BEFORE UPDATE ON %s
     FOR EACH ROW EXECUTE FUNCTION public.set_updated_at()',
    tbl
  );
END;
$$ LANGUAGE plpgsql;

-- -----------------------------------------------------------
-- 1. Enums
-- -----------------------------------------------------------

CREATE TYPE public.case_status AS ENUM (
  'intake',
  'pre_qualification',
  'screening',
  'financial_analysis',
  'resolution_planning',
  'form_preparation',
  'submitted',
  'irs_review',
  'accepted',
  'rejected',
  'in_compliance',
  'closed'
);

CREATE TYPE public.taxpayer_type AS ENUM ('individual', 'business');

CREATE TYPE public.person_type AS ENUM ('taxpayer', 'spouse');

CREATE TYPE public.filing_status_type AS ENUM (
  'single',
  'married_filing_jointly',
  'married_filing_separately',
  'head_of_household',
  'qualifying_surviving_spouse'
);

CREATE TYPE public.housing_type AS ENUM (
  'own',
  'rent',
  'other'
);

-- -----------------------------------------------------------
-- 2. Core Tables
-- -----------------------------------------------------------

-- profiles: extends auth.users
CREATE TABLE public.profiles (
  id            uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name    text,
  last_name     text,
  date_of_birth date,
  encrypted_ssn bytea,
  address_line1 text,
  address_line2 text,
  city          text,
  state         text,
  zip_code      text,
  phone         text,
  filing_status filing_status_type,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY profiles_owner ON public.profiles
  FOR ALL USING (auth.uid() = id);
SELECT public.attach_updated_at_trigger('public.profiles');

-- spouses
CREATE TABLE public.spouses (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id    uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  first_name    text,
  last_name     text,
  date_of_birth date,
  encrypted_ssn bytea,
  employer      text,
  occupation    text,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.spouses ENABLE ROW LEVEL SECURITY;
CREATE POLICY spouses_owner ON public.spouses
  FOR ALL USING (auth.uid() = profile_id);
CREATE INDEX idx_spouses_profile ON public.spouses(profile_id);
SELECT public.attach_updated_at_trigger('public.spouses');

-- dependents
CREATE TABLE public.dependents (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id    uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  first_name    text,
  last_name     text,
  date_of_birth date,
  relationship  text,
  encrypted_ssn bytea,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.dependents ENABLE ROW LEVEL SECURITY;
CREATE POLICY dependents_owner ON public.dependents
  FOR ALL USING (auth.uid() = profile_id);
CREATE INDEX idx_dependents_profile ON public.dependents(profile_id);
SELECT public.attach_updated_at_trigger('public.dependents');

-- -----------------------------------------------------------
-- 3. Cases
-- -----------------------------------------------------------

CREATE TABLE public.cases (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  taxpayer_type   taxpayer_type NOT NULL DEFAULT 'individual',
  status          case_status NOT NULL DEFAULT 'intake',
  -- business fields (nullable for individuals)
  business_name   text,
  business_ein    text,
  business_type   text,
  business_state  text,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.cases ENABLE ROW LEVEL SECURITY;
CREATE POLICY cases_owner ON public.cases
  FOR ALL USING (auth.uid() = user_id);
CREATE INDEX idx_cases_user ON public.cases(user_id);
CREATE INDEX idx_cases_status ON public.cases(status);
SELECT public.attach_updated_at_trigger('public.cases');

-- pre_qualifier_answers
CREATE TABLE public.pre_qualifier_answers (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id     uuid NOT NULL REFERENCES public.cases(id) ON DELETE CASCADE,
  question_key text NOT NULL,
  answer      boolean NOT NULL,
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now(),
  UNIQUE (case_id, question_key)
);
ALTER TABLE public.pre_qualifier_answers ENABLE ROW LEVEL SECURITY;
CREATE POLICY pqa_owner ON public.pre_qualifier_answers
  FOR ALL USING (auth.uid() = (SELECT user_id FROM public.cases WHERE id = case_id));
CREATE INDEX idx_pqa_case ON public.pre_qualifier_answers(case_id);
SELECT public.attach_updated_at_trigger('public.pre_qualifier_answers');

-- screening_results
CREATE TABLE public.screening_results (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id         uuid NOT NULL UNIQUE REFERENCES public.cases(id) ON DELETE CASCADE,
  passed          boolean NOT NULL,
  blocking_issues text[],
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.screening_results ENABLE ROW LEVEL SECURITY;
CREATE POLICY sr_owner ON public.screening_results
  FOR ALL USING (auth.uid() = (SELECT user_id FROM public.cases WHERE id = case_id));
SELECT public.attach_updated_at_trigger('public.screening_results');

-- -----------------------------------------------------------
-- 4. Tax Debts
-- -----------------------------------------------------------

CREATE TABLE public.tax_debts (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id             uuid NOT NULL REFERENCES public.cases(id) ON DELETE CASCADE,
  tax_year            integer NOT NULL,
  tax_form            text NOT NULL,
  balance             numeric(12,2) NOT NULL DEFAULT 0,
  penalty             numeric(12,2) NOT NULL DEFAULT 0,
  interest            numeric(12,2) NOT NULL DEFAULT 0,
  assessment_date     date,
  is_sfr              boolean NOT NULL DEFAULT false,
  trust_fund_portion  numeric(12,2),
  csed_date           date,
  created_at          timestamptz NOT NULL DEFAULT now(),
  updated_at          timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.tax_debts ENABLE ROW LEVEL SECURITY;
CREATE POLICY td_owner ON public.tax_debts
  FOR ALL USING (auth.uid() = (SELECT user_id FROM public.cases WHERE id = case_id));
CREATE INDEX idx_tax_debts_case ON public.tax_debts(case_id);
SELECT public.attach_updated_at_trigger('public.tax_debts');

-- tolling_events
CREATE TABLE public.tolling_events (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tax_debt_id   uuid NOT NULL REFERENCES public.tax_debts(id) ON DELETE CASCADE,
  event_type    text NOT NULL CHECK (event_type IN (
    'oic_pending', 'bankruptcy', 'cdp_hearing', 'innocent_spouse',
    'military_deferment', 'litigation', 'other'
  )),
  start_date    date NOT NULL,
  end_date      date,
  notes         text,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.tolling_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY te_owner ON public.tolling_events
  FOR ALL USING (auth.uid() = (
    SELECT c.user_id FROM public.cases c
    JOIN public.tax_debts td ON td.case_id = c.id
    WHERE td.id = tax_debt_id
  ));
CREATE INDEX idx_tolling_tax_debt ON public.tolling_events(tax_debt_id);
SELECT public.attach_updated_at_trigger('public.tolling_events');

-- -----------------------------------------------------------
-- 5. Financial - Personal Info & Employment
-- -----------------------------------------------------------

CREATE TABLE public.case_personal_info (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id         uuid NOT NULL UNIQUE REFERENCES public.cases(id) ON DELETE CASCADE,
  address_line1   text,
  address_line2   text,
  city            text,
  state           text,
  zip_code        text,
  county          text,
  household_size  integer NOT NULL DEFAULT 1,
  members_under_17 integer NOT NULL DEFAULT 0,
  members_65_plus  integer NOT NULL DEFAULT 0,
  housing_type    housing_type,
  num_vehicles    integer NOT NULL DEFAULT 0,
  census_region   text,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.case_personal_info ENABLE ROW LEVEL SECURITY;
CREATE POLICY cpi_owner ON public.case_personal_info
  FOR ALL USING (auth.uid() = (SELECT user_id FROM public.cases WHERE id = case_id));
SELECT public.attach_updated_at_trigger('public.case_personal_info');

CREATE TABLE public.employment_records (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id         uuid NOT NULL REFERENCES public.cases(id) ON DELETE CASCADE,
  person          person_type NOT NULL DEFAULT 'taxpayer',
  employer_name   text,
  employer_address text,
  occupation      text,
  years_employed  integer,
  is_current      boolean NOT NULL DEFAULT true,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.employment_records ENABLE ROW LEVEL SECURITY;
CREATE POLICY er_owner ON public.employment_records
  FOR ALL USING (auth.uid() = (SELECT user_id FROM public.cases WHERE id = case_id));
CREATE INDEX idx_employment_case ON public.employment_records(case_id);
SELECT public.attach_updated_at_trigger('public.employment_records');

-- -----------------------------------------------------------
-- 6. Assets (8 tables)
-- -----------------------------------------------------------

-- bank_accounts
CREATE TABLE public.bank_accounts (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id         uuid NOT NULL REFERENCES public.cases(id) ON DELETE CASCADE,
  institution     text,
  account_type    text,
  current_balance numeric(12,2) NOT NULL DEFAULT 0,
  computed_qsv    numeric(12,2),
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.bank_accounts ENABLE ROW LEVEL SECURITY;
CREATE POLICY ba_owner ON public.bank_accounts
  FOR ALL USING (auth.uid() = (SELECT user_id FROM public.cases WHERE id = case_id));
CREATE INDEX idx_bank_accounts_case ON public.bank_accounts(case_id);
SELECT public.attach_updated_at_trigger('public.bank_accounts');

-- investments
CREATE TABLE public.investments (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id         uuid NOT NULL REFERENCES public.cases(id) ON DELETE CASCADE,
  institution     text,
  investment_type text,
  current_value   numeric(12,2) NOT NULL DEFAULT 0,
  loan_balance    numeric(12,2) NOT NULL DEFAULT 0,
  computed_qsv    numeric(12,2),
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.investments ENABLE ROW LEVEL SECURITY;
CREATE POLICY inv_owner ON public.investments
  FOR ALL USING (auth.uid() = (SELECT user_id FROM public.cases WHERE id = case_id));
CREATE INDEX idx_investments_case ON public.investments(case_id);
SELECT public.attach_updated_at_trigger('public.investments');

-- retirement_accounts
CREATE TABLE public.retirement_accounts (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id         uuid NOT NULL REFERENCES public.cases(id) ON DELETE CASCADE,
  institution     text,
  account_type    text,
  current_value   numeric(12,2) NOT NULL DEFAULT 0,
  loan_balance    numeric(12,2) NOT NULL DEFAULT 0,
  computed_qsv    numeric(12,2),
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.retirement_accounts ENABLE ROW LEVEL SECURITY;
CREATE POLICY ra_owner ON public.retirement_accounts
  FOR ALL USING (auth.uid() = (SELECT user_id FROM public.cases WHERE id = case_id));
CREATE INDEX idx_retirement_case ON public.retirement_accounts(case_id);
SELECT public.attach_updated_at_trigger('public.retirement_accounts');

-- real_estate
CREATE TABLE public.real_estate (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id           uuid NOT NULL REFERENCES public.cases(id) ON DELETE CASCADE,
  property_type     text,
  property_address  text,
  fair_market_value numeric(12,2) NOT NULL DEFAULT 0,
  mortgage_balance  numeric(12,2) NOT NULL DEFAULT 0,
  monthly_payment   numeric(12,2) NOT NULL DEFAULT 0,
  is_primary        boolean NOT NULL DEFAULT false,
  computed_qsv      numeric(12,2),
  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.real_estate ENABLE ROW LEVEL SECURITY;
CREATE POLICY re_owner ON public.real_estate
  FOR ALL USING (auth.uid() = (SELECT user_id FROM public.cases WHERE id = case_id));
CREATE INDEX idx_real_estate_case ON public.real_estate(case_id);
SELECT public.attach_updated_at_trigger('public.real_estate');

-- vehicles
CREATE TABLE public.vehicles (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id         uuid NOT NULL REFERENCES public.cases(id) ON DELETE CASCADE,
  year            integer,
  make            text,
  model           text,
  mileage         integer,
  fair_market_value numeric(12,2) NOT NULL DEFAULT 0,
  loan_balance    numeric(12,2) NOT NULL DEFAULT 0,
  monthly_payment numeric(12,2) NOT NULL DEFAULT 0,
  computed_qsv    numeric(12,2),
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
CREATE POLICY veh_owner ON public.vehicles
  FOR ALL USING (auth.uid() = (SELECT user_id FROM public.cases WHERE id = case_id));
CREATE INDEX idx_vehicles_case ON public.vehicles(case_id);
SELECT public.attach_updated_at_trigger('public.vehicles');

-- life_insurance_policies
CREATE TABLE public.life_insurance_policies (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id         uuid NOT NULL REFERENCES public.cases(id) ON DELETE CASCADE,
  provider        text,
  policy_type     text,
  face_value      numeric(12,2) NOT NULL DEFAULT 0,
  cash_value      numeric(12,2) NOT NULL DEFAULT 0,
  loan_balance    numeric(12,2) NOT NULL DEFAULT 0,
  computed_qsv    numeric(12,2),
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.life_insurance_policies ENABLE ROW LEVEL SECURITY;
CREATE POLICY lip_owner ON public.life_insurance_policies
  FOR ALL USING (auth.uid() = (SELECT user_id FROM public.cases WHERE id = case_id));
CREATE INDEX idx_life_insurance_case ON public.life_insurance_policies(case_id);
SELECT public.attach_updated_at_trigger('public.life_insurance_policies');

-- crypto_assets
CREATE TABLE public.crypto_assets (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id         uuid NOT NULL REFERENCES public.cases(id) ON DELETE CASCADE,
  platform        text,
  asset_name      text,
  quantity         numeric,
  current_value   numeric(12,2) NOT NULL DEFAULT 0,
  computed_qsv    numeric(12,2),
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.crypto_assets ENABLE ROW LEVEL SECURITY;
CREATE POLICY ca_owner ON public.crypto_assets
  FOR ALL USING (auth.uid() = (SELECT user_id FROM public.cases WHERE id = case_id));
CREATE INDEX idx_crypto_case ON public.crypto_assets(case_id);
SELECT public.attach_updated_at_trigger('public.crypto_assets');

-- other_assets
CREATE TABLE public.other_assets (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id         uuid NOT NULL REFERENCES public.cases(id) ON DELETE CASCADE,
  description     text,
  asset_type      text,
  fair_market_value numeric(12,2) NOT NULL DEFAULT 0,
  loan_balance    numeric(12,2) NOT NULL DEFAULT 0,
  computed_qsv    numeric(12,2),
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.other_assets ENABLE ROW LEVEL SECURITY;
CREATE POLICY oa_owner ON public.other_assets
  FOR ALL USING (auth.uid() = (SELECT user_id FROM public.cases WHERE id = case_id));
CREATE INDEX idx_other_assets_case ON public.other_assets(case_id);
SELECT public.attach_updated_at_trigger('public.other_assets');

-- -----------------------------------------------------------
-- 7. Income & Expenses
-- -----------------------------------------------------------

CREATE TABLE public.income_records (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id         uuid NOT NULL REFERENCES public.cases(id) ON DELETE CASCADE,
  person          person_type NOT NULL DEFAULT 'taxpayer',
  income_type     text NOT NULL CHECK (income_type IN (
    'wages', 'self_employment', 'social_security', 'pension',
    'rental', 'interest_dividends', 'alimony', 'child_support',
    'unemployment', 'disability', 'other'
  )),
  source          text,
  gross_monthly   numeric(12,2) NOT NULL DEFAULT 0,
  federal_tax_withholding  numeric(12,2) NOT NULL DEFAULT 0,
  state_tax_withholding    numeric(12,2) NOT NULL DEFAULT 0,
  fica_withholding         numeric(12,2) NOT NULL DEFAULT 0,
  other_withholding        numeric(12,2) NOT NULL DEFAULT 0,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.income_records ENABLE ROW LEVEL SECURITY;
CREATE POLICY ir_owner ON public.income_records
  FOR ALL USING (auth.uid() = (SELECT user_id FROM public.cases WHERE id = case_id));
CREATE INDEX idx_income_case ON public.income_records(case_id);
SELECT public.attach_updated_at_trigger('public.income_records');

CREATE TABLE public.expense_records (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id             uuid NOT NULL REFERENCES public.cases(id) ON DELETE CASCADE,
  category            text NOT NULL CHECK (category IN (
    'food_clothing_misc', 'housing_and_utilities', 'transportation_ownership',
    'transportation_operating', 'public_transportation', 'health_insurance',
    'oop_healthcare', 'court_ordered_payments', 'child_dependent_care',
    'term_life_insurance', 'taxes_fica_medicare', 'secured_debts',
    'student_loans', 'union_dues', 'other_necessary', 'conditional'
  )),
  actual_amount       numeric(12,2) NOT NULL DEFAULT 0,
  irs_allowable_amount numeric(12,2),
  notes               text,
  created_at          timestamptz NOT NULL DEFAULT now(),
  updated_at          timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.expense_records ENABLE ROW LEVEL SECURITY;
CREATE POLICY exp_owner ON public.expense_records
  FOR ALL USING (auth.uid() = (SELECT user_id FROM public.cases WHERE id = case_id));
CREATE INDEX idx_expenses_case ON public.expense_records(case_id);
SELECT public.attach_updated_at_trigger('public.expense_records');

CREATE TABLE public.housing_expense_details (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id           uuid NOT NULL REFERENCES public.cases(id) ON DELETE CASCADE,
  rent_or_mortgage  numeric(12,2) NOT NULL DEFAULT 0,
  property_tax      numeric(12,2) NOT NULL DEFAULT 0,
  homeowners_insurance numeric(12,2) NOT NULL DEFAULT 0,
  hoa_fees          numeric(12,2) NOT NULL DEFAULT 0,
  utilities_electric numeric(12,2) NOT NULL DEFAULT 0,
  utilities_gas     numeric(12,2) NOT NULL DEFAULT 0,
  utilities_water   numeric(12,2) NOT NULL DEFAULT 0,
  utilities_trash   numeric(12,2) NOT NULL DEFAULT 0,
  utilities_phone   numeric(12,2) NOT NULL DEFAULT 0,
  utilities_internet numeric(12,2) NOT NULL DEFAULT 0,
  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.housing_expense_details ENABLE ROW LEVEL SECURITY;
CREATE POLICY hed_owner ON public.housing_expense_details
  FOR ALL USING (auth.uid() = (SELECT user_id FROM public.cases WHERE id = case_id));
CREATE INDEX idx_housing_exp_case ON public.housing_expense_details(case_id);
SELECT public.attach_updated_at_trigger('public.housing_expense_details');

CREATE TABLE public.transportation_expense_details (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id           uuid NOT NULL REFERENCES public.cases(id) ON DELETE CASCADE,
  vehicle_number    integer NOT NULL DEFAULT 1,
  loan_or_lease     numeric(12,2) NOT NULL DEFAULT 0,
  insurance         numeric(12,2) NOT NULL DEFAULT 0,
  fuel              numeric(12,2) NOT NULL DEFAULT 0,
  maintenance       numeric(12,2) NOT NULL DEFAULT 0,
  registration      numeric(12,2) NOT NULL DEFAULT 0,
  parking_tolls     numeric(12,2) NOT NULL DEFAULT 0,
  public_transit    numeric(12,2) NOT NULL DEFAULT 0,
  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.transportation_expense_details ENABLE ROW LEVEL SECURITY;
CREATE POLICY ted_owner ON public.transportation_expense_details
  FOR ALL USING (auth.uid() = (SELECT user_id FROM public.cases WHERE id = case_id));
CREATE INDEX idx_transport_exp_case ON public.transportation_expense_details(case_id);
SELECT public.attach_updated_at_trigger('public.transportation_expense_details');

-- -----------------------------------------------------------
-- 8. Business Financials & Assets
-- -----------------------------------------------------------

CREATE TABLE public.business_financials (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id         uuid NOT NULL UNIQUE REFERENCES public.cases(id) ON DELETE CASCADE,
  gross_revenue   numeric(12,2) NOT NULL DEFAULT 0,
  payroll          numeric(12,2) NOT NULL DEFAULT 0,
  cost_of_goods_sold numeric(12,2) NOT NULL DEFAULT 0,
  accounts_receivable numeric(12,2) NOT NULL DEFAULT 0,
  inventory       numeric(12,2) NOT NULL DEFAULT 0,
  other_expenses  numeric(12,2) NOT NULL DEFAULT 0,
  net_income      numeric(12,2) NOT NULL DEFAULT 0,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.business_financials ENABLE ROW LEVEL SECURITY;
CREATE POLICY bf_owner ON public.business_financials
  FOR ALL USING (auth.uid() = (SELECT user_id FROM public.cases WHERE id = case_id));
SELECT public.attach_updated_at_trigger('public.business_financials');

CREATE TABLE public.business_assets (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id         uuid NOT NULL REFERENCES public.cases(id) ON DELETE CASCADE,
  description     text,
  asset_type      text,
  fair_market_value numeric(12,2) NOT NULL DEFAULT 0,
  loan_balance    numeric(12,2) NOT NULL DEFAULT 0,
  computed_qsv    numeric(12,2),
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.business_assets ENABLE ROW LEVEL SECURITY;
CREATE POLICY basset_owner ON public.business_assets
  FOR ALL USING (auth.uid() = (SELECT user_id FROM public.cases WHERE id = case_id));
CREATE INDEX idx_business_assets_case ON public.business_assets(case_id);
SELECT public.attach_updated_at_trigger('public.business_assets');

-- -----------------------------------------------------------
-- 9. Calculated Results & Eligibility
-- -----------------------------------------------------------

CREATE TABLE public.calculated_results (
  id                    uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id               uuid NOT NULL UNIQUE REFERENCES public.cases(id) ON DELETE CASCADE,
  total_nre             numeric(12,2),
  mdi                   numeric(12,2),
  rcp_lump_sum          numeric(12,2),
  rcp_periodic          numeric(12,2),
  qsv_breakdown         jsonb,
  expense_breakdown     jsonb,
  is_low_income         boolean NOT NULL DEFAULT false,
  oic_minimum_offer     numeric(12,2),
  ia_recommended_type   text,
  created_at            timestamptz NOT NULL DEFAULT now(),
  updated_at            timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.calculated_results ENABLE ROW LEVEL SECURITY;
CREATE POLICY cr_owner ON public.calculated_results
  FOR ALL USING (auth.uid() = (SELECT user_id FROM public.cases WHERE id = case_id));
SELECT public.attach_updated_at_trigger('public.calculated_results');

CREATE TABLE public.eligibility_results (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id         uuid NOT NULL REFERENCES public.cases(id) ON DELETE CASCADE,
  program_type    text NOT NULL CHECK (program_type IN (
    'oic_lump_sum', 'oic_periodic', 'ia_streamlined', 'ia_non_streamlined',
    'ia_partial_pay', 'currently_not_collectible', 'penalty_abatement',
    'innocent_spouse', 'statute_expiration', 'bankruptcy_discharge',
    'audit_reconsideration', 'installment_agreement', 'fresh_start'
  )),
  is_eligible     boolean NOT NULL DEFAULT false,
  confidence      numeric(5,2),
  reasons         text[],
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now(),
  UNIQUE (case_id, program_type)
);
ALTER TABLE public.eligibility_results ENABLE ROW LEVEL SECURITY;
CREATE POLICY eligr_owner ON public.eligibility_results
  FOR ALL USING (auth.uid() = (SELECT user_id FROM public.cases WHERE id = case_id));
CREATE INDEX idx_eligibility_case ON public.eligibility_results(case_id);
SELECT public.attach_updated_at_trigger('public.eligibility_results');

CREATE TABLE public.resolution_recommendations (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id         uuid NOT NULL REFERENCES public.cases(id) ON DELETE CASCADE,
  priority        integer NOT NULL DEFAULT 1,
  program         text NOT NULL,
  reasoning       text,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.resolution_recommendations ENABLE ROW LEVEL SECURITY;
CREATE POLICY rr_owner ON public.resolution_recommendations
  FOR ALL USING (auth.uid() = (SELECT user_id FROM public.cases WHERE id = case_id));
CREATE INDEX idx_resolution_recs_case ON public.resolution_recommendations(case_id);
SELECT public.attach_updated_at_trigger('public.resolution_recommendations');

-- -----------------------------------------------------------
-- 10. Plans & Forms
-- -----------------------------------------------------------

CREATE TABLE public.resolution_plans (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id         uuid NOT NULL REFERENCES public.cases(id) ON DELETE CASCADE,
  resolution_type text NOT NULL,
  status          text NOT NULL DEFAULT 'draft' CHECK (status IN (
    'draft', 'pending_review', 'approved', 'submitted', 'accepted',
    'rejected', 'withdrawn', 'completed'
  )),
  notes           text,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.resolution_plans ENABLE ROW LEVEL SECURITY;
CREATE POLICY rp_owner ON public.resolution_plans
  FOR ALL USING (auth.uid() = (SELECT user_id FROM public.cases WHERE id = case_id));
CREATE INDEX idx_resolution_plans_case ON public.resolution_plans(case_id);
SELECT public.attach_updated_at_trigger('public.resolution_plans');

CREATE TABLE public.form_submissions (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id           uuid NOT NULL REFERENCES public.cases(id) ON DELETE CASCADE,
  form_type         text NOT NULL,
  form_field_data   jsonb,
  pdf_storage_path  text,
  submission_status text NOT NULL DEFAULT 'draft' CHECK (submission_status IN (
    'draft', 'generating', 'ready', 'submitted', 'accepted', 'rejected'
  )),
  submitted_at      timestamptz,
  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.form_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY fs_owner ON public.form_submissions
  FOR ALL USING (auth.uid() = (SELECT user_id FROM public.cases WHERE id = case_id));
CREATE INDEX idx_form_submissions_case ON public.form_submissions(case_id);
SELECT public.attach_updated_at_trigger('public.form_submissions');

CREATE TABLE public.submission_milestones (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  form_id         uuid NOT NULL REFERENCES public.form_submissions(id) ON DELETE CASCADE,
  milestone_name  text NOT NULL,
  status          text NOT NULL DEFAULT 'pending',
  completed_at    timestamptz,
  notes           text,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.submission_milestones ENABLE ROW LEVEL SECURITY;
CREATE POLICY sm_owner ON public.submission_milestones
  FOR ALL USING (auth.uid() = (
    SELECT c.user_id FROM public.cases c
    JOIN public.form_submissions fs ON fs.case_id = c.id
    WHERE fs.id = form_id
  ));
CREATE INDEX idx_milestones_form ON public.submission_milestones(form_id);
SELECT public.attach_updated_at_trigger('public.submission_milestones');

-- -----------------------------------------------------------
-- 11. TFRP (Trust Fund Recovery Penalty)
-- -----------------------------------------------------------

CREATE TABLE public.responsible_persons (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id         uuid NOT NULL REFERENCES public.cases(id) ON DELETE CASCADE,
  first_name      text,
  last_name       text,
  encrypted_ssn   bytea,
  title           text,
  ownership_pct   numeric(5,2),
  authority_sign_checks    boolean NOT NULL DEFAULT false,
  authority_hire_fire      boolean NOT NULL DEFAULT false,
  authority_payroll        boolean NOT NULL DEFAULT false,
  authority_tax_reporting  boolean NOT NULL DEFAULT false,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.responsible_persons ENABLE ROW LEVEL SECURITY;
CREATE POLICY rpers_owner ON public.responsible_persons
  FOR ALL USING (auth.uid() = (SELECT user_id FROM public.cases WHERE id = case_id));
CREATE INDEX idx_responsible_persons_case ON public.responsible_persons(case_id);
SELECT public.attach_updated_at_trigger('public.responsible_persons');

CREATE TABLE public.tfrp_assessments (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id             uuid NOT NULL REFERENCES public.cases(id) ON DELETE CASCADE,
  responsible_person_id uuid NOT NULL REFERENCES public.responsible_persons(id) ON DELETE CASCADE,
  tax_period          text NOT NULL,
  trust_fund_amount   numeric(12,2) NOT NULL DEFAULT 0,
  assessment_status   text,
  protest_filed       boolean NOT NULL DEFAULT false,
  protest_date        date,
  notes               text,
  created_at          timestamptz NOT NULL DEFAULT now(),
  updated_at          timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.tfrp_assessments ENABLE ROW LEVEL SECURITY;
CREATE POLICY tfrp_owner ON public.tfrp_assessments
  FOR ALL USING (auth.uid() = (SELECT user_id FROM public.cases WHERE id = case_id));
CREATE INDEX idx_tfrp_case ON public.tfrp_assessments(case_id);
CREATE INDEX idx_tfrp_person ON public.tfrp_assessments(responsible_person_id);
SELECT public.attach_updated_at_trigger('public.tfrp_assessments');

-- -----------------------------------------------------------
-- 12. Reference Tables (public read, no RLS write)
-- -----------------------------------------------------------

CREATE TABLE public.irs_national_standards (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  effective_year  integer NOT NULL,
  category        text NOT NULL,
  income_low      numeric(12,2),
  income_high     numeric(12,2),
  family_size     integer NOT NULL,
  allowance       numeric(12,2) NOT NULL,
  created_at      timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.irs_national_standards ENABLE ROW LEVEL SECURITY;
CREATE POLICY ins_public_read ON public.irs_national_standards
  FOR SELECT USING (true);
CREATE INDEX idx_nat_std_year_cat ON public.irs_national_standards(effective_year, category);

CREATE TABLE public.irs_local_standards (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  effective_year  integer NOT NULL,
  category        text NOT NULL,
  state           text NOT NULL,
  county          text,
  family_size     integer NOT NULL,
  allowance       numeric(12,2) NOT NULL,
  created_at      timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.irs_local_standards ENABLE ROW LEVEL SECURITY;
CREATE POLICY ils_public_read ON public.irs_local_standards
  FOR SELECT USING (true);
CREATE INDEX idx_local_std_lookup ON public.irs_local_standards(state, county, family_size);

CREATE TABLE public.irs_transportation_standards (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  effective_year  integer NOT NULL,
  category        text NOT NULL,
  region          text,
  allowance       numeric(12,2) NOT NULL,
  created_at      timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.irs_transportation_standards ENABLE ROW LEVEL SECURITY;
CREATE POLICY its_public_read ON public.irs_transportation_standards
  FOR SELECT USING (true);
CREATE INDEX idx_transport_std_year ON public.irs_transportation_standards(effective_year, category);

CREATE TABLE public.federal_poverty_levels (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  effective_year  integer NOT NULL,
  multiplier      numeric(5,2) NOT NULL,
  family_size     integer NOT NULL,
  annual_amount   numeric(12,2) NOT NULL,
  monthly_amount  numeric(12,2) NOT NULL,
  created_at      timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.federal_poverty_levels ENABLE ROW LEVEL SECURITY;
CREATE POLICY fpl_public_read ON public.federal_poverty_levels
  FOR SELECT USING (true);
CREATE INDEX idx_fpl_year_size ON public.federal_poverty_levels(effective_year, family_size);

-- -----------------------------------------------------------
-- 13. Case Lifecycle Events
-- -----------------------------------------------------------

CREATE TABLE public.case_lifecycle_events (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id     uuid NOT NULL REFERENCES public.cases(id) ON DELETE CASCADE,
  event_type  text NOT NULL,
  old_status  case_status,
  new_status  case_status,
  metadata    jsonb,
  created_by  uuid REFERENCES auth.users(id),
  created_at  timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.case_lifecycle_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY cle_owner ON public.case_lifecycle_events
  FOR ALL USING (auth.uid() = (SELECT user_id FROM public.cases WHERE id = case_id));
CREATE INDEX idx_lifecycle_case ON public.case_lifecycle_events(case_id);
CREATE INDEX idx_lifecycle_type ON public.case_lifecycle_events(event_type);
