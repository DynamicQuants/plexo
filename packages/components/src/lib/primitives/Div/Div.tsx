/**
 * Copyright (c) Dynamic Quants and affiliates.
 *
 * This source code is part of Plexo library and is licensed under the MIT
 * license found in the LICENSE file in the root directory of this source tree.
 */
import { Div as ExpoDiv } from '@expo/html-elements';
import { type ViewProps } from 'react-native';

import { createComponent } from '@plexo/core';

/**
 * Use this as a replacement for View component. It renders a Div element in web contexts.
 * By default it has a transparent background.
 */
export const Div = createComponent<Omit<ViewProps, 'styles'>>('Div', ExpoDiv, {
  $bg: 'transparent',
});
