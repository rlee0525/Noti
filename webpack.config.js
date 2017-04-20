var ExtractTextPlugin = require('extract-text-webpack-plugin');

function getDevTool() {
    if (process.env.NODE_ENV !== 'production') {
        return 'source-map'; //enables source map
    }

    return false;
}

module.exports = {
    entry: {
        noti: './src/noti.jsx',
    },
    output: {
        filename: './app/javascripts/bundle.js',
    },
    devtool: 'source-map',
    module: {
        loaders: [{
                test: [/\.js$/, /\.jsx$/],
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015']
                }
            },
            {
                test: /\.scss$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: './app/stylesheets/bundle.css'
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx', '*', '.scss']
    }
};