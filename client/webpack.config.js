const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = (env, argv) => {
  // Determine if the current build mode is production
  const isProduction = argv.mode === 'production';

  return {
    // Set the mode based on the build environment
    mode: isProduction ? 'production' : 'development',

    // Define the entry points for the application
    entry: {
      main: path.resolve(__dirname, 'src/js/index.js'), // Main entry point
      install: path.resolve(__dirname, 'src/js/install.js') // Install entry point
    },

    // Specify the output configuration
    output: {
      filename: '[name].bundle.js', // Use the entry name for the output file
      path: path.resolve(__dirname, 'dist'), // Output directory
    },

    // Define the plugins used in the build process
    plugins: [
      // Plugin to generate the HTML file and inject bundles
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'index.html'), // Path to the HTML template
        title: 'J.A.T.E' // Title of the HTML document
      }),
      // Plugin to inject the service worker (only in production)
      isProduction && new InjectManifest({
        swSrc: path.resolve(__dirname, 'src-sw.js'), // Source service worker file
        swDest: 'service-worker.js', // Output service worker file
      }),
      // Plugin to generate the PWA manifest
      new WebpackPwaManifest({
        fingerprints: false, // Do not add fingerprints to the filenames
        inject: true, // Inject the manifest into the HTML
        name: 'Just Another Text Editor', // Full name of the app
        short_name: 'JATE', // Short name of the app
        description: 'A simple text editor', // Description of the app
        background_color: '#272822', // Background color
        theme_color: '#31a9e1', // Theme color
        start_url: '/', // Start URL
        publicPath: '/', // Public path
        icons: [
          {
            src: path.resolve(__dirname, 'src/images/logo.png'), // Path to the icon image
            sizes: [96, 128, 192, 256, 384, 512], // Different icon sizes
            destination: path.join('assets', 'icons'), // Destination directory for icons
          },
        ],
      }),
    ].filter(Boolean), // Filter out any false values (such as the conditional InjectManifest plugin)

    // Define the module rules for handling different file types
    module: {
      rules: [
        {
          test: /\.css$/i, // Match CSS files
          use: ['style-loader', 'css-loader'], // Use style-loader and css-loader for CSS files
        },
        {
          test: /\.m?js$/, // Match JavaScript files
          exclude: /(node_modules|bower_components)/, // Exclude node_modules and bower_components directories
          use: {
            loader: 'babel-loader', // Use babel-loader for transpiling JavaScript files
            options: {
              presets: ['@babel/preset-env'], // Use the preset-env preset
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/plugin-transform-runtime'], // Use additional Babel plugins
            },
          },
        },
      ],
    },

    // Configure the development server
    devServer: {
      contentBase: path.resolve(__dirname, 'dist'), // Serve content from the dist directory
      compress: true, // Enable gzip compression
      port: 8080, // Port number for the dev server
      open: true, // Open the browser after server starts
    },
  };
};
