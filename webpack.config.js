const path = require("path")
const entryPath = "src/";
const entryFile = "App.js";

module.exports = {
  entry: `./${entryPath}${entryFile}`,
  output: {
    filename: "out.js",
    path: path.resolve(__dirname, `/build`)
  },
  devServer: {
    contentBase: path.__dirname,
    publicPath: "/build/",
    compress: true,
    port: 3001,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
         "babel-loader",
        ]
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
          
        ]
      },
      {
        test: /\.(png|jpg)$/i,
        loader: 'url-loader'
      }
      
    ]
  }
  
};
