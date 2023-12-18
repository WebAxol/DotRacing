import { fileURLToPath} from "url";
import TerserPlugin from "terser-webpack-plugin";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
    entry : {
        index : "./lib/frontend/index/main.js"
    },

    output : {
        filename : "[name].bundle.js",
        path : path.resolve(__dirname,"dist")
    },

    resolve : {
        alias : {
            "/three/examples/jsm/controls/OrbitControls.js" : path.resolve(__dirname, "node_modules/three/examples/jsm/controls/OrbitControls.js"),
            "/three/build/three.module.js" : path.resolve(__dirname, "node_modules/three/build/three.module.js")
        }
    },

    optimization: {
        minimize : true,
        minimizer : [ new TerserPlugin() ]
    }

}
