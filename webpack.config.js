var path = require('path');

module.exports = {
    entry: {
        app: './app/index.ts'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                include: [
                    path.resolve(__dirname, 'app')
                ],
                exclude: /node_modules/
            }
        ]        
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: 'inline-source-map'
};