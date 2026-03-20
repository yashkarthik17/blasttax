-- ============================================================
-- BlastTax CRM - Seed IRS Standards & Federal Poverty Levels
-- Migration 002: 2026 reference data
-- ============================================================

-- -----------------------------------------------------------
-- 1. National Standards: Food, Clothing & Other Items (2026)
--    8 income brackets x 5 family sizes = 40 rows
-- -----------------------------------------------------------

INSERT INTO public.irs_national_standards
  (effective_year, category, income_low, income_high, family_size, allowance)
VALUES
  -- Bracket 1: Under $1,667
  (2026, 'food_clothing_misc', 0,       1666.99, 1, 735),
  (2026, 'food_clothing_misc', 0,       1666.99, 2, 1143),
  (2026, 'food_clothing_misc', 0,       1666.99, 3, 1263),
  (2026, 'food_clothing_misc', 0,       1666.99, 4, 1570),
  (2026, 'food_clothing_misc', 0,       1666.99, 5, 1931),  -- 1570 + 361

  -- Bracket 2: $1,667 - $2,499
  (2026, 'food_clothing_misc', 1667,    2499.99, 1, 821),
  (2026, 'food_clothing_misc', 1667,    2499.99, 2, 1230),
  (2026, 'food_clothing_misc', 1667,    2499.99, 3, 1362),
  (2026, 'food_clothing_misc', 1667,    2499.99, 4, 1649),
  (2026, 'food_clothing_misc', 1667,    2499.99, 5, 2031),  -- 1649 + 382

  -- Bracket 3: $2,500 - $3,332
  (2026, 'food_clothing_misc', 2500,    3332.99, 1, 860),
  (2026, 'food_clothing_misc', 2500,    3332.99, 2, 1278),
  (2026, 'food_clothing_misc', 2500,    3332.99, 3, 1392),
  (2026, 'food_clothing_misc', 2500,    3332.99, 4, 1710),
  (2026, 'food_clothing_misc', 2500,    3332.99, 5, 2109),  -- 1710 + 399

  -- Bracket 4: $3,333 - $4,166
  (2026, 'food_clothing_misc', 3333,    4166.99, 1, 922),
  (2026, 'food_clothing_misc', 3333,    4166.99, 2, 1329),
  (2026, 'food_clothing_misc', 3333,    4166.99, 3, 1475),
  (2026, 'food_clothing_misc', 3333,    4166.99, 4, 1800),
  (2026, 'food_clothing_misc', 3333,    4166.99, 5, 2221),  -- 1800 + 421

  -- Bracket 5: $4,167 - $5,832
  (2026, 'food_clothing_misc', 4167,    5832.99, 1, 987),
  (2026, 'food_clothing_misc', 4167,    5832.99, 2, 1440),
  (2026, 'food_clothing_misc', 4167,    5832.99, 3, 1577),
  (2026, 'food_clothing_misc', 4167,    5832.99, 4, 1929),
  (2026, 'food_clothing_misc', 4167,    5832.99, 5, 2365),  -- 1929 + 436

  -- Bracket 6: $5,833 - $7,499
  (2026, 'food_clothing_misc', 5833,    7499.99, 1, 1041),
  (2026, 'food_clothing_misc', 5833,    7499.99, 2, 1501),
  (2026, 'food_clothing_misc', 5833,    7499.99, 3, 1648),
  (2026, 'food_clothing_misc', 5833,    7499.99, 4, 2013),
  (2026, 'food_clothing_misc', 5833,    7499.99, 5, 2458),  -- 2013 + 445

  -- Bracket 7: $7,500 - $8,332
  (2026, 'food_clothing_misc', 7500,    8332.99, 1, 1041),
  (2026, 'food_clothing_misc', 7500,    8332.99, 2, 1520),
  (2026, 'food_clothing_misc', 7500,    8332.99, 3, 1670),
  (2026, 'food_clothing_misc', 7500,    8332.99, 4, 2052),
  (2026, 'food_clothing_misc', 7500,    8332.99, 5, 2504),  -- 2052 + 452

  -- Bracket 8: $8,333+
  (2026, 'food_clothing_misc', 8333,    NULL,    1, 1089),
  (2026, 'food_clothing_misc', 8333,    NULL,    2, 1594),
  (2026, 'food_clothing_misc', 8333,    NULL,    3, 1738),
  (2026, 'food_clothing_misc', 8333,    NULL,    4, 2121),
  (2026, 'food_clothing_misc', 8333,    NULL,    5, 2589);  -- 2121 + 468

-- -----------------------------------------------------------
-- 2. National Standards: Out-of-Pocket Healthcare (2026)
-- -----------------------------------------------------------

INSERT INTO public.irs_national_standards
  (effective_year, category, income_low, income_high, family_size, allowance)
VALUES
  -- Under 65 - $84/month per person (family_size used as multiplier)
  (2026, 'oop_healthcare_under65', NULL, NULL, 1, 84),
  (2026, 'oop_healthcare_under65', NULL, NULL, 2, 168),
  (2026, 'oop_healthcare_under65', NULL, NULL, 3, 252),
  (2026, 'oop_healthcare_under65', NULL, NULL, 4, 336),
  (2026, 'oop_healthcare_under65', NULL, NULL, 5, 420),

  -- 65 and older - $149/month per person
  (2026, 'oop_healthcare_65plus', NULL, NULL, 1, 149),
  (2026, 'oop_healthcare_65plus', NULL, NULL, 2, 298),
  (2026, 'oop_healthcare_65plus', NULL, NULL, 3, 447),
  (2026, 'oop_healthcare_65plus', NULL, NULL, 4, 596),
  (2026, 'oop_healthcare_65plus', NULL, NULL, 5, 745);

-- -----------------------------------------------------------
-- 3. Transportation Standards (2026)
-- -----------------------------------------------------------

-- Ownership costs: national, per vehicle
INSERT INTO public.irs_transportation_standards
  (effective_year, category, region, allowance)
VALUES
  (2026, 'ownership', NULL, 662),

  -- Operating costs by Census region
  (2026, 'operating', 'Northeast', 278),
  (2026, 'operating', 'Midwest',   233),
  (2026, 'operating', 'South',     233),
  (2026, 'operating', 'West',      270),

  -- Public transportation by Census region
  (2026, 'public_transit', 'Northeast', 280),
  (2026, 'public_transit', 'Midwest',   242),
  (2026, 'public_transit', 'South',     242),
  (2026, 'public_transit', 'West',      260);

-- -----------------------------------------------------------
-- 4. Federal Poverty Levels 2026 (250% multiplier)
--    Used for OIC low-income certification
-- -----------------------------------------------------------

INSERT INTO public.federal_poverty_levels
  (effective_year, multiplier, family_size, annual_amount, monthly_amount)
VALUES
  (2026, 2.50, 1, 39900,  3325.00),
  (2026, 2.50, 2, 54100,  4508.33),
  (2026, 2.50, 3, 68300,  5691.67),
  (2026, 2.50, 4, 82500,  6875.00),
  (2026, 2.50, 5, 96700,  8058.33),   -- 82500 + 14200
  (2026, 2.50, 6, 110900, 9241.67),   -- 82500 + 14200*2
  (2026, 2.50, 7, 125100, 10425.00),  -- 82500 + 14200*3
  (2026, 2.50, 8, 139300, 11608.33);  -- 82500 + 14200*4
