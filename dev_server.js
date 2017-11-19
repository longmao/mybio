const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const WebpackConfig = require('./webpack.dev.conf')
const history = require('connect-history-api-fallback');
const path = require('path')
const compress = require('compression');


const app = express()
const compiler = webpack(WebpackConfig)

app.use(webpackDevMiddleware(compiler, {
    publicPath: '/__build__/',
    stats: {
        colors: true,
        chunks: false
    }
}))
app.use(history());
app.use(compress());


app.use(webpackHotMiddleware(compiler))

app.use(express.static(__dirname))

const port = process.env.PORT || 8981
app.get('/:id.html', function(req, res) {
    res.sendFile(path.join(__dirname, './index.html'))
});


var listenFunc = function(options) {
    var port = options && options.server_port || process.env.PORT || 8980
    console.log(port)
    var server = app.listen(port, function() {
        var host = "localhost";
        var port = server.address().port;
        console.log('hi, mybiogate listening at http://%s:%s ', host, port);
    }).on('error', function(err) {
        if (err && err.code == "EADDRINUSE") {
            port = parseInt(port) + 1
            listenFunc({
                server_port: port
            })
        }
    });

}
listenFunc()

module.exports = listenFunc
