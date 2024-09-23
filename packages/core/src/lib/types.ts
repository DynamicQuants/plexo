/**
 * Copyright (c) Dynamic Quants and affiliates.
 *
 * This source code is part of Plexo library and is licensed under the MIT
 * license found in the LICENSE file in the root directory of this source tree.
 */
import type { CSSProperties, PropsWithChildren } from 'react';
import type { ImageStyle, ScaledSize, TextStyle, ViewStyle } from 'react-native';
import type { ClassInput, Style } from 'twrnc';

import { THEME_BREAKPOINTS_NAME, THEME_ST_NAME, THEME_VARIANT_NAME } from './constants';
import type { breakpoints, defaultTheme, utils } from './defaults';
import type {
  CheckThemeStyles,
  CheckUtilVarname,
  ConvertToNativeStyles,
  ThemeStylesFn,
  ThemeUtilsFn,
} from './generics';

/**
 * Theme configuration.
 */
export type DefaultThemes = {
  default: typeof defaultTheme;
};
export interface ThemeConfig extends DefaultThemes {}

/**
 * Theme utilities.
 */
export type DefaultUtils = typeof utils;
export interface ThemeUtils extends DefaultUtils {}

/**
 * Theme breakpoints.
 */
export type DefaultBreakpoints = typeof breakpoints;
export interface ThemeBreakpoints extends DefaultBreakpoints {}

/**
 * Theme context properties.
 */
export interface ThemeContext {
  theme: ThemeDefinition;
  tw: ThemeTw;
  utils: ReturnType<ThemeUtils>;
  breakpoints: ThemeBreakpoints;
  runtime: {
    matcher: (breakpoint: keyof ThemeBreakpoints, colorScheme?: ThemeColorScheme) => boolean;
    themeName: keyof ThemeConfig;
    setTheme: (theme: keyof ThemeConfig) => void;
    colorScheme: ThemeColorScheme;
    toggleColorScheme: () => void;
    setColorScheme: (colorScheme: ThemeColorScheme) => void;
    window: ScaledSize;
    screen: ScaledSize;
  };
}

/**
 * Theme provider properties.
 */
export interface ThemeProviderProps extends PropsWithChildren {
  /**
   * The initial theme.
   */
  initialTheme: keyof ThemeConfig;

  /**
   * The theme config.
   */
  themes: ThemeConfig;

  /**
   * The utility styles.
   */
  utilsConfig: ThemeUtils;

  /**
   * Theme tw config.
   */
  twConfig?: ThemeTwConfig;

  /**
   * Theme Breakpoints.
   */
  breakpoints: ThemeBreakpoints;

  /**
   * The theme color initial color scheme.
   */
  initialColorScheme?: ThemeColorScheme;
}

/**
 * The theme definition type using the theme config.
 */
export type ThemeDefinition = ThemeConfig[keyof ThemeConfig];

/**
 * Theme color scheme type.
 */
export type ThemeColorScheme = 'light' | 'dark';

/**
 * The Tailwind CSS object.
 */
export type ThemeTw = (...args: ClassInput[]) => NativeStyles;

/**
 * Tailwind configuration.
 */
export type ThemeTwConfig = {
  fontFamily: Record<string, string[]>;
  utilities: Record<string, Style | string>;
};

/**
 * Represents all possible react native styles properties.
 */
export type NativeStyles = Partial<ImageStyle & TextStyle & ViewStyle>;

/**
 * The theme utils parameters.
 */
export type UtilsStyles = {
  [K in keyof ThemeContext['utils']]?: ThemeContext['utils'][K] extends (
    ...args: infer P
  ) => unknown
    ? P extends [infer U]
      ? U
      : P
    : boolean;
};

/**
 * The theme standard styles properties.
 */
export type StandardStyles = {
  [K in typeof THEME_ST_NAME]?: NativeStyles | CSSProperties;
};

/**
 * The theme variant styles properties.
 */
export type VariantsStyles = {
  [K in typeof THEME_VARIANT_NAME]?: {
    [variantName: string]: Record<string, Omit<ThemeStyles, typeof THEME_VARIANT_NAME>>;
  };
};

/**
 * The theme breakpoint styles properties.
 */
export type BreakpointStyles = {
  [K in typeof THEME_BREAKPOINTS_NAME]?: {
    [K in keyof ThemeBreakpoints]?: Omit<ThemeStyles, keyof ThemeBreakpoints>;
  };
};

/**
 * All accepted styles properties. Is a consolidation of the utils and the theme styles.
 */
export type ThemeStyles = UtilsStyles & StandardStyles & VariantsStyles & BreakpointStyles;

/**
 * Represents a theme object used to define a theme.
 */
type ThemeRecord = {
  [key: string | number]:
    | string
    | number
    | ThemeRecord
    | ((...args: never) => string | number | ThemeRecord);
};

/**
 * Represents a theme styles object.
 */
export type ThemeStylesRecord = {
  [styleName: string]: ThemeStyles;
};

/**
 * Represents a theme utils object.
 */
export type ThemeUtilsRecord = {
  [utilName: string]: NativeStyles | ((...args: any) => NativeStyles);
};

/**
 * Represents a theme breakpoints object.
 *
 * The breakpoints object is used to define the screen sizes. The values must be in pixels.
 */
export type ThemeBreakpointsRecord = Record<string, `${string}px`>;

/**
 * Represents a theme definition.
 *
 * Colors and sizes are the only required keys in the theme object. The rest of the keys are free
 * to be defined.
 */
export type ThemeInput =
  | {
      /**
       * The colors object is used to define the colors of the theme, mainly used for
       * text and background.
       */
      colors: Record<string, string | { light: string; dark: string }>;

      /**
       * Used for width and height sizes.
       */
      sizes: Record<string | number, number | string> & {
        auto: 'auto';
        fit: 'fit';
        full: 'full';
        screen: 'screen';
      };

      /**
       * Used for margin and padding spacing.
       */
      spacing: Record<string | number, number | string>;
    } & ThemeRecord;

/**
 * Input to create a theme style.
 */
export type ThemeStyleInput<T extends ThemeStylesRecord> =
  | ThemeStylesFn<CheckThemeStyles<T>>
  | CheckThemeStyles<T>;

/**
 * Output of a theme style.
 */
export type ThemeStyleOutput<T> = T extends ThemeStylesFn<CheckThemeStyles<T>>
  ? ConvertToNativeStyles<ReturnType<T>>
  : ConvertToNativeStyles<T>;

/**
 * Input to create a theme utils.
 */
export type ThemeUtilsInput<T extends ThemeUtilsRecord> = ThemeUtilsFn<CheckUtilVarname<T>>;

/**
 * Input to create a themed component.
 */
export type CreateComponentInput = ThemeStylesFn<ThemeStyles> | ThemeStyles;
