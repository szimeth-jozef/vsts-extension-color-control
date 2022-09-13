const path = require("path");
const fs = require("fs");
// const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: "development",
    target: "web",
    entry: {
        app: "./scripts/app.ts"
    },
    output: {
        filename: "scripts/[name].js",
        // publicPath: "https://localhost:9091/dist",
        libraryTarget: "amd"
    },

    devServer: {
        https: true,
        port: 9090,
        open: true
    },
    externals: [
        /^VSS\/.*/, /^TFS\/.*/, /^q$/
    ],
    devtool: 'inline-source-map',
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        alias: {
            "vss-web-extension-sdk": path.resolve(__dirname, "node_modules/vss-web-extension-sdk/lib/VSS.SDK")
        },
        modules: [path.resolve("."), "node_modules"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader"
            },
            // {
            //     test: /\.scss$/,
            //     use: [
            //         "style-loader",
            //         "css-loader",
            //         "azure-devops-ui/buildScripts/css-variables-loader",
            //         "sass-loader"
            //     ]
            // },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            // {
            //     test: /\.woff$/,
            //     use: [
            //       {
            //         loader: "base64-inline-loader"
            //       }
            //     ]
            //   },
            {
                test: /\.(png|svg|jpg|gif|html)$/,
                use: "file-loader"
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: "./node_modules/vss-web-extension-sdk/lib/VSS.SDK.min.js", to: "./scripts/VSS.SDK.min.js" },
                { from: "**/*.css", to: "./css", context: "styles" },
                { from: "*.html", to: "./", context: "." },
                { from: "**/*", to: "./img", context: "img" },
                { from: "**/*", to: "./images", context: "images" },
                { from: "./azure-devops-extension.json", to: "azure-devops-extension.json" },
                { from: "./readme.md", to: "readme.md" }
            ]
        })
    ]
};