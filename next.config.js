/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig

const nodeExternals = require('webpack-node-externals');

module.exports = {
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.resolve.fallback = {
          fs: false,
          net: false,
          tls: false,
          dns: false,
        };
      }
  
      return config;
    },
  };