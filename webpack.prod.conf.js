const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlPluginRemove = require('html-webpack-plugin-remove')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const ArchivePlugin = require('webpack-archive-plugin');
const SftpWebpackPlugin = require('sftp-webpack-plugin');


const output = "output/mybiogate"

const config = {
    build: {
        index: path.resolve(__dirname, output + '/index.html'),
        assetsDirectory: output,
        productionSourceMap: true,
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report
    }
}



module.exports = {


    entry: {
        app: './app/app.js'
    },
    output: {
        path: path.join(__dirname, output),
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].chunk.js',
        publicPath: '/'
    },
    resolve: {
        alias: {
            vuex: path.join(__dirname, './asset/js/vuex.js')
        }
    },
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
            { test: /\.vue$/, loader: 'vue-loader' },
            { test: /\.css$/, loader: 'css-loader'},
            { test: /\.png$/, exclude: /node_modules/, loader: "url-loader?mimetype=image/png" },
            { test: /\.gif$/, exclude: /node_modules/, loader: "url-loader?mimetype=image/gif" }
        ]
    },

    plugins: [
        // http://vuejs.github.io/vue-loader/en/workflow/production.html
        new webpack.DefinePlugin({
            'process.env': { NODE_ENV: '"production"' }
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                unused: true,
                drop_console: true,
                dead_code: true,
                warnings: false,
                screw_ie8: true
            },
            sourceMap: false
        }),
        // extract css into its own file
        /*new ExtractTextPlugin({
          filename: utils.assetsPath('css/[name].[contenthash].css')
        }),*/
        // Compress extracted CSS. We are using this plugin so that possible
        // duplicated CSS from different components can be deduped.
        new OptimizeCSSPlugin({
            cssProcessorOptions: {
                safe: true,
                discardComments: { removeAll: true }
            }
        }),
        // generate dist index.html with correct asset hash for caching.
        // you can customize output by editing /index.html
        // see https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: 'index.html',
            inject: true,
            buildtime: new Date().toLocaleString(),
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
            },
            // necessary to consistently work with multiple chunks via CommonsChunkPlugin
            chunksSortMode: 'dependency'
        }),
        new HtmlPluginRemove(/<script.src=\/__build__\/shared.js.*?<\/script>/),
        new HtmlPluginRemove(/<script.src=\/__build__\/app.js.*?<\/script>/),

        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function(module) {
                // this assumes your vendor imports exist in the node_modules directory
                return module.context && (module.context.indexOf('node_modules') !== -1);
            }
        }),
        // copy custom static assets
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, './asset'),
            to: 'asset',
            ignore: ['.*']
        }])
    ]

}