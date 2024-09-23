/**
 * Copyright (c) Dynamic Quants and affiliates.
 *
 * This source code is part of Plexo library and is licensed under the MIT
 * license found in the LICENSE file in the root directory of this source tree.
 */
import { useContext, useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { THEME_BREAKPOINTS_NAME, THEME_ST_NAME, THEME_VARIANT_NAME } from './constants';
import { type GetVariants } from './generics';
import { createStyle } from './helpers';
import { processBreakpoints, processUtils, processVariants } from './processors';
import { ThemeProviderContext } from './theme';
import { type ThemeStyleOutput } from './types';

/**
 * Hook to use the Theme context.
 */
export const useTheme = () => useContext(ThemeProviderContext);

/**
 * Use style hook.
 */
export const useStyles = <T extends ReturnType<typeof createStyle>, V extends GetVariants<T>>(
  stylesheet: T,
  variant?: V
) => {
  const { runtime, ...context } = useTheme();
  const parsedStyles = useMemo(
    () => (typeof stylesheet === 'function' ? stylesheet(context) : stylesheet),
    [context, stylesheet]
  );

  const styles = useMemo(
    () =>
      Object.entries(parsedStyles)
        .map(([key, value]) => {
          // This is the case when on createComponent the value is a function.
          const styles = typeof value === 'function' ? value(context) : value;

          // St styles.
          const stStyles = THEME_ST_NAME in styles ? styles[THEME_ST_NAME] : {};

          // Breakpoints styles.
          const bpStyles =
            THEME_BREAKPOINTS_NAME in styles
              ? processBreakpoints(
                  styles[THEME_BREAKPOINTS_NAME],
                  runtime,
                  context.utils,
                  context.breakpoints
                )
              : {};

          // Variant styles (if exists).
          const va =
            variant && THEME_VARIANT_NAME in styles
              ? processVariants(styles[THEME_VARIANT_NAME], variant as V) || {}
              : {};

          const { nonUtils: vaNonUtils, utilsStyles: vaStyles } = processUtils(va, context.utils);

          // Checking if there are breakpoint styles in the variant and process them.
          const vaBpStyles =
            vaNonUtils && THEME_BREAKPOINTS_NAME in vaNonUtils
              ? processBreakpoints(
                  vaNonUtils[THEME_BREAKPOINTS_NAME],
                  runtime,
                  context.utils,
                  context.breakpoints
                )
              : {};

          // Utilities styles.
          const { utilsStyles } = processUtils(styles, context.utils);

          // Consolidate styles.
          return {
            [key]: { ...stStyles, ...utilsStyles, ...vaStyles, ...vaBpStyles, ...bpStyles },
          };
        })
        .reduce((prev, current) => {
          return { ...prev, ...current };
        }, {}),
    [context, parsedStyles, variant, runtime]
  );

  // Using the native stylesheet create (this make css classes in web environments).
  return StyleSheet.create(styles) as ThemeStyleOutput<T>;
};
