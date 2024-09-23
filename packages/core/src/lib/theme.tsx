/**
 * Copyright (c) Dynamic Quants and affiliates.
 *
 * This source code is part of Plexo library and is licensed under the MIT
 * license found in the LICENSE file in the root directory of this source tree.
 */
import { type FC, createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { Dimensions } from 'react-native';
import { useAppColorScheme, useDeviceContext } from 'twrnc';

import { createTw } from './tw';
import type {
  ThemeBreakpoints,
  ThemeColorScheme,
  ThemeConfig,
  ThemeContext,
  ThemeProviderProps,
} from './types';

/**
 * The theme context provider.
 */
export const ThemeProviderContext = createContext<ThemeContext>({} as ThemeContext);

/**
 * Hook to get the dimensions of the screen and window.
 */
const useDimensions = () => {
  // TODO: this cause many re-renders, we need to optimize this. Using debounce could be a solution.
  // Ref: https://github.com/jpudysz/react-native-unistyles/commit/b015d7b41aa01aecbbdd8041f7701d309b1436b1
  const [dimensions, setDimensions] = useState({
    window: Dimensions.get('window'),
    screen: Dimensions.get('screen'),
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window, screen }) => {
      setDimensions({ window, screen });
    });
    return () => subscription?.remove();
  });

  return dimensions;
};

/**
 * The theme provider.
 */
export const ThemeProvider: FC<ThemeProviderProps> = ({
  initialTheme,
  themes,
  utilsConfig,
  twConfig,
  breakpoints,
  initialColorScheme = 'dark',
  children,
}) => {
  const { twStyler, tw } = useMemo(() => createTw(twConfig, breakpoints), [twConfig, breakpoints]);
  useDeviceContext(tw, {
    observeDeviceColorSchemeChanges: false,
    initialColorScheme,
  });

  const [colorScheme, toggleColorScheme, setColorScheme] = useAppColorScheme(tw);
  const [themeName, setTheme] = useState<keyof ThemeConfig>(initialTheme);
  const theme = useMemo(() => themes[themeName], [themeName, themes]);
  const { screen, window } = useDimensions();

  const matcher = useCallback(
    (breakpoint: keyof ThemeBreakpoints, colorScheme?: ThemeColorScheme) =>
      colorScheme
        ? tw.prefixMatch(breakpoint as string, colorScheme)
        : tw.prefixMatch(breakpoint as string),
    [tw]
  );

  const runtime = useMemo(
    () => ({
      themeName,
      setTheme,
      matcher,
      colorScheme: colorScheme as ThemeColorScheme,
      toggleColorScheme,
      setColorScheme,
      screen,
      window,
    }),
    [themeName, setTheme, matcher, colorScheme, toggleColorScheme, setColorScheme, screen, window]
  );

  const utils = useMemo(
    () =>
      typeof utilsConfig === 'function'
        ? utilsConfig({ theme, tw: twStyler, runtime })
        : utilsConfig,
    [utilsConfig, theme, twStyler, runtime]
  );

  const value: ThemeContext = useMemo(
    () => ({
      theme,
      tw: twStyler,
      utils,
      breakpoints,
      runtime,
    }),
    [theme, twStyler, utils, breakpoints, runtime]
  );

  return <ThemeProviderContext.Provider value={value}>{children}</ThemeProviderContext.Provider>;
};
