module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(png|jpe?g|gif|webp|svg)$/,
        type: 'asset/resource',
      },
    ],
  },
};