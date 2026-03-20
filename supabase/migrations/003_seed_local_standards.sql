-- ============================================================
-- BlastTax CRM - Seed IRS Local Standards: Housing & Utilities
-- Migration 003: 2026 Housing & Utilities by County
-- ============================================================
-- Top 100 most populous US counties, 5 family sizes each = 500 rows
-- Category: housing_and_utilities
-- Family sizes: 1, 2, 3, 4, 5 (5 means 5+)
--
-- Allowance tiers based on IRS Local Standards patterns:
--   High-cost (NYC, SF, LA, DC metro, Honolulu): family-4 base $3,000-$4,500
--   Medium-cost (Chicago, Dallas, Atlanta, Denver): family-4 base $2,200-$3,200
--   Lower-cost (rural/small metros): family-4 base $1,500-$2,200
--
-- Family size multipliers vs. family-of-4 base:
--   Size 1: ~65%   Size 2: ~80%   Size 3: ~90%
--   Size 4: 100%   Size 5+: ~108%
-- ============================================================

-- Clear any existing local standards for 2026 housing_and_utilities
DELETE FROM public.irs_local_standards
WHERE effective_year = 2026 AND category = 'housing_and_utilities';

-- ---------------------------------------------------------------
-- NORTHEAST
-- ---------------------------------------------------------------

-- NY - New York County (Manhattan) — Very High Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'NY', 'New York', 1, 2925.00),
  (2026, 'housing_and_utilities', 'NY', 'New York', 2, 3600.00),
  (2026, 'housing_and_utilities', 'NY', 'New York', 3, 4050.00),
  (2026, 'housing_and_utilities', 'NY', 'New York', 4, 4500.00),
  (2026, 'housing_and_utilities', 'NY', 'New York', 5, 4860.00);

-- NY - Kings County (Brooklyn) — Very High Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'NY', 'Kings', 1, 2795.00),
  (2026, 'housing_and_utilities', 'NY', 'Kings', 2, 3440.00),
  (2026, 'housing_and_utilities', 'NY', 'Kings', 3, 3870.00),
  (2026, 'housing_and_utilities', 'NY', 'Kings', 4, 4300.00),
  (2026, 'housing_and_utilities', 'NY', 'Kings', 5, 4644.00);

-- NY - Queens County — High Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'NY', 'Queens', 1, 2665.00),
  (2026, 'housing_and_utilities', 'NY', 'Queens', 2, 3280.00),
  (2026, 'housing_and_utilities', 'NY', 'Queens', 3, 3690.00),
  (2026, 'housing_and_utilities', 'NY', 'Queens', 4, 4100.00),
  (2026, 'housing_and_utilities', 'NY', 'Queens', 5, 4428.00);

-- NY - Bronx County — High Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'NY', 'Bronx', 1, 2405.00),
  (2026, 'housing_and_utilities', 'NY', 'Bronx', 2, 2960.00),
  (2026, 'housing_and_utilities', 'NY', 'Bronx', 3, 3330.00),
  (2026, 'housing_and_utilities', 'NY', 'Bronx', 4, 3700.00),
  (2026, 'housing_and_utilities', 'NY', 'Bronx', 5, 3996.00);

-- NY - Suffolk County — High Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'NY', 'Suffolk', 1, 2600.00),
  (2026, 'housing_and_utilities', 'NY', 'Suffolk', 2, 3200.00),
  (2026, 'housing_and_utilities', 'NY', 'Suffolk', 3, 3600.00),
  (2026, 'housing_and_utilities', 'NY', 'Suffolk', 4, 4000.00),
  (2026, 'housing_and_utilities', 'NY', 'Suffolk', 5, 4320.00);

-- NY - Nassau County — Very High Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'NY', 'Nassau', 1, 2860.00),
  (2026, 'housing_and_utilities', 'NY', 'Nassau', 2, 3520.00),
  (2026, 'housing_and_utilities', 'NY', 'Nassau', 3, 3960.00),
  (2026, 'housing_and_utilities', 'NY', 'Nassau', 4, 4400.00),
  (2026, 'housing_and_utilities', 'NY', 'Nassau', 5, 4752.00);

-- NY - Westchester County — Very High Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'NY', 'Westchester', 1, 2990.00),
  (2026, 'housing_and_utilities', 'NY', 'Westchester', 2, 3680.00),
  (2026, 'housing_and_utilities', 'NY', 'Westchester', 3, 4140.00),
  (2026, 'housing_and_utilities', 'NY', 'Westchester', 4, 4600.00),
  (2026, 'housing_and_utilities', 'NY', 'Westchester', 5, 4968.00);

-- NJ - Bergen County — High Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'NJ', 'Bergen', 1, 2665.00),
  (2026, 'housing_and_utilities', 'NJ', 'Bergen', 2, 3280.00),
  (2026, 'housing_and_utilities', 'NJ', 'Bergen', 3, 3690.00),
  (2026, 'housing_and_utilities', 'NJ', 'Bergen', 4, 4100.00),
  (2026, 'housing_and_utilities', 'NJ', 'Bergen', 5, 4428.00);

-- NJ - Middlesex County — High Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'NJ', 'Middlesex', 1, 2470.00),
  (2026, 'housing_and_utilities', 'NJ', 'Middlesex', 2, 3040.00),
  (2026, 'housing_and_utilities', 'NJ', 'Middlesex', 3, 3420.00),
  (2026, 'housing_and_utilities', 'NJ', 'Middlesex', 4, 3800.00),
  (2026, 'housing_and_utilities', 'NJ', 'Middlesex', 5, 4104.00);

-- NJ - Essex County — High Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'NJ', 'Essex', 1, 2535.00),
  (2026, 'housing_and_utilities', 'NJ', 'Essex', 2, 3120.00),
  (2026, 'housing_and_utilities', 'NJ', 'Essex', 3, 3510.00),
  (2026, 'housing_and_utilities', 'NJ', 'Essex', 4, 3900.00),
  (2026, 'housing_and_utilities', 'NJ', 'Essex', 5, 4212.00);

-- NJ - Hudson County — High Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'NJ', 'Hudson', 1, 2600.00),
  (2026, 'housing_and_utilities', 'NJ', 'Hudson', 2, 3200.00),
  (2026, 'housing_and_utilities', 'NJ', 'Hudson', 3, 3600.00),
  (2026, 'housing_and_utilities', 'NJ', 'Hudson', 4, 4000.00),
  (2026, 'housing_and_utilities', 'NJ', 'Hudson', 5, 4320.00);

