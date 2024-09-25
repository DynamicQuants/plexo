/**
 * Copyright (c) Dynamic Quants and affiliates.
 *
 * This source code is part of Plexo library and is licensed under the MIT
 * license found in the LICENSE file in the root directory of this source tree.
 */
import { Div } from '@expo/html-elements';

import { createComponent } from '@plexo/core';

/**
 * Stack primitive aligned horizontally.
 */
export const XStack = createComponent('XStack', Div, {
  $flex: ['row'],
  $gap: 'md',
  $bg: 'transparent',
});

/**
 * Stack primitive aligned vertically.
 */
export const YStack = createComponent('YStack', Div, {
  $flex: ['col'],
  $gap: 'md',
  $bg: 'transparent',
});
