// What's new in webpack 2
// https://gist.github.com/sokra/27b24881210b56bbaff7
// https://webpack.js.org/
let path = require("path"),
    webpack = require('webpack'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    chalk = require('chalk'),
    autoprefixer = require('autoprefixer'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    DEV_MODE = process.env.NODE_ENV === 'development';
var colorFun;
if (DEV_MODE) {
    colorFun = chalk.black.bgYellow;
} else {
    colorFun = chalk.bgCyan.white;
}
console.log(colorFun('DEV_MODE = ' + DEV_MODE));
console.log(colorFun('process.env.NODE_ENV = ' + process.env.NODE_ENV));

var config = {
    context: path.join(__dirname, '/src'),
    entry: {
        master: ['./js/master.js'],
        ie:['./js/ie.js'],
        index: ['./js/index.js'], // 這裡要放 Array , 因為在 gulp 時會動態加入 hotreload 的 js
        brand: ['./js/brand.js'],
        
        shoplist:['./js/shoplist.js'],
        business:['./js/business.js'],
        contact:['./js/contact.js'],

        news: ['./js/news.js'],
        newsdetail:['./js/newsdetail.js'],

        buyers:['./js/buyers.js'],
        catalog:['./js/catalog.js'],
        customization:['./js/customization.js'],
        searchlist:['./js/searchlist.js'],

        design:['./js/design.js'],
        material:['./js/material.js'],
        production:['./js/production.js'],
        marketing:['./js/marketing.js'],

        privacy:['./js/privacy.js'],
        sitemap:['./js/sitemap.js'],

        about:['./js/about.js'],
        classic:['./js/classic.js'],
        history:['./js/history.js'],
        hiring:['./js/hiring.js'],
    },
    // devtool: '#eval-source-map',
    // watch: DEV_MODE,
    watchOptions: {
        ignored: [/node_modules/, /dist/]
    },
    devtool: DEV_MODE ? "source-map" : "",
    output: {
        filename: "asset/js/[name].js",
        path: path.resolve(__dirname, './dist'),
        publicPath: "",
    },
    resolveLoader: {
        moduleExtensions: ["-loader"], // 2.x用 xxx-loader 可以寫 xxx 即可
    },
    resolve: {
        alias: {
            // 'vue$': 'vue/dist/vue.common.js'
        },
        modules: [
            path.resolve('src/html'),
            path.resolve('src/img'),
            path.resolve('src/css'),
            path.resolve('src/asset'),
            path.resolve('src/js'),
            path.resolve("node_modules"),
        ],
        extensions: [".js", ".scss", ".stylus"]
    },
    // https://webpack.js.org/configuration/dev-server/#devserver
    devServer: {
        historyApiFallback: true,
        noInfo: true,
        hot: true,
        inline: true,
        contentBase: "./",
        // https://webpack.js.org/configuration/stats/
        stats: {
            colors: true,
            hash: false, // add the hash of the compilation
            version: false, // add webpack version information
            timings: true, // add timing information
            assets: true, // add assets information
            chunks: false, // add chunk information
            chunkModules: false, // add built modules information to chunk information
            modules: false, // add built modules information
            cached: false, // add also information about cached (not built) modules
            reasons: false, // add information about the reasons why modules are included
            source: false, // add the source code of modules
            error: true,
            errorDetails: true, // add details to errors (like resolving log)
            chunkOrigins: false // add the origins of chunks and chunk merging info
        }
    }
};

// var htmlExtractCHText = new ExtractTextPlugin("CH/[name].html");
// var htmlExtractENText = new ExtractTextPlugin("EN/[name].html");
var cssExtractText = new ExtractTextPlugin("asset/css/[name].css");

config.module = {
    // 1.x:loaders ,  2.x:rules
    // https://webpack.js.org/configuration/module/#module-rules
    rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            include: [
                path.resolve('src/js'),
                path.resolve('src/lib')
            ],
            exclude: /node_modules/
        },
        {
            test: /\.scss/,
            loader: cssExtractText.extract({
                // fallbackLoader:"style-loader",
                loader: [
                    "css?-minimize&sourceMap=true",
                    "postcss", // 會吃 /postcss.config.js
                    "sass-loader?sourceMap"
                ],
                publicPath: '/'
            }),
            include: path.resolve('src/css'),
            exclude: /node_modules/
        },
        {
            test: /\.(png|jpg|gif|svg|ico)$/,
            loader: 'url-loader',
            include: path.resolve('src/img'),
            exclude: /node_modules/,
            options: {
                limit: 1,
                name: "asset/[path][name].[ext]",
            }
        },
        {
            loader: 'file-loader',
            include: path.resolve('src/asset'),
            exclude: /node_modules/,
            options: {
                name: "[path][name].[ext]"
            }
        },
        /* {
             test: /\.html$/,
             loader: htmlExtractText.extract(
                 {
                     loader: "html-loader?name=[name].html&minimize=false&interpolate=require",
                     publicPath:""
                 }
             ),
             include: path.resolve( 'src/html' ),
             exclude: /node_modules/   ,
         },*/
        {
            test: /\.pug$/,
            // loader: htmlExtractCHText.extract({
            //     loader: "html?interpolate=require&name=[name].html!pug-html?pretty=true&exports=false",
            //     publicPath: "/",
            // }),
            loader: "file?name=CH/[name].html!extract?publicPath=/!html?interpolate=require&name=[name].html!pug-html?pretty=true&exports=false",
            include: [
                path.resolve('src/html/CH/')
            ],
            exclude: /node_modules/,
        },
        {
            test: /\.pug$/,
            // loader: htmlExtractENText.extract({
            //     loader: "html?interpolate=require&name=[name].html!pug-html?pretty=true&exports=false",
            //     publicPath: "/",
            // }),
            loader: "file?name=EN/[name].html!extract?publicPath=/!html?interpolate=require&name=[name].html!pug-html?pretty=true&exports=false",
            include: path.resolve('src/html/EN/'),
            exclude: /node_modules/,
        }
    ]
};

config.plugins = [
    cssExtractText,
    // htmlExtractText,
    // htmlExtractCHText,
    // htmlExtractENText,
    new webpack.DefinePlugin({
        __DEV__: DEV_MODE,
        'process.env.NODE_ENV': DEV_MODE ? "'development'" : '"production"'
    }),
    ...DEV_MODE ? [
        new webpack.HotModuleReplacementPlugin(),
    ] : [
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        // 以下這個還不知道要做什麼
        new webpack.LoaderOptionsPlugin({
            test: /\.css$/, // optionally pass test, include and exclude, default affects all loaders
            minimize: true,
            // debug: false,
        })
    ]
];


// 不要將這裡打包到你的 js 檔裡, 可以用 extensions ，然後自己 script src, 或是用 addVendor 的方法，二選一
config.externals = {
    'jquery': '$',
};
module.exports = config;