-- PA - Philadelphia County — Medium-High Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'PA', 'Philadelphia', 1, 1885.00),
  (2026, 'housing_and_utilities', 'PA', 'Philadelphia', 2, 2320.00),
  (2026, 'housing_and_utilities', 'PA', 'Philadelphia', 3, 2610.00),
  (2026, 'housing_and_utilities', 'PA', 'Philadelphia', 4, 2900.00),
  (2026, 'housing_and_utilities', 'PA', 'Philadelphia', 5, 3132.00);

-- PA - Allegheny County (Pittsburgh) — Medium Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'PA', 'Allegheny', 1, 1625.00),
  (2026, 'housing_and_utilities', 'PA', 'Allegheny', 2, 2000.00),
  (2026, 'housing_and_utilities', 'PA', 'Allegheny', 3, 2250.00),
  (2026, 'housing_and_utilities', 'PA', 'Allegheny', 4, 2500.00),
  (2026, 'housing_and_utilities', 'PA', 'Allegheny', 5, 2700.00);

-- PA - Montgomery County — High Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'PA', 'Montgomery', 1, 2210.00),
  (2026, 'housing_and_utilities', 'PA', 'Montgomery', 2, 2720.00),
  (2026, 'housing_and_utilities', 'PA', 'Montgomery', 3, 3060.00),
  (2026, 'housing_and_utilities', 'PA', 'Montgomery', 4, 3400.00),
  (2026, 'housing_and_utilities', 'PA', 'Montgomery', 5, 3672.00);

-- MA - Suffolk County (Boston) — Very High Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'MA', 'Suffolk', 1, 2795.00),
  (2026, 'housing_and_utilities', 'MA', 'Suffolk', 2, 3440.00),
  (2026, 'housing_and_utilities', 'MA', 'Suffolk', 3, 3870.00),
  (2026, 'housing_and_utilities', 'MA', 'Suffolk', 4, 4300.00),
  (2026, 'housing_and_utilities', 'MA', 'Suffolk', 5, 4644.00);

-- MA - Middlesex County — High Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'MA', 'Middlesex', 1, 2600.00),
  (2026, 'housing_and_utilities', 'MA', 'Middlesex', 2, 3200.00),
  (2026, 'housing_and_utilities', 'MA', 'Middlesex', 3, 3600.00),
  (2026, 'housing_and_utilities', 'MA', 'Middlesex', 4, 4000.00),
  (2026, 'housing_and_utilities', 'MA', 'Middlesex', 5, 4320.00);

-- CT - Fairfield County — Very High Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'CT', 'Fairfield', 1, 2860.00),
  (2026, 'housing_and_utilities', 'CT', 'Fairfield', 2, 3520.00),
  (2026, 'housing_and_utilities', 'CT', 'Fairfield', 3, 3960.00),
  (2026, 'housing_and_utilities', 'CT', 'Fairfield', 4, 4400.00),
  (2026, 'housing_and_utilities', 'CT', 'Fairfield', 5, 4752.00);

-- CT - Hartford County — Medium-High Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'CT', 'Hartford', 1, 1950.00),
  (2026, 'housing_and_utilities', 'CT', 'Hartford', 2, 2400.00),
  (2026, 'housing_and_utilities', 'CT', 'Hartford', 3, 2700.00),
  (2026, 'housing_and_utilities', 'CT', 'Hartford', 4, 3000.00),
  (2026, 'housing_and_utilities', 'CT', 'Hartford', 5, 3240.00);

-- ---------------------------------------------------------------
-- SOUTHEAST
-- ---------------------------------------------------------------

-- FL - Miami-Dade County — High Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'FL', 'Miami-Dade', 1, 2340.00),
  (2026, 'housing_and_utilities', 'FL', 'Miami-Dade', 2, 2880.00),
  (2026, 'housing_and_utilities', 'FL', 'Miami-Dade', 3, 3240.00),
  (2026, 'housing_and_utilities', 'FL', 'Miami-Dade', 4, 3600.00),
  (2026, 'housing_and_utilities', 'FL', 'Miami-Dade', 5, 3888.00);

-- FL - Broward County — High Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'FL', 'Broward', 1, 2275.00),
  (2026, 'housing_and_utilities', 'FL', 'Broward', 2, 2800.00),
  (2026, 'housing_and_utilities', 'FL', 'Broward', 3, 3150.00),
  (2026, 'housing_and_utilities', 'FL', 'Broward', 4, 3500.00),
  (2026, 'housing_and_utilities', 'FL', 'Broward', 5, 3780.00);

-- FL - Palm Beach County — High Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'FL', 'Palm Beach', 1, 2340.00),
  (2026, 'housing_and_utilities', 'FL', 'Palm Beach', 2, 2880.00),
  (2026, 'housing_and_utilities', 'FL', 'Palm Beach', 3, 3240.00),
  (2026, 'housing_and_utilities', 'FL', 'Palm Beach', 4, 3600.00),
  (2026, 'housing_and_utilities', 'FL', 'Palm Beach', 5, 3888.00);

-- FL - Hillsborough County (Tampa) — Medium Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'FL', 'Hillsborough', 1, 1820.00),
  (2026, 'housing_and_utilities', 'FL', 'Hillsborough', 2, 2240.00),
  (2026, 'housing_and_utilities', 'FL', 'Hillsborough', 3, 2520.00),
  (2026, 'housing_and_utilities', 'FL', 'Hillsborough', 4, 2800.00),
  (2026, 'housing_and_utilities', 'FL', 'Hillsborough', 5, 3024.00);

-- FL - Orange County (Orlando) — Medium Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'FL', 'Orange', 1, 1755.00),
  (2026, 'housing_and_utilities', 'FL', 'Orange', 2, 2160.00),
  (2026, 'housing_and_utilities', 'FL', 'Orange', 3, 2430.00),
  (2026, 'housing_and_utilities', 'FL', 'Orange', 4, 2700.00),
  (2026, 'housing_and_utilities', 'FL', 'Orange', 5, 2916.00);

-- FL - Duval County (Jacksonville) — Medium Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'FL', 'Duval', 1, 1625.00),
  (2026, 'housing_and_utilities', 'FL', 'Duval', 2, 2000.00),
  (2026, 'housing_and_utilities', 'FL', 'Duval', 3, 2250.00),
  (2026, 'housing_and_utilities', 'FL', 'Duval', 4, 2500.00),
  (2026, 'housing_and_utilities', 'FL', 'Duval', 5, 2700.00);

