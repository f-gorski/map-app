const path = require("path")
const entryPath = "src/";
const entryFile = "App.js";

module.exports = {
  entry: `./${entryPath}${entryFile}`,
  output: {
    filename: "out.js",
    //path: path.resolve(__dirname, `/build`)
    path: path.join('C:/Users/qwerty/Desktop/map-app/map-app', '/build')
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
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
      },
    ]
  }
  
};
