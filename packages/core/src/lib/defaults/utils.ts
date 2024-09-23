/**
 * Copyright (c) Dynamic Quants and affiliates.
 *
 * This source code is part of Plexo library and is licensed under the MIT
 * license found in the LICENSE file in the root directory of this source tree.
 */
import { Platform, StyleSheet } from 'react-native';

import { createUtils } from '../helpers';
import { type ThemeDefinition, type ThemeTw } from '../types';

/**
 * All colors type.
 */
export type Color = keyof ThemeDefinition['colors'];

/**
 * All spacing type.
 */
export type Spacing = keyof ThemeDefinition['spacing'];

/**
 * All sizes type.
 */
export type Size = keyof ThemeDefinition['sizes'];

/**
 * Rounded Size type.
 */
export type RoundedSize = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';

/**
 * Rounded Position type.
 */
export type RoundedPosition = 't' | 'r' | 'b' | 'l' | 'tl' | 'tr' | 'br' | 'bl';

/**
 * Spacing Position type.
 */
export type SpacingPosition = 't' | 'r' | 'b' | 'l' | 'x' | 'y' | '';

/**
 * Text Transform type.
 */
export type TextTransform = 'uppercase' | 'lowercase' | 'capitalize' | 'normal-case';

/**
 * Text Decoration type.
 */
export type TextDecoration = 'underline' | 'line-through' | 'no-underline';

/**
 * Font type.
 */
export type FontType =
  | 'thin'
  | 'extralight'
  | 'light'
  | 'normal'
  | 'medium'
  | 'semibold'
  | 'bold'
  | 'extrabold'
  | 'black';

/**
 * Text variant type.
 */
export type TextVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'button' | 'caption';

/**
 * Flex variant type.
 */
export type FlexDirection = 'row' | 'col';

/**
 * Flex align type.
 */
export type FlexAlign = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';

/**
 * Flex justify content type.
 */
export type FlexJustify =
  | 'start'
  | 'center'
  | 'end'
  | 'between'
  | 'around'
  | 'evenly'
  | 'normal'
  | 'stretch';

/**
 * Align type.
 */
export type Align = 'left' | 'center' | 'right' | 'justify';

/**
 * Border width type.
 */
export type BorderWidth = 0 | 0.5 | 1.5 | 1 | 2 | 4 | 8;

/**
 * Cursor type.
 */
export type Cursor =
  | 'auto'
  | 'default'
  | 'pointer'
  | 'wait'
  | 'text'
  | 'move'
  | 'help'
  | 'not-allowed'
  | 'none'
  | 'context-menu'
  | 'progress'
  | 'cell'
  | 'crosshair'
  | 'vertical-text'
  | 'alias'
  | 'copy'
  | 'no-drop'
  | 'grab'
  | 'grabbing'
  | 'all-scroll'
  | 'col-resize'
  | 'row-resize'
  | 'n-resize'
  | 'e-resize'
  | 's-resize'
  | 'w-resize'
  | 'ne-resize'
  | 'nw-resize'
  | 'se-resize'
  | 'sw-resize'
  | 'ew-resize'
  | 'ns-resize'
  | 'nesw-resize'
  | 'nwse-resize'
  | 'zoom-in'
  | 'zoom-out';

/**
 * Outline type.
 */
export type Outline = 'none' | 'solid' | 'dashed' | 'dotted' | 'double';

export const isNextApp = (): boolean => typeof window !== 'undefined' && (window as any).next;

/**
 * Theme utils.
 */
