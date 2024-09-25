import type { Preview } from '@storybook/react';
import React from 'react';

import { DefaultThemeProvider } from '@plexo/core';

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
    layout: 'centered',
    backgrounds: {
      values: [
        { name: 'Dark', value: '#090909' },
        { name: 'Light', value: '#F7F9F2' },
      ],
      default: 'Dark',
    },
  },
  decorators: [
    (Story) => (
      <DefaultThemeProvider>
        <Story />
      </DefaultThemeProvider>
    ),
  ],
};

export default preview;
