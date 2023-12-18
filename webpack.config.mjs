import { fileURLToPath} from "url";
import TerserPlugin from "terser-webpack-plugin";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
    entry : {
        index : "./lib/frontend/index/main.js"
    },

    output : {
        filename : "[name].min.js",
        path : path.resolve(__dirname,"dist")
    },

    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                },
            },
        }],
    },

    optimization: {
        minimize : true,
        minimizer : [ new TerserPlugin() ]
    },
}
