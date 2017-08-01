var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');

module.exports = {
    entry: './src/index.js',
    devtool: 'source-map',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist/'),
        publicPath: '/'
    },
    module: {
        loaders: [
            {
                test: /.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react'],
                    plugins: ['transform-object-rest-spread']
                }
            }
        ]
    },
     plugins: [
        new CopyWebpackPlugin([
            // {output}/file.txt
            { from: './src/index.html' },
            { from: './src/tachyons.css' }
        ])
     ]
}
