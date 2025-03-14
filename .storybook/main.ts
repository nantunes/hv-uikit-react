import { StorybookConfig } from "@storybook/react-vite";
import tsconfigPaths from "vite-tsconfig-paths";
import remarkGfm from "remark-gfm";

export default {
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  stories: [
    "../docs/**/*.stories.@(tsx|mdx)",
    "../packages/**/src/**/*.stories.@(ts|tsx|mdx)",
  ],
  core: {
    disableTelemetry: true,
  },
  addons: [
    // "@storybook/addon-actions",
    "@storybook/addon-controls",
    "@storybook/addon-toolbars",
    {
      name: "@storybook/addon-docs",
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
    "@storybook/addon-a11y",
    "@storybook/addon-links",
    __dirname + "/addons/version-selector",
    __dirname + "/addons/theme-selector",
    __dirname + "/addons/mode-selector",
  ],
  features: {
    storyStoreV7: true,
    buildStoriesJson: true,
  },
  staticDirs: [
    "./assets",
    {
      from: "../packages/viz/src/components/LineChart/steelwheels.arrow",
      to: "assets/steelwheels.arrow",
    },
    {
      from: "../packages/icons/sprites/icons.svg",
      to: "assets/icons.svg",
    },
    {
      from: "../packages/icons/sprites/pictograms.svg",
      to: "assets/pictograms.svg",
    },
  ],
  async viteFinal(config, { configType }) {
    config.plugins?.push(tsconfigPaths({ loose: true }));

    config.optimizeDeps = {
      ...config.optimizeDeps,
      include: [
        "@mdx-js/react",
        "@storybook/theming",
        "@storybook/addon-docs",
        "@storybook/addon-links/react",
        "@storybook/addon-links",
      ],
    };

    if (configType === "PRODUCTION") {
      config.base = "./";
    }

    return config;
  },
  typescript: {
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      tsconfigPath: "../tsconfig.json",
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
    },
  },
  docs: {
    autodocs: true,
  },
} as StorybookConfig;
