import type { StorybookConfig } from '@storybook/nextjs';
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin';

const config: StorybookConfig = {
  stories: ['../src/lib/**/*.@(mdx|stories.@(js|jsx|ts|tsx))'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    // '@nx/react/plugins/storybook',
    {
      name: '@storybook/addon-react-native-web',
      options: {
        modulesToTranspile: ['@expo/html-elements', 'solito'],
      },
    },
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  core: {
    builder: 'webpack5',
  },
  webpackFinal: async (config) => {
    config.plugins?.push(new NodePolyfillPlugin());
    return config;
  },
};

export default config;
