const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserUglifyPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isEnvProduction = process.env.NODE_ENV === 'production';
const isEnvDevelopment = process.env.NODE_ENV === 'development';

const imageLoaders = [
    {
        loader: 'file-loader',
        options: {
            hash: 'sha512',
            digest: 'hex',
            name: '[contenthash].[ext]',
        },
    },
];

if (isEnvProduction) {
    imageLoaders.push({
        loader: 'image-webpack-loader',
        options: {
            mozjpeg: {
                quality: 65,
            },
            pngquant: {
                speed: 4,
            },
        },
    });
}

module.exports = () => {
    return {
        cache: true,
        mode: isEnvProduction ? 'production' : 'development',
        entry: {
            app: './src/index.tsx',
        },
        output: {
            filename: '[name].bundle.[chunkhash].js',
            path: path.resolve(__dirname, './build'),
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js'],
            alias: {
                rest: path.resolve('src/app/rest/'),
                src: path.resolve('src/'),
                scss: path.resolve('src/scss/'),
                openapi: path.resolve('generated-sources/openapi/'),
                types: path.resolve('src/types/'),
            },
        },
        plugins: [
            new HtmlWebpackPlugin({
                hash: true,
                template: './public/index.html',
                favicon: './public/favicon-32x32.png',
            }),
            ...(isEnvDevelopment ? [] : [new MiniCssExtractPlugin()]),
        ],
        module: {
            rules: [
                {
                    test: /\.ts|js(x?)$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/,
                    include: path.resolve(),
                },
                {
                    test: /.*\.(gif|png|jpe?g|ico)$/i,
                    use: imageLoaders,
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        isEnvDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                postcssOptions: {
                                    plugins: ['autoprefixer'],
                                },
                            },
                        },
                        'sass-loader',
                    ],
                },
                {
                    test: /\.css$/, use: [
                        {loader: isEnvDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader},
                        {loader: 'css-loader'},
                    ],
                },
                {
                    test: /\.(eot|svg|ttf|woff|woff2|cur|gif|jpe*g)/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                esModule: false,
                            },
                        },
                    ],

                },
            ],
        },
        devServer: {
            port: 3003,
            historyApiFallback: {
                index: '/index.html',
            },
            hot: true,
            proxy: {
                'csv-api/': {
                    target: 'http://localhost:3000',
                },
            },
        },
        optimization: {
            minimize: isEnvProduction,
            minimizer: isEnvProduction ? [
                new TerserUglifyPlugin({
                    extractComments: true,
                    terserOptions: {
                        compress: {
                            warnings: false,
                        },
                    },
                    parallel: true,
                }),
            ] : [],
        },
    };
};
