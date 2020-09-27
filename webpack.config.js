var path = require('path');
var autoprefixer = require('autoprefixer');

module.exports = {
    entry: {
        app: './app/index.tsx'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: require.resolve('ts-loader'),
                include: [
                    path.resolve(__dirname, 'app')
                ],
                exclude: /node_modules/
            },
            {
                test: /\.css$|\.less$/,
                use: [
                    require.resolve('style-loader'),
                    require.resolve('css-loader'),
                    {
                        loader: require.resolve('postcss-loader'),
                        options: {
                            postcssOptions: {
                                plugins: () => [
                                    autoprefixer({
                                        browsers: [
                                            'last 2 versions',
                                            'not ie < 9', // React doesn't support IE8 anyway
                                        ]
                                    }),
                                ],
                            }
                        },
                    },
                    {
                        loader: require.resolve('less-loader')
                    },
                ],
            },
            {
                exclude: [
                    /\.html$/,
                    /\.(js|jsx|tsx)$/,
                    /\.css$/,
                    /\.less$/,
                    /\.json$/,
                    /\.bmp$/,
                    /\.gif$/,
                    /\.jpe?g$/,
                    /\.png$/,
                ],
                loader: require.resolve('file-loader'),
                options: {
                    name: 'static/media/[name].[ext]',
                },
            },
            // "url" loader works like "file" loader except that it embeds assets
            // smaller than specified limit in bytes as data URLs to avoid requests.
            // A missing `test` is equivalent to a match.
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                loader: require.resolve('url-loader'),
                options: {
                    limit: 10000,
                    name: 'static/media/[name].[ext]',
                },
            },
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
        modules: ['.', 'node_modules']
    },
    devServer: {
        port: 8080,
        inline: true,
        overlay: true,
    },
    output: {
        filename: '[name].bundle.js',
        publicPath: 'http://localhost:8080',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: 'inline-source-map'
};