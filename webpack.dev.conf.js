const fs = require('fs')
const path = require('path')
const webpack = require('webpack')

const entry = fs.readdirSync(__dirname).reduce((entries, dir) => {
    const fullDir = path.join(__dirname, dir)
    const entry = path.join(fullDir, 'app.js')
    if (fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)) {
        entries[dir] = ['webpack-hot-middleware/client', entry]
    }
    return entries
}, {})
entry.app = ['babel-polyfill', 'whatwg-fetch'].concat(entry.app)
module.exports = {

    devtool: 'inline-source-map',

    entry: entry,
    output: {
        path: path.join(__dirname, '__build__'),
        filename: '[name].js',
        chunkFilename: '[name].chunk.js',
        publicPath: '/__build__/'
    },
    resolve: {
        alias: {
            vuex: path.join(__dirname, './asset/js/vuex.js'),
            vue: 'vue/dist/vue.js'
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
        new webpack.optimize.CommonsChunkPlugin({
            name: 'shared',
            filename: 'shared.js'
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]

}