/**
 * Copyright (c) Dynamic Quants and affiliates.
 *
 * This source code is part of Plexo library and is licensed under the MIT
 * license found in the LICENSE file in the root directory of this source tree.
 */
import { THEME_PREFIX, THEME_ST_NAME, THEME_VARIANT_NAME } from './constants';
import type { NativeStyles, ThemeContext, ThemeStyles } from './types';

/**
 * Create a styles function that contains the theme, tw and utils theme context properties.
 */
export type ThemeStylesFn<T> = (params: {
  theme: ThemeContext['theme'];
  tw: ThemeContext['tw'];
  utils: ThemeContext['utils'];
}) => T;

/**
 * Create a utils function that contains the theme and tw theme context properties.
 */
export type ThemeUtilsFn<T> = (params: {
  theme: ThemeContext['theme'];
  tw: ThemeContext['tw'];
  runtime: ThemeContext['runtime'];
}) => T;

/**
 * Check if the object has a key with the THEME_PREFIX and is different from
 * the THEME_ST_NAME and THEME_VARIANT_NAME.
 */
export type CheckUtilVarname<T> = {
  // Must be string and prefixed with THEME_PREFIX.
  [K in keyof T]: K extends `${typeof THEME_PREFIX}${string}`
    ? // Must be different from the THEME_ST_NAME.
      K extends typeof THEME_VARIANT_NAME
      ? never
      : // Must be different from the THEME_VARIANT_NAME.
      K extends typeof THEME_ST_NAME
      ? never
      : T[K]
    : never;
};

/**
 * Checks if the given object corresponds to the ThemeStyles type.
 */
export type CheckThemeStyles<T> = {
  [K in keyof T]: T[K] extends ThemeStyles
    ? CheckThemeStyles<T[K]>
    : K extends keyof ThemeStyles
    ? T[K]
    : never;
};

/**
 * Get the variants from the styles object.
 */
export type GetVariants<T> = T extends {
  [key: string]: {
    $variants: infer V;
  };
}
  ? {
      [K in keyof V]?: keyof V[K];
    }
  : never;

/**
 * Get the styles from the styles object.
 */
export type ConvertToNativeStyles<T> = {
  [K in keyof T]: NativeStyles;
};
