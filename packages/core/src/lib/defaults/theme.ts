/**
 * Copyright (c) Dynamic Quants and affiliates.
 *
 * This source code is part of Plexo library and is licensed under the MIT
 * license found in the LICENSE file in the root directory of this source tree.
 */
import { createTheme } from '../helpers';

const px = (value: number) => `${value * 8}px`;

/**
 * Default Minimal theme.
 */
export const defaultTheme = createTheme({
  sizes: {
    auto: 'auto',
    fit: 'fit',
    full: 'full',
    screen: 'screen',
    phone: '450px',
    web: '650px',
    portrait: '800px',
    aside: '250px',
    paper: '600px',
    control: px(6.5),
    iconXs: px(5),
    iconSm: px(6),
    iconMd: px(7),
    iconLg: px(8),
    avatarSm: px(8),
    avatarMd: px(16),
    avatarLg: px(32),
    indicator: px(1),
  },
  spacing: {
    auto: 'auto',
    none: 0,
    xs: '4px',
    sm: '16px',
    md: '24px',
    lg: '32px',
    xl: '48px',
    logo: px(1),
  },
  colors: {
    transparent: 'transparent',
    inherit: 'inherit',
    main: {
      light: '#ffffff',
      dark: '#000000',
    },
    contrast: {
      light: '#fafafa',
      dark: '#020202',
    },
    primary: {
      light: '#020202',
      dark: '#ffffff',
    },
    secondary: {
      light: '#B4B4B4',
      dark: '#121212',
    },
    border: {
      light: '#E5E7EB',
      dark: '#121212',
    },
    warning: '#fbbf24',
    error: '#f07178',
    success: '#10b981',
    info: '#3b82f6',
  },
});
