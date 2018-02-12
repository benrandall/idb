const webpack = require('webpack');

const config = {
    entry:  {
        items: __dirname + '/js/items.jsx',
        //index: __dirname + '/js/index.jsx'
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css']
    },
    module: {
        rules: [
            {
                test: /\.jsx?/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.scss/,
                use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "sass-loader" // compiles Sass to CSS
            }]
            }
        ]
    }
};

module.exports = config;