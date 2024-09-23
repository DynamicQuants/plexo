/**
 * Copyright (c) Dynamic Quants and affiliates.
 *
 * This source code is part of Plexo library and is licensed under the MIT
 * license found in the LICENSE file in the root directory of this source tree.
 */

/**
 * Theme prefix for utils and reserved keys.
 */
export const THEME_PREFIX = '$' as const;

/**
 * Style property name.
 */
const THEME_ST_PROP = 'st' as const;
export const THEME_ST_NAME = `${THEME_PREFIX}${THEME_ST_PROP}` as const;

/**
 * Variant property name.
 */
const THEME_VARIANT_PROP = 'variants' as const;
export const THEME_VARIANT_NAME = `${THEME_PREFIX}${THEME_VARIANT_PROP}` as const;

/**
 * Breakpoints property name.
 */
const THEME_BREAKPOINTS_PROP = 'breakpoints' as const;
export const THEME_BREAKPOINTS_NAME = `${THEME_PREFIX}${THEME_BREAKPOINTS_PROP}` as const;
