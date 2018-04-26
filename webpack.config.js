const path = require("path");
// const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports =
    {
        entry: ["babel-polyfill", path.join(__dirname, "src/lib")],
        output: {
            path: path.join(__dirname, 'dist'),
            filename: 'index.js'
        },
        resolve: {
            extensions: ['.js', '.jsx']
        },
        module: {
            loaders: [
                {
                    test: /\.(js|jsx)$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/,
                    query: {
                        cacheDirectory: true,
                        presets: ['react', 'es2015']
                    }
                },
                {
                    test: /\.css$/,
                    use: ["style-loader", "css-loader"]
                }
            ]
        }
        // },
        // externals: {
        //     react: {
        //         root: 'React',
        //         commonjs2:
        //             'react',
        //         commonjs:
        //             'react',
        //         amd:
        //             'react'
        //     }
        // }
    };
// = env => {
//     const isProduction = env === 'production'
//     return {