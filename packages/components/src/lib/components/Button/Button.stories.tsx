/**
 * Copyright (c) Dynamic Quants and affiliates.
 *
 * This source code is part of Plexo library and is licensed under the MIT
 * license found in the LICENSE file in the root directory of this source tree.
 */
import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import t from '@storybook/test';
import { within } from '@storybook/testing-library';

import { Button } from './Button';

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'Button',
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Primary',
  },
};

export const Welcome: Story = {
  args: {
    children: 'Welcome to Button',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText('Welcome to Button')).toBeTruthy();
  },
};