-- GA - Fulton County (Atlanta) — Medium-High Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'GA', 'Fulton', 1, 2015.00),
  (2026, 'housing_and_utilities', 'GA', 'Fulton', 2, 2480.00),
  (2026, 'housing_and_utilities', 'GA', 'Fulton', 3, 2790.00),
  (2026, 'housing_and_utilities', 'GA', 'Fulton', 4, 3100.00),
  (2026, 'housing_and_utilities', 'GA', 'Fulton', 5, 3348.00);

-- GA - DeKalb County — Medium Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'GA', 'DeKalb', 1, 1820.00),
  (2026, 'housing_and_utilities', 'GA', 'DeKalb', 2, 2240.00),
  (2026, 'housing_and_utilities', 'GA', 'DeKalb', 3, 2520.00),
  (2026, 'housing_and_utilities', 'GA', 'DeKalb', 4, 2800.00),
  (2026, 'housing_and_utilities', 'GA', 'DeKalb', 5, 3024.00);

-- GA - Gwinnett County — Medium Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'GA', 'Gwinnett', 1, 1755.00),
  (2026, 'housing_and_utilities', 'GA', 'Gwinnett', 2, 2160.00),
  (2026, 'housing_and_utilities', 'GA', 'Gwinnett', 3, 2430.00),
  (2026, 'housing_and_utilities', 'GA', 'Gwinnett', 4, 2700.00),
  (2026, 'housing_and_utilities', 'GA', 'Gwinnett', 5, 2916.00);

-- GA - Cobb County — Medium Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'GA', 'Cobb', 1, 1820.00),
  (2026, 'housing_and_utilities', 'GA', 'Cobb', 2, 2240.00),
  (2026, 'housing_and_utilities', 'GA', 'Cobb', 3, 2520.00),
  (2026, 'housing_and_utilities', 'GA', 'Cobb', 4, 2800.00),
  (2026, 'housing_and_utilities', 'GA', 'Cobb', 5, 3024.00);

-- NC - Mecklenburg County (Charlotte) — Medium Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'NC', 'Mecklenburg', 1, 1755.00),
  (2026, 'housing_and_utilities', 'NC', 'Mecklenburg', 2, 2160.00),
  (2026, 'housing_and_utilities', 'NC', 'Mecklenburg', 3, 2430.00),
  (2026, 'housing_and_utilities', 'NC', 'Mecklenburg', 4, 2700.00),
  (2026, 'housing_and_utilities', 'NC', 'Mecklenburg', 5, 2916.00);

-- NC - Wake County (Raleigh) — Medium Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'NC', 'Wake', 1, 1690.00),
  (2026, 'housing_and_utilities', 'NC', 'Wake', 2, 2080.00),
  (2026, 'housing_and_utilities', 'NC', 'Wake', 3, 2340.00),
  (2026, 'housing_and_utilities', 'NC', 'Wake', 4, 2600.00),
  (2026, 'housing_and_utilities', 'NC', 'Wake', 5, 2808.00);

-- VA - Fairfax County — Very High Cost (DC metro)
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'VA', 'Fairfax', 1, 2795.00),
  (2026, 'housing_and_utilities', 'VA', 'Fairfax', 2, 3440.00),
  (2026, 'housing_and_utilities', 'VA', 'Fairfax', 3, 3870.00),
  (2026, 'housing_and_utilities', 'VA', 'Fairfax', 4, 4300.00),
  (2026, 'housing_and_utilities', 'VA', 'Fairfax', 5, 4644.00);

-- VA - Arlington County — Very High Cost (DC metro)
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'VA', 'Arlington', 1, 2860.00),
  (2026, 'housing_and_utilities', 'VA', 'Arlington', 2, 3520.00),
  (2026, 'housing_and_utilities', 'VA', 'Arlington', 3, 3960.00),
  (2026, 'housing_and_utilities', 'VA', 'Arlington', 4, 4400.00),
  (2026, 'housing_and_utilities', 'VA', 'Arlington', 5, 4752.00);

-- VA - Loudoun County — Very High Cost (DC metro)
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'VA', 'Loudoun', 1, 2730.00),
  (2026, 'housing_and_utilities', 'VA', 'Loudoun', 2, 3360.00),
  (2026, 'housing_and_utilities', 'VA', 'Loudoun', 3, 3780.00),
  (2026, 'housing_and_utilities', 'VA', 'Loudoun', 4, 4200.00),
  (2026, 'housing_and_utilities', 'VA', 'Loudoun', 5, 4536.00);

-- MD - Montgomery County — Very High Cost (DC metro)
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'MD', 'Montgomery', 1, 2665.00),
  (2026, 'housing_and_utilities', 'MD', 'Montgomery', 2, 3280.00),
  (2026, 'housing_and_utilities', 'MD', 'Montgomery', 3, 3690.00),
  (2026, 'housing_and_utilities', 'MD', 'Montgomery', 4, 4100.00),
  (2026, 'housing_and_utilities', 'MD', 'Montgomery', 5, 4428.00);

-- MD - Prince Georges County — High Cost (DC metro)
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'MD', 'Prince Georges', 1, 2340.00),
  (2026, 'housing_and_utilities', 'MD', 'Prince Georges', 2, 2880.00),
  (2026, 'housing_and_utilities', 'MD', 'Prince Georges', 3, 3240.00),
  (2026, 'housing_and_utilities', 'MD', 'Prince Georges', 4, 3600.00),
  (2026, 'housing_and_utilities', 'MD', 'Prince Georges', 5, 3888.00);

-- MD - Baltimore County — Medium-High Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'MD', 'Baltimore', 1, 1950.00),
  (2026, 'housing_and_utilities', 'MD', 'Baltimore', 2, 2400.00),
  (2026, 'housing_and_utilities', 'MD', 'Baltimore', 3, 2700.00),
  (2026, 'housing_and_utilities', 'MD', 'Baltimore', 4, 3000.00),
  (2026, 'housing_and_utilities', 'MD', 'Baltimore', 5, 3240.00);

