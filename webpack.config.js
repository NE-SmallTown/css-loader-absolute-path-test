const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const extractLESS = new ExtractTextPlugin({
    filename: '[name].css'
});

module.exports = {
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js',
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: extractLESS.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        query: {
                            importLoaders: 1,
                            // root: process.cwd(),
                        }
                    },
                        { loader: 'less-loader' }
                    ]
                })
            },
            {
                test: /\.css$/,
                use: 'css-loader'
            },
            {
                test: /\.(png|jpg|gif|svg|ttf|woff|eot)$/,
                loader: 'url-loader',
                exclude: file => console.log(11111, file),
                options: {
                    limit: 100, // byte
                    fallback: 'file-loader',
                }
            }
        ]
    },
    plugins: [
        extractLESS,
        new HtmlWebpackPlugin()
    ],
    resolve: {
        extensions: ['*', '.js', '.json', '.css']
    },
    devServer: {
        historyApiFallback: true
    }
};
