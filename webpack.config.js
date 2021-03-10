var path = require('path')
var webpack = require('webpack')
const {
  VueLoaderPlugin
} = require('vue-loader')

module.exports = env => {
  console.log("env", env);
  return {
    entry: env.lib ? "./packages/index.js" : "./examples/main.js",
    module: {
      rules: [{
        test: /\.vue$/,
        use: 'vue-loader'
      }, {
        test: /\.css$/,
        use: ['vue-style-loader', 'style-loader', 'css-loader'],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader'
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
      ]
    },
    plugins: [
      new VueLoaderPlugin()
    ],
    output: {
      // 打包文件的生成路径
      path: path.resolve(__dirname, env.lib ? "./lib" : "./dist"),
      publicPath: env.lib ? "/lib/" : "/dist/",
      // 打包后生成的文件名
      filename: env.lib ? "mali-box-header.js" : "build.js",
      /**
       * library指定的就是你使用require时引入的模块名
       * 这里便是require(“vue-directive-kit”)
       */
      library: env.lib ? "mali-box-header" : "",
      /**
       * libraryTarget可以指定打包文件中代码的模块化方式，默认为var，常见有如下几种:
       * commonjs/commonjs2: 将你的library暴露为CommonJS模块
       * amd: 将你的library暴露为amd模块
       * umd: 将你的library暴露为所有的模块定义下都可运行的方式
       * 其中AMD和UMD需要指定library，如果不声明组件库则不能正常运行,
       * 这是为了在浏览器上通过script标签加载时，用AMD模块方式输出的组件库可以有明确的模块名
       */
      libraryTarget: env.lib ? "umd" : "var",
      /**
       * 当使用了 libraryTarget: "umd"，
       * 设置umNamedDefine为true时，
       * 会对 UMD 的构建过程中的 AMD 模块进行命名。否则就使用匿名的 define。
       */
      umdNamedDefine: env.lib ? true : false,
    },
  };
};