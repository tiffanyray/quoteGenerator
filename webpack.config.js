const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'docs/'),
        filename: 'bundle.js'
    },
    devtool: "sourcemap",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: [{
                    loader: 'babel-loader'
                }]
            },
            {
                test: /\.sass$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.jsx', '.js', '.json']
    },
    devServer: {
        contentBase: path.join(__dirname, 'docs'),
    },
};