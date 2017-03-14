module.exports = {
    entry: [
        'script!jquery/dist/jquery.min.js',
        'script!jquery.cookie/jquery.cookie.js',
        'script!jquery-ui-dist/jquery-ui.js',
        './app/app.jsx'
    ],
    output: {
        path: __dirname,
        filename: './public/bundle.js'
    },
    resolve: {
        root: __dirname,
        modulesDirectories: ['app/api', 'app/components', 'app/redux', 'node_modules'],
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-2']
                },
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/
            },
            { test: /\.(woff|woff2)$/,  loader: "url-loader?limit=10000&mimetype=application/font-woff" },
            { test: /\.ttf$/,    loader: "file-loader" },
            { test: /\.eot$/,    loader: "file-loader" },
            { test: /\.svg$/,    loader: "file-loader" }
        ]
    },
    devtool: 'eval-source-map'
};
