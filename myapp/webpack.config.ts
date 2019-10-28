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
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ]
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(eot|otf|ttf|woff|woff2)$/,
        use: 'file-loader'
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