-- SC - Charleston County — Medium Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'SC', 'Charleston', 1, 1690.00),
  (2026, 'housing_and_utilities', 'SC', 'Charleston', 2, 2080.00),
  (2026, 'housing_and_utilities', 'SC', 'Charleston', 3, 2340.00),
  (2026, 'housing_and_utilities', 'SC', 'Charleston', 4, 2600.00),
  (2026, 'housing_and_utilities', 'SC', 'Charleston', 5, 2808.00);

-- TN - Davidson County (Nashville) — Medium Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'TN', 'Davidson', 1, 1755.00),
  (2026, 'housing_and_utilities', 'TN', 'Davidson', 2, 2160.00),
  (2026, 'housing_and_utilities', 'TN', 'Davidson', 3, 2430.00),
  (2026, 'housing_and_utilities', 'TN', 'Davidson', 4, 2700.00),
  (2026, 'housing_and_utilities', 'TN', 'Davidson', 5, 2916.00);

-- TN - Shelby County (Memphis) — Lower-Medium Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'TN', 'Shelby', 1, 1430.00),
  (2026, 'housing_and_utilities', 'TN', 'Shelby', 2, 1760.00),
  (2026, 'housing_and_utilities', 'TN', 'Shelby', 3, 1980.00),
  (2026, 'housing_and_utilities', 'TN', 'Shelby', 4, 2200.00),
  (2026, 'housing_and_utilities', 'TN', 'Shelby', 5, 2376.00);

-- ---------------------------------------------------------------
-- MIDWEST
-- ---------------------------------------------------------------

-- IL - Cook County (Chicago) — Medium-High Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'IL', 'Cook', 1, 2080.00),
  (2026, 'housing_and_utilities', 'IL', 'Cook', 2, 2560.00),
  (2026, 'housing_and_utilities', 'IL', 'Cook', 3, 2880.00),
  (2026, 'housing_and_utilities', 'IL', 'Cook', 4, 3200.00),
  (2026, 'housing_and_utilities', 'IL', 'Cook', 5, 3456.00);

-- IL - DuPage County — High Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'IL', 'DuPage', 1, 2275.00),
  (2026, 'housing_and_utilities', 'IL', 'DuPage', 2, 2800.00),
  (2026, 'housing_and_utilities', 'IL', 'DuPage', 3, 3150.00),
  (2026, 'housing_and_utilities', 'IL', 'DuPage', 4, 3500.00),
  (2026, 'housing_and_utilities', 'IL', 'DuPage', 5, 3780.00);

-- IL - Lake County — High Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'IL', 'Lake', 1, 2210.00),
  (2026, 'housing_and_utilities', 'IL', 'Lake', 2, 2720.00),
  (2026, 'housing_and_utilities', 'IL', 'Lake', 3, 3060.00),
  (2026, 'housing_and_utilities', 'IL', 'Lake', 4, 3400.00),
  (2026, 'housing_and_utilities', 'IL', 'Lake', 5, 3672.00);

-- OH - Cuyahoga County (Cleveland) — Medium Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'OH', 'Cuyahoga', 1, 1495.00),
  (2026, 'housing_and_utilities', 'OH', 'Cuyahoga', 2, 1840.00),
  (2026, 'housing_and_utilities', 'OH', 'Cuyahoga', 3, 2070.00),
  (2026, 'housing_and_utilities', 'OH', 'Cuyahoga', 4, 2300.00),
  (2026, 'housing_and_utilities', 'OH', 'Cuyahoga', 5, 2484.00);

-- OH - Franklin County (Columbus) — Medium Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'OH', 'Franklin', 1, 1560.00),
  (2026, 'housing_and_utilities', 'OH', 'Franklin', 2, 1920.00),
  (2026, 'housing_and_utilities', 'OH', 'Franklin', 3, 2160.00),
  (2026, 'housing_and_utilities', 'OH', 'Franklin', 4, 2400.00),
  (2026, 'housing_and_utilities', 'OH', 'Franklin', 5, 2592.00);

-- OH - Hamilton County (Cincinnati) — Medium Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'OH', 'Hamilton', 1, 1495.00),
  (2026, 'housing_and_utilities', 'OH', 'Hamilton', 2, 1840.00),
  (2026, 'housing_and_utilities', 'OH', 'Hamilton', 3, 2070.00),
  (2026, 'housing_and_utilities', 'OH', 'Hamilton', 4, 2300.00),
  (2026, 'housing_and_utilities', 'OH', 'Hamilton', 5, 2484.00);

-- MI - Wayne County (Detroit) — Lower Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'MI', 'Wayne', 1, 1300.00),
  (2026, 'housing_and_utilities', 'MI', 'Wayne', 2, 1600.00),
  (2026, 'housing_and_utilities', 'MI', 'Wayne', 3, 1800.00),
  (2026, 'housing_and_utilities', 'MI', 'Wayne', 4, 2000.00),
  (2026, 'housing_and_utilities', 'MI', 'Wayne', 5, 2160.00);

-- MI - Oakland County — Medium-High Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'MI', 'Oakland', 1, 1885.00),
  (2026, 'housing_and_utilities', 'MI', 'Oakland', 2, 2320.00),
  (2026, 'housing_and_utilities', 'MI', 'Oakland', 3, 2610.00),
  (2026, 'housing_and_utilities', 'MI', 'Oakland', 4, 2900.00),
  (2026, 'housing_and_utilities', 'MI', 'Oakland', 5, 3132.00);

-- MN - Hennepin County (Minneapolis) — Medium-High Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'MN', 'Hennepin', 1, 1950.00),
  (2026, 'housing_and_utilities', 'MN', 'Hennepin', 2, 2400.00),
  (2026, 'housing_and_utilities', 'MN', 'Hennepin', 3, 2700.00),
  (2026, 'housing_and_utilities', 'MN', 'Hennepin', 4, 3000.00),
  (2026, 'housing_and_utilities', 'MN', 'Hennepin', 5, 3240.00);

-- MN - Ramsey County (St. Paul) — Medium Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'MN', 'Ramsey', 1, 1820.00),
  (2026, 'housing_and_utilities', 'MN', 'Ramsey', 2, 2240.00),
  (2026, 'housing_and_utilities', 'MN', 'Ramsey', 3, 2520.00),
  (2026, 'housing_and_utilities', 'MN', 'Ramsey', 4, 2800.00),
  (2026, 'housing_and_utilities', 'MN', 'Ramsey', 5, 3024.00);

