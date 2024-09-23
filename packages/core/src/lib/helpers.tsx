/**
 * Copyright (c) Dynamic Quants and affiliates.
 *
 * This source code is part of Plexo library and is licensed under the MIT
 * license found in the LICENSE file in the root directory of this source tree.
 */
import { type ComponentType, type PropsWithChildren, forwardRef } from 'react';

import { type ThemeStylesFn } from './generics';
import { useStyles } from './hooks';
import type {
  CreateComponentInput,
  ThemeBreakpointsRecord,
  ThemeInput,
  ThemeStyleInput,
  ThemeStyles,
  ThemeStylesRecord,
  ThemeTwConfig,
  ThemeUtilsInput,
  ThemeUtilsRecord,
} from './types';

/**
 * Helper to create a theme.
 */
export const createTheme = <T extends ThemeInput>(theme: T) => theme;

/**
 * Helper to create a Tailwind config.
 */
export const createTwConfig = (config: ThemeTwConfig) => config;

/*
 * Helper to create theme styles.
 */
export const createStyle = <T extends ThemeStylesRecord>(style: ThemeStyleInput<T>) => style;

/*
 * Helper to create theme utilities.
 */
export const createUtils = <T extends ThemeUtilsRecord>(utils: ThemeUtilsInput<T>) => utils;

/**
 * Helper to create the theme breakpoints used in the ThemeProvider configuration.
 *
 * @param breakpoints - Object which defines the screen sizes. The values must be in pixels.
 * @returns The breakpoints object to be used in the `ThemeProvider`.
 *
 * @example
 *
 * ```ts
 * const breakpoints = createBreakpoints({
 *    xs: '0px',
 *    sm: '576px',
 *    md: '768px',
 *    lg: '992px',
 *    xl: '1200px',
 *    xxl: '1536px',
 * });
 * ```
 */
export const createBreakpoints = <T extends ThemeBreakpointsRecord>(breakpoints: T) => breakpoints;

/**
 * Helper to create a themed component.
 *
 * @param Component - The react component to be themed.
 * @param defaultProps - The default styles for the component.
 *
 * @returns The themed component.
 *
 * @example
 *
 * ```tsx
 * const Shape = createComponent('Shape', View, {
 *  $w: '10',
 *  $h: '10',
 *  $bg: 'neutral',
 * });
 *
 * const Circle = createComponent('Circle', Shape, {
 *  $r: 'full',
 *  $bg: 'green',
 * });
 *
 * const Square = createComponent('Square', Shape, {
 *  $r: 'none',
 *  $bg: 'red',
 * });
 * ```
 */
export function createComponent<K, T = ThemeStyles>(
  name: string,
  Component: ComponentType<any>,
  defaultProps: ThemeStylesFn<T> | T,
  props: K = {} as K
) {
  const ThemedComponent = forwardRef(
    (
      {
        children,
        ...componentProps
      }: PropsWithChildren<CreateComponentInput> & {
        parentDefaultProps?: ThemeStylesFn<T> | T;
      },
      ref
    ) => {
      // If parent exists (was created with createComponent), merge the parent default styles with
      // the current default component styles.
      const parentDefaultProps = Component.defaultProps?.parentDefaultProps ?? {};

      // Creating styles.
      const parentDefaultStyles = useStyles({ root: parentDefaultProps });
      const defaultStyles = useStyles({ root: defaultProps } as any);
      const componentStyles = useStyles({ root: componentProps } as any);

      return (
        <Component
          ref={ref}
          allowFontScaling={false}
          style={[parentDefaultStyles.root, defaultStyles.root, componentStyles.root]}
          {...componentProps}
          {...props}
        >
          {children}
        </Component>
      );
    }
  );

  ThemedComponent.displayName = name;
  ThemedComponent.defaultProps = { parentDefaultProps: defaultProps };

  return ThemedComponent as ComponentType<PropsWithChildren<CreateComponentInput & Partial<K>>>;
}
