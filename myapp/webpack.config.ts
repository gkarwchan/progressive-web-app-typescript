import webpack from 'webpack';
import { join } from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';


const config: webpack.Configuration = {
  context: join(__dirname, 'src/'),
  entry: {
    main: './client/index.tsx'
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            silent: true
          }
        }
      }
    ]
  },
  resolve: {
    extensions: [".js", "jsx", ".ts", ".tsx"]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'server/index.html',
      inject: true
    })
  ]
}

export default config;