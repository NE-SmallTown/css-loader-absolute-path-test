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
                            url: true,
                            importLoaders: 1,
                            // below 2 ways can solve the absolute path problem
                            // root: __dirname,
                            alias: { // this workarount need css-loder to fix a bug
                                '@': __dirname
                            }
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
