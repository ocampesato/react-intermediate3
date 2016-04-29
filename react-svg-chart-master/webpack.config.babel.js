export default {
  externals: {
    react: 'React',
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel',
      test: /\.js$/,
    }],
  },
};
