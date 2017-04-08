module.exports = {
    entry: './src/index.jsx',

    output: {
        filename: 'bundle.js',
        path: './public',
    },

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: ['babel-loader']
            }
        ]
    },

    devtool: 'inline-source-map',

    devServer: {
        historyApiFallback: true
    },

    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};