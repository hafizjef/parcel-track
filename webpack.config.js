var debug = process.env.NODE_ENV !== "production";
var webpack = require("webpack");
var path = require("path");

module.exports = {
    context: path.join(__dirname, "src"),
    devtool: debug ? "inline-sourcemap" : "source-map",
    entry: ["babel-polyfill", "./js/main.js"],
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["es2015", "react"],
                        plugins: [
                            "transform-decorators-legacy",
                            "transform-class-properties",
                            "transform-async-to-generator",
                            "transform-es2015-shorthand-properties"
                        ]
                    }
                }
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.(sass|scss)$/,
                loader: "style-loader!css-loader!sass-loader"
            },
        ]
    },
    output: {
        path: path.join(__dirname, "src"),
        filename: "main.min.js"
    },
    resolve: {
      alias: {
          "react": "preact-compat",
          "react-dom": "preact-compat"
      }
    },
    plugins: debug ? [] : [
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.DefinePlugin({"process.env": {"NODE_ENV": JSON.stringify("production")}}),
        new webpack.optimize.UglifyJsPlugin({
            comments: false,
            compress: {
                unused: true,
                dead_code: true, // big one--strip code that will never execute
                warnings: false, // good for prod apps so users can't peek behind curtain
                drop_debugger: true,
                conditionals: true,
                evaluate: true,
                drop_console: true, // strips console statements
                sequences: true,
                booleans: true,
                screw_ie8: true,
                //source_map: false
            }
        }),
    ],
};