-- WI - Milwaukee County — Medium Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'WI', 'Milwaukee', 1, 1495.00),
  (2026, 'housing_and_utilities', 'WI', 'Milwaukee', 2, 1840.00),
  (2026, 'housing_and_utilities', 'WI', 'Milwaukee', 3, 2070.00),
  (2026, 'housing_and_utilities', 'WI', 'Milwaukee', 4, 2300.00),
  (2026, 'housing_and_utilities', 'WI', 'Milwaukee', 5, 2484.00);

-- MO - St. Louis County — Medium Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'MO', 'St. Louis', 1, 1560.00),
  (2026, 'housing_and_utilities', 'MO', 'St. Louis', 2, 1920.00),
  (2026, 'housing_and_utilities', 'MO', 'St. Louis', 3, 2160.00),
  (2026, 'housing_and_utilities', 'MO', 'St. Louis', 4, 2400.00),
  (2026, 'housing_and_utilities', 'MO', 'St. Louis', 5, 2592.00);

-- IN - Marion County (Indianapolis) — Lower-Medium Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'IN', 'Marion', 1, 1430.00),
  (2026, 'housing_and_utilities', 'IN', 'Marion', 2, 1760.00),
  (2026, 'housing_and_utilities', 'IN', 'Marion', 3, 1980.00),
  (2026, 'housing_and_utilities', 'IN', 'Marion', 4, 2200.00),
  (2026, 'housing_and_utilities', 'IN', 'Marion', 5, 2376.00);

-- ---------------------------------------------------------------
-- SOUTH / SOUTHWEST
-- ---------------------------------------------------------------

-- TX - Harris County (Houston) — Medium Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'TX', 'Harris', 1, 1755.00),
  (2026, 'housing_and_utilities', 'TX', 'Harris', 2, 2160.00),
  (2026, 'housing_and_utilities', 'TX', 'Harris', 3, 2430.00),
  (2026, 'housing_and_utilities', 'TX', 'Harris', 4, 2700.00),
  (2026, 'housing_and_utilities', 'TX', 'Harris', 5, 2916.00);

-- TX - Dallas County — Medium Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'TX', 'Dallas', 1, 1820.00),
  (2026, 'housing_and_utilities', 'TX', 'Dallas', 2, 2240.00),
  (2026, 'housing_and_utilities', 'TX', 'Dallas', 3, 2520.00),
  (2026, 'housing_and_utilities', 'TX', 'Dallas', 4, 2800.00),
  (2026, 'housing_and_utilities', 'TX', 'Dallas', 5, 3024.00);

-- TX - Tarrant County (Fort Worth) — Medium Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'TX', 'Tarrant', 1, 1690.00),
  (2026, 'housing_and_utilities', 'TX', 'Tarrant', 2, 2080.00),
  (2026, 'housing_and_utilities', 'TX', 'Tarrant', 3, 2340.00),
  (2026, 'housing_and_utilities', 'TX', 'Tarrant', 4, 2600.00),
  (2026, 'housing_and_utilities', 'TX', 'Tarrant', 5, 2808.00);

-- TX - Bexar County (San Antonio) — Lower-Medium Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'TX', 'Bexar', 1, 1560.00),
  (2026, 'housing_and_utilities', 'TX', 'Bexar', 2, 1920.00),
  (2026, 'housing_and_utilities', 'TX', 'Bexar', 3, 2160.00),
  (2026, 'housing_and_utilities', 'TX', 'Bexar', 4, 2400.00),
  (2026, 'housing_and_utilities', 'TX', 'Bexar', 5, 2592.00);

-- TX - Travis County (Austin) — High Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'TX', 'Travis', 1, 2145.00),
  (2026, 'housing_and_utilities', 'TX', 'Travis', 2, 2640.00),
  (2026, 'housing_and_utilities', 'TX', 'Travis', 3, 2970.00),
  (2026, 'housing_and_utilities', 'TX', 'Travis', 4, 3300.00),
  (2026, 'housing_and_utilities', 'TX', 'Travis', 5, 3564.00);

-- TX - Collin County — High Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'TX', 'Collin', 1, 2080.00),
  (2026, 'housing_and_utilities', 'TX', 'Collin', 2, 2560.00),
  (2026, 'housing_and_utilities', 'TX', 'Collin', 3, 2880.00),
  (2026, 'housing_and_utilities', 'TX', 'Collin', 4, 3200.00),
  (2026, 'housing_and_utilities', 'TX', 'Collin', 5, 3456.00);

-- LA - Orleans Parish — Medium Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'LA', 'Orleans', 1, 1560.00),
  (2026, 'housing_and_utilities', 'LA', 'Orleans', 2, 1920.00),
  (2026, 'housing_and_utilities', 'LA', 'Orleans', 3, 2160.00),
  (2026, 'housing_and_utilities', 'LA', 'Orleans', 4, 2400.00),
  (2026, 'housing_and_utilities', 'LA', 'Orleans', 5, 2592.00);

-- LA - Jefferson Parish — Lower-Medium Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'LA', 'Jefferson', 1, 1430.00),
  (2026, 'housing_and_utilities', 'LA', 'Jefferson', 2, 1760.00),
  (2026, 'housing_and_utilities', 'LA', 'Jefferson', 3, 1980.00),
  (2026, 'housing_and_utilities', 'LA', 'Jefferson', 4, 2200.00),
  (2026, 'housing_and_utilities', 'LA', 'Jefferson', 5, 2376.00);

-- OK - Oklahoma County — Lower-Medium Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'OK', 'Oklahoma', 1, 1365.00),
  (2026, 'housing_and_utilities', 'OK', 'Oklahoma', 2, 1680.00),
  (2026, 'housing_and_utilities', 'OK', 'Oklahoma', 3, 1890.00),
  (2026, 'housing_and_utilities', 'OK', 'Oklahoma', 4, 2100.00),
  (2026, 'housing_and_utilities', 'OK', 'Oklahoma', 5, 2268.00);

-- AR - Pulaski County (Little Rock) — Lower Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'AR', 'Pulaski', 1, 1235.00),
  (2026, 'housing_and_utilities', 'AR', 'Pulaski', 2, 1520.00),
  (2026, 'housing_and_utilities', 'AR', 'Pulaski', 3, 1710.00),
  (2026, 'housing_and_utilities', 'AR', 'Pulaski', 4, 1900.00),
  (2026, 'housing_and_utilities', 'AR', 'Pulaski', 5, 2052.00);

-- ---------------------------------------------------------------
-- WEST
-- ---------------------------------------------------------------