export const utils = createUtils(({ tw, theme, runtime }) => ({
  /**
   * Set hidden utility.
   *
   * @returns The hidden utility style.
   */
  $hidden: tw('hidden'),

  /**
   * Set absolute utility.
   */
  $absolute: tw('absolute'),

  /**
   * Set relative utility.
   */
  $relative: tw('relative'),

  /**
   * Flex 1 utility.
   *
   * @param fullscreen - The fullscreen.
   * @returns The container utility style.
   */
  $f1: tw(
    'flex-1',
    Platform.select({
      web: runtime.matcher('phone')
        ? // This is to get the same behavior as mobile (no scroll).
          { ...StyleSheet.absoluteFillObject }
        : // This is to big screens on web.
          ({ width: '100vw', height: '100vh' } as any),
      native: {
        width: runtime.window.width,
        height: runtime.window.height,
      },
    })
  ),

  /**
   * Flex grow utility.
   *
   * @returns The flex grow utility style.
   */
  $fg: tw('flex-grow'),

  /**
   * Flex align items utility.
   *
   * @param align - The align.
   * @returns The flex align items utility style.
   */
  $items: (align: FlexAlign) => tw(`items-${align}`),

  /**
   * Flex justify content utility.
   *
   * @param justify - The justify.
   * @returns The flex justify content utility style.
   */
  $justify: (justify: FlexJustify) => tw(`justify-${justify}`),

  /**
   * Set align utility.
   *
   * @param align - The align.
   * @returns The align utility style.
   */
  $align: (align: Align) => tw(`text-${align}`),

  /**
   * Set flex utility.
   *
   * @param direction - The flex direction.
   * @param reverse - The flex reverse.
   * @returns The flex utility style.
   */
  $flex: (direction: FlexDirection, reverse?: boolean) =>
    tw(`flex flex-${direction}${reverse ? '-reverse' : ''}`),

  /**
   * Gap utility.
   *
   * @param size - The gap size.
   * @returns The gap utility style.
   */
  $gap: (spacing: Spacing) => tw(`gap-[${theme.spacing[spacing]}]`),

  /**
   * Set text utility.
   *
   * @param variant - The text variant.
   * @returns The text utility style.
   */
  $text: (variant: TextVariant) => tw(variant),

  /**
   * Set text transform utility.
   *
   * @param transform - The text transform.
   * @returns The text transform utility style.
   */
  $tt: (transform: TextTransform) => tw(`${transform}`),

  /**
   * Set font utility.
   *
   * @param type - The font type.
   * @returns The font utility style.
   */
  $font: (type: FontType) => tw(isNextApp() ? `font-brand font-${type}` : `font-brand-${type}`),

  /**
   * All possible margins.
   */
  $m: (spacing: Spacing) => applySpacing('m', spacing, '', tw, theme),
  $mt: (spacing: Spacing) => applySpacing('m', spacing, 't', tw, theme),
  $mr: (spacing: Spacing) => applySpacing('m', spacing, 'r', tw, theme),
  $mb: (spacing: Spacing) => applySpacing('m', spacing, 'b', tw, theme),
  $ml: (spacing: Spacing) => applySpacing('m', spacing, 'l', tw, theme),
  $mx: (spacing: Spacing) => applySpacing('m', spacing, 'x', tw, theme),
  $my: (spacing: Spacing) => applySpacing('m', spacing, 'y', tw, theme),

  /**
   * All possible paddings.
   */
  $p: (spacing: Spacing) => applySpacing('p', spacing, '', tw, theme),
  $pt: (spacing: Spacing) => applySpacing('p', spacing, 't', tw, theme),
  $pr: (spacing: Spacing) => applySpacing('p', spacing, 'r', tw, theme),
  $pb: (spacing: Spacing) => applySpacing('p', spacing, 'b', tw, theme),
  $pl: (spacing: Spacing) => applySpacing('p', spacing, 'l', tw, theme),
  $px: (spacing: Spacing) => applySpacing('p', spacing, 'x', tw, theme),
  $py: (spacing: Spacing) => applySpacing('p', spacing, 'y', tw, theme),

  /**
   * Set text color utility.
   *
   * @param colorKey - The color key.
   * @returns The color utility style.
   */
  $tc: (colorKey: Color) => applyColor(colorKey, 'text', tw, theme),

  /**
   * Set background color utility.
   *
   * @param colorKey - The color key.
   * @returns The color utility style.
   */
  $bg: (colorKey: Color) => applyColor(colorKey, 'bg', tw, theme),

  /**
   * Set width.
   */
  $w: (width: Size) => applySize(width, 'w', tw, theme),

  /**
   * Set height.
   */
  $h: (height: Size) => applySize(height, 'h', tw, theme),

  /**
   * Set min width.
   */
  $minw: (width: Size) => applyMinMax(width, 'min', 'w', tw, theme),

  /**
   * Set max width.
   */
  $maxw: (width: Size) => applyMinMax(width, 'max', 'w', tw, theme),

  /**
   * Set min height.
   */
  $minh: (height: Size) => applyMinMax(height, 'min', 'h', tw, theme),

  /**
   * Set max height.
   */
  $maxh: (height: Size) => applyMinMax(height, 'max', 'h', tw, theme),

  /**
   * Set opacity style.
   */
  $o: (opacity: number) => tw({ opacity }),

  /**
   * Set border style.
   */
  $border: (colorKey: Color, width: BorderWidth) => {
    const colorStyle = applyColor(colorKey, 'border', tw, theme);
    const widthStyle =
      width < 2 ? { borderWidth: width } : width === 1 ? 'border' : `border-${width}`;
    return tw(colorStyle, widthStyle);
  },

  /**
   * All posible borders.
   */
  $bt: (colorKey: Color, width: BorderWidth) =>
    tw(applyColor(colorKey, 'border-t', tw, theme), width === 1 ? 'border-t' : `border-${width}`),
  $br: (colorKey: Color, width: BorderWidth) =>
    tw(applyColor(colorKey, 'border-r', tw, theme), width === 1 ? 'border-r' : `border-r-${width}`),
  $bb: (colorKey: Color, width: BorderWidth) =>
    tw(applyColor(colorKey, 'border-b', tw, theme), width === 1 ? 'border-b' : `border-b-${width}`),
  $bl: (colorKey: Color, width: BorderWidth) =>
    tw(applyColor(colorKey, 'border-l', tw, theme), width === 1 ? 'border-l' : `border-l-${width}`),
  $b: (colorKey: Color, width: BorderWidth) =>
    tw(applyColor(colorKey, 'border', tw, theme), width === 1 ? 'border' : `border-${width}`),

  /**
   * All posible border radius.
   */
  $rt: (size: RoundedSize) => tw(`rounded-t-${size}`),
  $rr: (size: RoundedSize) => tw(`rounded-r-${size}`),
  $rb: (size: RoundedSize) => tw(`rounded-b-${size}`),
  $rl: (size: RoundedSize) => tw(`rounded-l-${size}`),
  $r: (size: RoundedSize) => tw(`rounded-${size}`),

  /**
   * Overflow hidden utility.
   */
  $oh: tw('overflow-hidden'),

  /**
   * Set cursor utility. Only works on web.
   *
   * @param cursor - The cursor type.
   * @returns The cursor utility style.
   */
  $cursor: (cursor: Cursor) =>
    tw(
      Platform.select({
        web: {
          cursor,
        },
      })
    ),

  /**
   * Set outline utility. Only works on web.
   *
   * @param outline - The outline type.
   * @returns The outline utility style.
   */
  $outline: (outline: Outline) =>
    tw(
      Platform.select({
        web: {
          outlineStyle: outline,
        },
      })
    ),

  /**
   * Set text decoration utility.
   *
   * @param decoration - The text decoration.
   * @returns The text decoration utility style.
   */
  $td: (decoration: TextDecoration) => tw(decoration),

  /**
   * Set flex wrap utility.
   * This solves the issue with flex wrap on flex-box.
   * Ref: https://www.bam.tech/article/why-my-text-is-going-off-screen
   *
   * @returns The flex wrap utility style.
   */
  $twrap: tw({
    flex: 1,
    flexWrap: 'wrap',
  }),

  /**
   * Applies the given size to width and height.
   */
  $size: (size: Size) => tw(applySize(size, 'w', tw, theme), applySize(size, 'h', tw, theme)),

  /**
   * Avoid text selection.
   */
  $noSelect: tw(
    Platform.select({
      web: {
        '-ms-user-select': 'none',
        'user-select': 'none',
      },
    })
  ),
}));

