/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'res.cloudinary.com'],
    unoptimized: true
  },
  // Use SWC compiler
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  poweredByHeader: false,
  webpack: (config, { isServer, dev }) => {
    config.module.rules.push({
      test: /\.(png|jpg|gif|svg)$/i,
      type: 'asset/resource'
    })

    // Add bundle analyzer in development with dynamic port
    if (dev && !isServer) {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          analyzerPort: 'auto', // This will automatically find an available port
          openAnalyzer: false,
        })
      )
    }

    // Log bundle sizes
    config.plugins.push({
      apply: (compiler) => {
        compiler.hooks.done.tap('LogBundleSizes', (stats) => {
          const { assets } = stats.toJson();
          console.log('\nBundle sizes:');
          assets.forEach(asset => {
            console.log(`${asset.name}: ${(asset.size / 1024).toFixed(2)}kb`);
          });
        });
      },
    });

    return config;
  },
}

module.exports = nextConfig
