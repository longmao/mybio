process.env.NODE_ENV = 'production'

var ora = require('ora')
var del = require('del');
var copy = require('copy');

var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
var webpackConfig = require('./webpack.prod.conf')

var spinner = ora('building for production...')
spinner.start()



del(['./output', './mybiogate.tar.gz'], { force: true }).then(paths => {
    console.log('Deleted files and folders:\n', paths.join('\n'));
    webpack(webpackConfig, function(err, stats) {

        if (err) {
            console.log(err)
        }
        process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }) + '\n\n')

        console.log(chalk.cyan('  Build complete.\n'))
        console.log(chalk.yellow(
            '  Tip: built files are meant to be served over an HTTP server.\n' +
            '  Opening index.html over file:// won\'t work.\n'
        ))
        spinner.stop()


    })
});