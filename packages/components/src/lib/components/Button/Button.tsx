/**
 * Copyright (c) Dynamic Quants and affiliates.
 *
 * This source code is part of Plexo library and is licensed under the MIT
 * license found in the LICENSE file in the root directory of this source tree.
 */
import { type FC, useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, type TouchableWithoutFeedbackProps } from 'react-native';
import { type LinkProps, Link as SolitoLinkButton } from 'solito/link';

import { type GetVariants, useStyles } from '@plexo/core';

import { P, XStack } from '../../primitives';
import { buttonStyle } from './Button.styles';

/**
 * Button variants.
 */
export type ButtonState = GetVariants<typeof buttonStyle>['state'];
export type ButtonType = GetVariants<typeof buttonStyle>['type'];

/**
 * Type only for pressable button props.
 */
type PressableButtonProps = Omit<TouchableWithoutFeedbackProps, 'style'> & { href?: never };

/**
 * Type only for link button props.
 */
type LinkButtonProps = Omit<LinkProps, 'style'>;

/**
 * Button props.
 */
type ButtonProps = {
  type?: GetVariants<typeof buttonStyle>['type'];
  inverse?: boolean;
  loading?: boolean;
  disabled?: boolean;
};

/**
 * This component is a wrapper around the Pressable component from `react-native` and the Link
 * component from `solito`. It provides a consistent way to create buttons in the app with the same
 * styles and behavior.
 */
export const Button: FC<ButtonProps & (PressableButtonProps | LinkButtonProps)> = ({
  type = 'solid',
  inverse = false,
  disabled = false,
  loading = false,
  children,
  ...props
}) => {
  const [state, setState] = useState<ButtonState>();
  const { root, label } = useStyles(buttonStyle, { state, type });

  useEffect(() => {
    setState(disabled || loading ? 'disabled' : 'active');
  }, [disabled, loading]);

  // The content itself.
  const content = loading ? (
    <XStack $gap="sm">
      <ActivityIndicator size={16} color={label.color} />
      <P $noSelect $st={label}>
        {children}
      </P>
    </XStack>
  ) : (
    <P $noSelect $st={label}>
      {children}
    </P>
  );

  return props?.href !== undefined ? (
    // In case of a link button, we use the Link component from solito.
    <SolitoLinkButton
      role="button"
      viewProps={{
        style: root,
        onPointerDown: () => setState('pressed'),
        onPointerDownCapture: () => setState(disabled ? 'disabled' : 'active'),
        onPointerEnter: () => setState('hovered'),
        onPointerLeave: () => setState(disabled ? 'disabled' : 'active'),
      }}
      {...(props as LinkProps)}
    >
      {content}
    </SolitoLinkButton>
  ) : (
    // In case of a regular button, we use the Pressable component from react-native.
    <Pressable
      testID="button"
      role="button"
      style={root}
      disabled={disabled || loading}
      onPressIn={() => setState('pressed')}
      onPressOut={() => setState(disabled ? 'disabled' : 'active')}
      onHoverIn={() => setState('hovered')}
      onHoverOut={() => setState(disabled ? 'disabled' : 'active')}
      {...(props as ButtonProps)}
    >
      {content}
    </Pressable>
  );
};
