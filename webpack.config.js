var ExtractTextPlugin = require('extract-text-webpack-plugin');

function getDevTool() {
    if (process.env.NODE_ENV !== 'production') {
        return 'source-map'; //enables source map
    }
    return false;
}

const extractSass = new ExtractTextPlugin({
    filename: "./app/stylesheets/[name].css",
    disable: process.env.NODE_ENV === "development"
});

module.exports = {
    entry: {
        noti: './src/noti.jsx',
    },
    output: {
        filename: './app/javascripts/bundle.js',
    },
    devtool: getDevTool(),
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: extractSass.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "sass-loader"
                    }],
                    // use style-loader in development
                    fallback: "style-loader"
                }),
            },
            {
                test: [/\.js$/, /\.jsx$/],
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015']
                }
            }
        ]
    },
    plugins: [
        extractSass
    ],
    resolve: {
        extensions: ['.js', '.jsx', '*', '.scss']
    }
};
