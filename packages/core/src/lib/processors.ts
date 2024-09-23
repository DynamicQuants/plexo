/**
 * Copyright (c) Dynamic Quants and affiliates.
 *
 * This source code is part of Plexo library and is licensed under the MIT
 * license found in the LICENSE file in the root directory of this source tree.
 */
import { THEME_ST_NAME } from './constants';
import type {
  NativeStyles,
  ThemeBreakpoints,
  ThemeContext,
  ThemeStyles,
  UtilsStyles,
  VariantsStyles,
} from './types';

/**
 * Process util styles.
 */
export const processUtils = (props: UtilsStyles | NativeStyles, utils: ThemeContext['utils']) => {
  if (Object.keys(props).length === 0) {
    return {};
  }

  const nonUtilsKeys: any[] = [];

  const utilsStyles = Object.entries(props)
    .map(([key, value]) => {
      // If the key is the theme standard name, return the value.
      if (key === THEME_ST_NAME) {
        return value;
      }

      const util = utils[key as keyof UtilsStyles];

      if (util === undefined) {
        nonUtilsKeys.push({ [key]: value });
        return {};
      }

      return typeof util === 'function'
        ? Array.isArray(value) && value.length > 0
          ? (util as any)(...value)
          : (util as any)(value)
        : value
        ? util
        : {};
    })
    .reduce((prev, current) => {
      return { ...prev, ...current };
    }, {}) as NativeStyles;

  const nonUtils = nonUtilsKeys.reduce((prev, current) => {
    return { ...prev, ...current };
  }, {});

  return {
    nonUtils,
    utilsStyles,
  };
};

/**
 * Process variants styles.
 */
export const processVariants = (variants: VariantsStyles, selected: Record<string, string>) => {
  return Object.entries(selected).reduce((prev, [key, state]) => {
    const variant = variants[key as keyof VariantsStyles]?.[state];
    return { ...prev, ...variant };
  }, {});
};

/**
 * Process breakpoints styles.
 */
export const processBreakpoints = (
  styles: Record<keyof ThemeBreakpoints, Omit<ThemeStyles, keyof ThemeBreakpoints>>,
  runtime: ThemeContext['runtime'],
  utils: ThemeContext['utils'],
  breakpoints: ThemeContext['breakpoints']
) => {
  const { matcher } = runtime;

  // The given styles are sorted descending by the breakpoint value.
  const sortedStyles = Object.fromEntries(
    Object.keys(breakpoints)
      .sort(
        (a, b) =>
          parseInt(breakpoints[b as keyof typeof breakpoints]) -
          parseInt(breakpoints[a as keyof typeof breakpoints])
      )
      .filter((key) => key in styles)
      .map((key) => [key, styles[key as keyof typeof breakpoints]])
  );

  // Iterate over the sorted breakpoints and return the first match.
  for (const [key, value] of Object.entries(sortedStyles)) {
    const breakpointMatch = matcher(key as keyof ThemeBreakpoints);

    if (breakpointMatch) {
      const { utilsStyles } = processUtils(value, utils);
      return utilsStyles;
    }
  }

  return {};
};