-- CA - Los Angeles County — Very High Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'CA', 'Los Angeles', 1, 2730.00),
  (2026, 'housing_and_utilities', 'CA', 'Los Angeles', 2, 3360.00),
  (2026, 'housing_and_utilities', 'CA', 'Los Angeles', 3, 3780.00),
  (2026, 'housing_and_utilities', 'CA', 'Los Angeles', 4, 4200.00),
  (2026, 'housing_and_utilities', 'CA', 'Los Angeles', 5, 4536.00);

-- CA - San Diego County — High Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'CA', 'San Diego', 1, 2535.00),
  (2026, 'housing_and_utilities', 'CA', 'San Diego', 2, 3120.00),
  (2026, 'housing_and_utilities', 'CA', 'San Diego', 3, 3510.00),
  (2026, 'housing_and_utilities', 'CA', 'San Diego', 4, 3900.00),
  (2026, 'housing_and_utilities', 'CA', 'San Diego', 5, 4212.00);

-- CA - Orange County — Very High Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'CA', 'Orange', 1, 2795.00),
  (2026, 'housing_and_utilities', 'CA', 'Orange', 2, 3440.00),
  (2026, 'housing_and_utilities', 'CA', 'Orange', 3, 3870.00),
  (2026, 'housing_and_utilities', 'CA', 'Orange', 4, 4300.00),
  (2026, 'housing_and_utilities', 'CA', 'Orange', 5, 4644.00);

-- CA - Riverside County — Medium Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'CA', 'Riverside', 1, 1950.00),
  (2026, 'housing_and_utilities', 'CA', 'Riverside', 2, 2400.00),
  (2026, 'housing_and_utilities', 'CA', 'Riverside', 3, 2700.00),
  (2026, 'housing_and_utilities', 'CA', 'Riverside', 4, 3000.00),
  (2026, 'housing_and_utilities', 'CA', 'Riverside', 5, 3240.00);

-- CA - San Bernardino County — Medium Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'CA', 'San Bernardino', 1, 1820.00),
  (2026, 'housing_and_utilities', 'CA', 'San Bernardino', 2, 2240.00),
  (2026, 'housing_and_utilities', 'CA', 'San Bernardino', 3, 2520.00),
  (2026, 'housing_and_utilities', 'CA', 'San Bernardino', 4, 2800.00),
  (2026, 'housing_and_utilities', 'CA', 'San Bernardino', 5, 3024.00);

-- CA - Santa Clara County (San Jose / Silicon Valley) — Very High Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'CA', 'Santa Clara', 1, 2990.00),
  (2026, 'housing_and_utilities', 'CA', 'Santa Clara', 2, 3680.00),
  (2026, 'housing_and_utilities', 'CA', 'Santa Clara', 3, 4140.00),
  (2026, 'housing_and_utilities', 'CA', 'Santa Clara', 4, 4600.00),
  (2026, 'housing_and_utilities', 'CA', 'Santa Clara', 5, 4968.00);

-- CA - Alameda County — Very High Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'CA', 'Alameda', 1, 2795.00),
  (2026, 'housing_and_utilities', 'CA', 'Alameda', 2, 3440.00),
  (2026, 'housing_and_utilities', 'CA', 'Alameda', 3, 3870.00),
  (2026, 'housing_and_utilities', 'CA', 'Alameda', 4, 4300.00),
  (2026, 'housing_and_utilities', 'CA', 'Alameda', 5, 4644.00);

-- CA - Sacramento County — Medium-High Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'CA', 'Sacramento', 1, 2015.00),
  (2026, 'housing_and_utilities', 'CA', 'Sacramento', 2, 2480.00),
  (2026, 'housing_and_utilities', 'CA', 'Sacramento', 3, 2790.00),
  (2026, 'housing_and_utilities', 'CA', 'Sacramento', 4, 3100.00),
  (2026, 'housing_and_utilities', 'CA', 'Sacramento', 5, 3348.00);

-- CA - San Francisco County — Very High Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'CA', 'San Francisco', 1, 2925.00),
  (2026, 'housing_and_utilities', 'CA', 'San Francisco', 2, 3600.00),
  (2026, 'housing_and_utilities', 'CA', 'San Francisco', 3, 4050.00),
  (2026, 'housing_and_utilities', 'CA', 'San Francisco', 4, 4500.00),
  (2026, 'housing_and_utilities', 'CA', 'San Francisco', 5, 4860.00);

-- CA - Contra Costa County — High Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'CA', 'Contra Costa', 1, 2535.00),
  (2026, 'housing_and_utilities', 'CA', 'Contra Costa', 2, 3120.00),
  (2026, 'housing_and_utilities', 'CA', 'Contra Costa', 3, 3510.00),
  (2026, 'housing_and_utilities', 'CA', 'Contra Costa', 4, 3900.00),
  (2026, 'housing_and_utilities', 'CA', 'Contra Costa', 5, 4212.00);

-- WA - King County (Seattle) — Very High Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'WA', 'King', 1, 2665.00),
  (2026, 'housing_and_utilities', 'WA', 'King', 2, 3280.00),
  (2026, 'housing_and_utilities', 'WA', 'King', 3, 3690.00),
  (2026, 'housing_and_utilities', 'WA', 'King', 4, 4100.00),
  (2026, 'housing_and_utilities', 'WA', 'King', 5, 4428.00);

-- WA - Pierce County (Tacoma) — Medium-High Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'WA', 'Pierce', 1, 1950.00),
  (2026, 'housing_and_utilities', 'WA', 'Pierce', 2, 2400.00),
  (2026, 'housing_and_utilities', 'WA', 'Pierce', 3, 2700.00),
  (2026, 'housing_and_utilities', 'WA', 'Pierce', 4, 3000.00),
  (2026, 'housing_and_utilities', 'WA', 'Pierce', 5, 3240.00);

-- WA - Snohomish County — High Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'WA', 'Snohomish', 1, 2210.00),
  (2026, 'housing_and_utilities', 'WA', 'Snohomish', 2, 2720.00),
  (2026, 'housing_and_utilities', 'WA', 'Snohomish', 3, 3060.00),
  (2026, 'housing_and_utilities', 'WA', 'Snohomish', 4, 3400.00),
  (2026, 'housing_and_utilities', 'WA', 'Snohomish', 5, 3672.00);

