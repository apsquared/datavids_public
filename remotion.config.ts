/**
 * Note: When using the Node.JS APIs, the config file
 * doesn't apply. Instead, pass options directly to the APIs.
 *
 * All configuration options: https://remotion.dev/docs/config
 */

import {Config} from '@remotion/cli/config';
import {webpackOverride} from './remotion-video/webpack-override';
import { enableTailwind } from "@remotion/tailwind";


Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);

Config.overrideWebpackConfig(webpackOverride);

Config.overrideWebpackConfig((currentConfiguration) => {
    return enableTailwind(currentConfiguration);
  });
