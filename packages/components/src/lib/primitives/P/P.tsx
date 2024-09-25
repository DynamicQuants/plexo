/**
 * Copyright (c) Dynamic Quants and affiliates.
 *
 * This source code is part of Plexo library and is licensed under the MIT
 * license found in the LICENSE file in the root directory of this source tree.
 */
import { P as ExpoP } from '@expo/html-elements';
import { type TextProps } from '@expo/html-elements/build/primitives/Text';
import { forwardRef } from 'react';
import { Platform } from 'react-native';

import { createComponent } from '@plexo/core';

// This is necessary because the `P` does not render correctly with the `p` tag on web.
const nativeProps: any = Platform.select({
  web: {
    role: 'paragraph',
  },
});

// This fix is necessary because the `P` does not render correctly with the `p` tag on web.
const Paragraph = forwardRef((props: TextProps, ref) => (
  <ExpoP ref={ref} {...nativeProps} {...props} />
));

/**
 * A paragraph primitive component that renders a `p` tag in web contexts. It is a wrapper around
 * the `Text` component in mobile contexts.
 */
export const P = createComponent('P', Paragraph, {
  $text: 'p',
  $align: 'left',
  $tt: 'normal-case',
  $font: 'normal',
  $tc: 'primary',
});
