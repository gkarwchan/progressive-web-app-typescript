import * as webpack from 'webpack';
import { join } from 'path';


const config: webpack.Configuration = {
  context: join(__dirname, 'src/'),
  entry: {
    main: './'
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
    extensions: [".ts", "tsx", "js", "jsx"]
  }
}

export default config;