/**
 * Apply size utility.
 *
 * @param width - The width size.
 * @param type - The size type (width or height).
 * @param tw - The tailwind instance.
 * @param theme - The theme definition.
 *
 * @returns The size utility style.
 *
 * @internal
 */
const applySize = (width: Size, type: 'w' | 'h', tw: ThemeTw, theme: ThemeDefinition) =>
  tw(
    ['auto', 'full', 'screen'].includes(width)
      ? width === 'screen'
        ? {
            width: Platform.OS === 'web' ? `100v${type}` : '100%',
          }
        : `${type}-${width}`
      : `${type}-[${theme.sizes[width]}]`
  );

/**
 * Apply color utility.
 *
 * @param colorKey - The color key.
 * @param type - The color type.
 * @param tw - The tailwind instance.
 * @param theme - The theme definition.
 * @returns The color utility style.
 *
 * @internal
 */
const applyColor = (
  colorKey: Color,
  type: 'bg' | 'text' | 'border' | `border-${string}`,
  tw: ThemeTw,
  theme: ThemeDefinition
) => {
  if (['transparent', 'inherit', 'current'].includes(colorKey)) {
    return tw(`${type}-${colorKey}`);
  }

  const color = theme.colors[colorKey];
  const hasDarkMode = typeof color === 'object' && 'light' in color && 'dark' in color;

  return hasDarkMode
    ? tw(`${type}-[${color.light}] dark:${type}-[${color.dark}]`)
    : tw(`${type}-[${color}]`);
};

/**
 * Apply min/max width utility.
 *
 * @param width - The width size.
 * @param m - The min/max type.
 * @param tw - The tailwind instance.
 * @param theme - The theme definition.
 * @returns The min/max width utility style.
 *
 * @internal
 */
const applyMinMax = (
  width: Size,
  m: 'min' | 'max',
  type: 'w' | 'h',
  tw: ThemeTw,
  theme: ThemeDefinition
) =>
  tw(
    ['auto', 'full'].includes(width)
      ? `${m}-${type}-${width}`
      : `${m}-${type}-[${theme.sizes[width]}]`
  );

/**
 * Apply spacing utility.
 *
 * @param type - The spacing type.
 * @param spacing - The spacing size.
 * @param position - The spacing position.
 * @param tw - The tailwind instance.
 * @param theme - The theme definition.
 * @returns The spacing utility style.
 *
 * @internal
 */
const applySpacing = (
  type: 'p' | 'm',
  spacing: Spacing,
  position: SpacingPosition,
  tw: ThemeTw,
  theme: ThemeDefinition
) => tw(`${type}${position ?? ''}-${spacing === 'auto' ? 'auto' : theme.spacing[spacing]}`);