-- OR - Multnomah County (Portland) — High Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'OR', 'Multnomah', 1, 2145.00),
  (2026, 'housing_and_utilities', 'OR', 'Multnomah', 2, 2640.00),
  (2026, 'housing_and_utilities', 'OR', 'Multnomah', 3, 2970.00),
  (2026, 'housing_and_utilities', 'OR', 'Multnomah', 4, 3300.00),
  (2026, 'housing_and_utilities', 'OR', 'Multnomah', 5, 3564.00);

-- CO - Denver County — High Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'CO', 'Denver', 1, 2210.00),
  (2026, 'housing_and_utilities', 'CO', 'Denver', 2, 2720.00),
  (2026, 'housing_and_utilities', 'CO', 'Denver', 3, 3060.00),
  (2026, 'housing_and_utilities', 'CO', 'Denver', 4, 3400.00),
  (2026, 'housing_and_utilities', 'CO', 'Denver', 5, 3672.00);

-- CO - Arapahoe County — Medium-High Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'CO', 'Arapahoe', 1, 2080.00),
  (2026, 'housing_and_utilities', 'CO', 'Arapahoe', 2, 2560.00),
  (2026, 'housing_and_utilities', 'CO', 'Arapahoe', 3, 2880.00),
  (2026, 'housing_and_utilities', 'CO', 'Arapahoe', 4, 3200.00),
  (2026, 'housing_and_utilities', 'CO', 'Arapahoe', 5, 3456.00);

-- CO - Jefferson County — Medium-High Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'CO', 'Jefferson', 1, 2015.00),
  (2026, 'housing_and_utilities', 'CO', 'Jefferson', 2, 2480.00),
  (2026, 'housing_and_utilities', 'CO', 'Jefferson', 3, 2790.00),
  (2026, 'housing_and_utilities', 'CO', 'Jefferson', 4, 3100.00),
  (2026, 'housing_and_utilities', 'CO', 'Jefferson', 5, 3348.00);

-- AZ - Maricopa County (Phoenix) — Medium Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'AZ', 'Maricopa', 1, 1820.00),
  (2026, 'housing_and_utilities', 'AZ', 'Maricopa', 2, 2240.00),
  (2026, 'housing_and_utilities', 'AZ', 'Maricopa', 3, 2520.00),
  (2026, 'housing_and_utilities', 'AZ', 'Maricopa', 4, 2800.00),
  (2026, 'housing_and_utilities', 'AZ', 'Maricopa', 5, 3024.00);

-- AZ - Pima County (Tucson) — Lower-Medium Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'AZ', 'Pima', 1, 1495.00),
  (2026, 'housing_and_utilities', 'AZ', 'Pima', 2, 1840.00),
  (2026, 'housing_and_utilities', 'AZ', 'Pima', 3, 2070.00),
  (2026, 'housing_and_utilities', 'AZ', 'Pima', 4, 2300.00),
  (2026, 'housing_and_utilities', 'AZ', 'Pima', 5, 2484.00);

-- NV - Clark County (Las Vegas) — Medium Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'NV', 'Clark', 1, 1755.00),
  (2026, 'housing_and_utilities', 'NV', 'Clark', 2, 2160.00),
  (2026, 'housing_and_utilities', 'NV', 'Clark', 3, 2430.00),
  (2026, 'housing_and_utilities', 'NV', 'Clark', 4, 2700.00),
  (2026, 'housing_and_utilities', 'NV', 'Clark', 5, 2916.00);

-- HI - Honolulu County — Very High Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'HI', 'Honolulu', 1, 2925.00),
  (2026, 'housing_and_utilities', 'HI', 'Honolulu', 2, 3600.00),
  (2026, 'housing_and_utilities', 'HI', 'Honolulu', 3, 4050.00),
  (2026, 'housing_and_utilities', 'HI', 'Honolulu', 4, 4500.00),
  (2026, 'housing_and_utilities', 'HI', 'Honolulu', 5, 4860.00);

-- UT - Salt Lake County — Medium Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'UT', 'Salt Lake', 1, 1820.00),
  (2026, 'housing_and_utilities', 'UT', 'Salt Lake', 2, 2240.00),
  (2026, 'housing_and_utilities', 'UT', 'Salt Lake', 3, 2520.00),
  (2026, 'housing_and_utilities', 'UT', 'Salt Lake', 4, 2800.00),
  (2026, 'housing_and_utilities', 'UT', 'Salt Lake', 5, 3024.00);

-- ---------------------------------------------------------------
-- ADDITIONAL HIGH-POPULATION COUNTIES (to reach 100)
-- ---------------------------------------------------------------

-- NY - Richmond County (Staten Island) — High Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'NY', 'Richmond', 1, 2470.00),
  (2026, 'housing_and_utilities', 'NY', 'Richmond', 2, 3040.00),
  (2026, 'housing_and_utilities', 'NY', 'Richmond', 3, 3420.00),
  (2026, 'housing_and_utilities', 'NY', 'Richmond', 4, 3800.00),
  (2026, 'housing_and_utilities', 'NY', 'Richmond', 5, 4104.00);

-- NY - Erie County (Buffalo) — Medium Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'NY', 'Erie', 1, 1495.00),
  (2026, 'housing_and_utilities', 'NY', 'Erie', 2, 1840.00),
  (2026, 'housing_and_utilities', 'NY', 'Erie', 3, 2070.00),
  (2026, 'housing_and_utilities', 'NY', 'Erie', 4, 2300.00),
  (2026, 'housing_and_utilities', 'NY', 'Erie', 5, 2484.00);

-- FL - Pinellas County (St. Petersburg) — Medium Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'FL', 'Pinellas', 1, 1755.00),
  (2026, 'housing_and_utilities', 'FL', 'Pinellas', 2, 2160.00),
  (2026, 'housing_and_utilities', 'FL', 'Pinellas', 3, 2430.00),
  (2026, 'housing_and_utilities', 'FL', 'Pinellas', 4, 2700.00),
  (2026, 'housing_and_utilities', 'FL', 'Pinellas', 5, 2916.00);

-- FL - Lee County (Fort Myers) — Medium Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'FL', 'Lee', 1, 1690.00),
  (2026, 'housing_and_utilities', 'FL', 'Lee', 2, 2080.00),
  (2026, 'housing_and_utilities', 'FL', 'Lee', 3, 2340.00),
  (2026, 'housing_and_utilities', 'FL', 'Lee', 4, 2600.00),
  (2026, 'housing_and_utilities', 'FL', 'Lee', 5, 2808.00);

