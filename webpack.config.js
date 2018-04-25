module.exports = env => {
    const isProduction = env === 'production'
    return {
        entry: './app/assets/frontend/main.jsx',
        devtool: isProduction ? 'source-map' : 'inline-source-map',
        output: {
            path: __dirname + 'dist',
            filename: 'index.js'
        },
        resolve: {
            extensions: ['', '.js', '.jsx']
        },
        module: {
            loaders: [
                {
                    test: /\.jsx?$/,
                    loader: 'babel',
                    exclude: /node_modules/,
                    query: {
                        cacheDirectory: true,
                        presets: ['react', 'es2015']
                    }
                }
            ]
        },
        externals: {
            react: {
                root: 'React',
                commonjs2: 'react',
                commonjs: 'react',
                amd: 'react'
            }
        }
    }
}