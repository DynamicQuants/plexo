/**
 * Copyright (c) Dynamic Quants and affiliates.
 *
 * This source code is part of Plexo library and is licensed under the MIT
 * license found in the LICENSE file in the root directory of this source tree.
 */
import { Platform } from 'react-native';

import { createStyle } from '@plexo/core';

export const buttonStyle = createStyle({
  root: {
    $bg: 'primary',
    $w: 'full',
    $h: 'control',
    $items: 'center',
    $justify: 'center',
    $r: 'xl',
    $mx: 'auto',
    $px: 'lg',
    $outline: 'none',
    $variants: {
      state: {
        disabled: {
          $o: 0.3,
        },
        pressed: {
          $o: 0.4,
        },
        active: {
          $o: 1,
        },
        hovered: {
          $o: 0.85,
          $cursor: 'pointer',
        },
      },
      type: {
        flatten: {
          $bg: 'transparent',
        },
        solid: {
          $st: {
            ...Platform.select({
              web: {
                boxShadow:
                  '0px 2px 8px 0px rgba(0, 0, 0, 0.1), 0px 1px 0px 0px rgba(255, 255, 255, 0.3) inset',
              },
            }),
          },
        },
      },
    },
  },
  label: {
    $align: 'center',
    $text: 'button',
    $font: 'medium',
    $variants: {
      state: {
        disabled: {
          $o: 0.8,
        },
        pressed: {
          $o: 0.8,
        },
        active: {
          $o: 1,
        },
      },
      type: {
        flatten: {
          $tc: 'primary',
        },
        solid: {
          $tc: 'main',
        },
      },
    },
  },
});
