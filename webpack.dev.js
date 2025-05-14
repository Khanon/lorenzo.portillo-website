const { merge } = require('webpack-merge');
const base = require('./webpack.base.js');

module.exports = merge(base, {
    devServer: {
        host: 'localhost',
        port: 8080, //port that we're using for local host (localhost:8080)
        hot: true,
        open: true,
        static: {
            publicPath: '/',
        },
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                loader: 'string-replace-loader',
                options: {
                    search: '/* babylonjs-debugLayer */',
                    replace: `import '@babylonjs/core/Debug/debugLayer';`,
                },
            },
            {
                test: /\.(ts|js)x?$/,
                loader: 'string-replace-loader',
                options: {
                    search: '/* babylonjs-inspector */',
                    replace: `import '@babylonjs/inspector';`,
                },
            },
        ],
    },
    mode: 'development',
    devtool: 'eval-source-map',
});