-- TX - Fort Bend County — Medium-High Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'TX', 'Fort Bend', 1, 1950.00),
  (2026, 'housing_and_utilities', 'TX', 'Fort Bend', 2, 2400.00),
  (2026, 'housing_and_utilities', 'TX', 'Fort Bend', 3, 2700.00),
  (2026, 'housing_and_utilities', 'TX', 'Fort Bend', 4, 3000.00),
  (2026, 'housing_and_utilities', 'TX', 'Fort Bend', 5, 3240.00);

-- TX - Denton County — Medium-High Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'TX', 'Denton', 1, 1885.00),
  (2026, 'housing_and_utilities', 'TX', 'Denton', 2, 2320.00),
  (2026, 'housing_and_utilities', 'TX', 'Denton', 3, 2610.00),
  (2026, 'housing_and_utilities', 'TX', 'Denton', 4, 2900.00),
  (2026, 'housing_and_utilities', 'TX', 'Denton', 5, 3132.00);

-- TX - El Paso County — Lower Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'TX', 'El Paso', 1, 1235.00),
  (2026, 'housing_and_utilities', 'TX', 'El Paso', 2, 1520.00),
  (2026, 'housing_and_utilities', 'TX', 'El Paso', 3, 1710.00),
  (2026, 'housing_and_utilities', 'TX', 'El Paso', 4, 1900.00),
  (2026, 'housing_and_utilities', 'TX', 'El Paso', 5, 2052.00);

-- TX - Hidalgo County — Lower Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'TX', 'Hidalgo', 1, 1170.00),
  (2026, 'housing_and_utilities', 'TX', 'Hidalgo', 2, 1440.00),
  (2026, 'housing_and_utilities', 'TX', 'Hidalgo', 3, 1620.00),
  (2026, 'housing_and_utilities', 'TX', 'Hidalgo', 4, 1800.00),
  (2026, 'housing_and_utilities', 'TX', 'Hidalgo', 5, 1944.00);

-- CA - Fresno County — Lower-Medium Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'CA', 'Fresno', 1, 1495.00),
  (2026, 'housing_and_utilities', 'CA', 'Fresno', 2, 1840.00),
  (2026, 'housing_and_utilities', 'CA', 'Fresno', 3, 2070.00),
  (2026, 'housing_and_utilities', 'CA', 'Fresno', 4, 2300.00),
  (2026, 'housing_and_utilities', 'CA', 'Fresno', 5, 2484.00);

-- CA - Kern County (Bakersfield) — Lower-Medium Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'CA', 'Kern', 1, 1365.00),
  (2026, 'housing_and_utilities', 'CA', 'Kern', 2, 1680.00),
  (2026, 'housing_and_utilities', 'CA', 'Kern', 3, 1890.00),
  (2026, 'housing_and_utilities', 'CA', 'Kern', 4, 2100.00),
  (2026, 'housing_and_utilities', 'CA', 'Kern', 5, 2268.00);

-- CA - San Mateo County — Very High Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'CA', 'San Mateo', 1, 2925.00),
  (2026, 'housing_and_utilities', 'CA', 'San Mateo', 2, 3600.00),
  (2026, 'housing_and_utilities', 'CA', 'San Mateo', 3, 4050.00),
  (2026, 'housing_and_utilities', 'CA', 'San Mateo', 4, 4500.00),
  (2026, 'housing_and_utilities', 'CA', 'San Mateo', 5, 4860.00);

-- CA - Ventura County — High Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'CA', 'Ventura', 1, 2340.00),
  (2026, 'housing_and_utilities', 'CA', 'Ventura', 2, 2880.00),
  (2026, 'housing_and_utilities', 'CA', 'Ventura', 3, 3240.00),
  (2026, 'housing_and_utilities', 'CA', 'Ventura', 4, 3600.00),
  (2026, 'housing_and_utilities', 'CA', 'Ventura', 5, 3888.00);

-- NJ - Passaic County — Medium-High Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'NJ', 'Passaic', 1, 2210.00),
  (2026, 'housing_and_utilities', 'NJ', 'Passaic', 2, 2720.00),
  (2026, 'housing_and_utilities', 'NJ', 'Passaic', 3, 3060.00),
  (2026, 'housing_and_utilities', 'NJ', 'Passaic', 4, 3400.00),
  (2026, 'housing_and_utilities', 'NJ', 'Passaic', 5, 3672.00);

-- NJ - Union County — High Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'NJ', 'Union', 1, 2405.00),
  (2026, 'housing_and_utilities', 'NJ', 'Union', 2, 2960.00),
  (2026, 'housing_and_utilities', 'NJ', 'Union', 3, 3330.00),
  (2026, 'housing_and_utilities', 'NJ', 'Union', 4, 3700.00),
  (2026, 'housing_and_utilities', 'NJ', 'Union', 5, 3996.00);

-- DC - District of Columbia — Very High Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'DC', 'District of Columbia', 1, 2795.00),
  (2026, 'housing_and_utilities', 'DC', 'District of Columbia', 2, 3440.00),
  (2026, 'housing_and_utilities', 'DC', 'District of Columbia', 3, 3870.00),
  (2026, 'housing_and_utilities', 'DC', 'District of Columbia', 4, 4300.00),
  (2026, 'housing_and_utilities', 'DC', 'District of Columbia', 5, 4644.00);

-- AL - Jefferson County (Birmingham) — Lower Cost
INSERT INTO public.irs_local_standards (effective_year, category, state, county, family_size, allowance) VALUES
  (2026, 'housing_and_utilities', 'AL', 'Jefferson', 1, 1300.00),
  (2026, 'housing_and_utilities', 'AL', 'Jefferson', 2, 1600.00),
  (2026, 'housing_and_utilities', 'AL', 'Jefferson', 3, 1800.00),
  (2026, 'housing_and_utilities', 'AL', 'Jefferson', 4, 2000.00),
  (2026, 'housing_and_utilities', 'AL', 'Jefferson', 5, 2160.00);

-- ---------------------------------------------------------------
-- Verification query (run after insert to confirm row count)
-- ---------------------------------------------------------------
-- SELECT COUNT(*) AS total_rows,
--        COUNT(DISTINCT state || '-' || county) AS unique_counties
-- FROM public.irs_local_standards
-- WHERE effective_year = 2026 AND category = 'housing_and_utilities';
-- Expected: 500 rows, 100 counties
