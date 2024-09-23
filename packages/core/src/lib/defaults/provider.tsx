/**
 * Copyright (c) Dynamic Quants and affiliates.
 *
 * This source code is part of Plexo library and is licensed under the MIT
 * license found in the LICENSE file in the root directory of this source tree.
 */
import type { FC, PropsWithChildren } from 'react';

import { ThemeProvider } from '../theme';
import { breakpoints } from './breakpoints';
import { defaultTheme } from './theme';
import { twConfig } from './tw';
import { utils } from './utils';

/**
 * Default custom Theme Provider.
 */
export const DefaultThemeProvider: FC<PropsWithChildren> = ({ children }) => (
  <ThemeProvider
    themes={{
      default: defaultTheme,
    }}
    twConfig={twConfig}
    breakpoints={breakpoints}
    utilsConfig={utils}
    initialTheme="default"
    initialColorScheme="dark"
  >
    {children}
  </ThemeProvider>
);
