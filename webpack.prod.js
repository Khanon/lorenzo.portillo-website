const { merge } = require('webpack-merge');
const base = require('./webpack.base.js');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(base, {
    mode: 'production',
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    format: {
                        comments: false,
                    },
                },
                extractComments: false,
                parallel: true,
            }),
        ],
    },
    performance: {
        hints: false,
    },
    devtool: false,
});
