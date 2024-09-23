/**
 * Copyright (c) Dynamic Quants and affiliates.
 *
 * This source code is part of Plexo library and is licensed under the MIT
 * license found in the LICENSE file in the root directory of this source tree.
 */
import plugin from 'tailwindcss/plugin';
import { create } from 'twrnc';

import type { ThemeBreakpoints, ThemeTwConfig } from './types';

/**
 * Creates a new instance of the Tailwind object.
 */
export const createTw = (twConfig: ThemeTwConfig, breakpoints: ThemeBreakpoints) => {
  const tw = create({
    theme: {
      extend: {
        // This allows to the runtime use the breakpoints in the matcher.
        screens: breakpoints,
        // For now is responsibility of the user to add the font family.
        fontFamily: twConfig.fontFamily,
      },
    },
    plugins: [
      plugin(({ addUtilities }) => {
        addUtilities(twConfig.utilities as any);
      }) as any,
    ],
  });

  return {
    tw,
    twStyler: tw.style,
  };
};
