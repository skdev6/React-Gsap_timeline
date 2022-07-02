/* eslint-disable no-trailing-spaces */
/* eslint-disable multiline-comment-style */
/* eslint-disable import/no-extraneous-dependencies */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { DefinePlugin } = require('webpack')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
// const babelConfig = require('./.babelrc')


/* local path variables */
const SRC_DIR = path.resolve(__dirname, '../')

// gets unique portion of parent directory
const directoryName = path.basename(path.dirname(__filename)).replace('bespoke-interactives-', '')

const sassResourcesLoader = {
	loader: 'sass-resources-loader',
	options: {
		resources: [
			path.resolve(__dirname, 'src/sass/custom-variables.scss'),
			path.resolve(__dirname, 'src/sass/_icons-base64.scss'),
			path.resolve(__dirname, 'src/sass/_icons.scss'),

			/* DDS-Design-Tokens */
			// path.resolve(SRC_DIR, 'dds-design-tokens/build/scss/_dds-tokens.scss')
		],
		sourceMap: false
	}
}

module.exports = (env, argv) => {
	const isDevelopment = argv.mode === 'development'

	return {
		context: path.join(__dirname, 'src'),
		entry: path.join(__dirname, 'src', 'index.js'),
		output: {
			path: path.join(__dirname, 'dist'),
			filename: 'index.js'
		},
		module: {
			rules: [
				// https://github.com/pmndrs/react-spring/issues/1078
				{
					test: /react-spring/,
					sideEffects: true
				},
				{
					loader: 'babel-loader',
					test: /\.js$/,
					// options: babelConfig,
					exclude: /node_modules/
				},
				{
					test: /\.(png|jpg|webp|gif|woff|woff2|eot|ttf|svg|mp3|jpeg)$/,
					oneOf: [
						{
							resourceQuery: /raw/,
							use: 'raw-loader'
						},
						{
							loader: 'file-loader',
							options: {
								name: '[name].[ext]',
								...((env.BUILD_MODE === 'production' || env.BUILD_MODE === 'uat') && { publicPath: `/spContent/bespoke/${directoryName}/` }) // conditionally add publicPath in uat and production
							}
						}
					]
				},
				{
					test: /\.s?css$/,
					oneOf: [
						{
							test: /\.module\.s?css$/,
							use: [
								'style-loader',
								{
									loader: 'css-loader',
									options: {
										modules: {
											localIdentName: '[local]__[hash:base64:5]',
											exportLocalsConvention: 'camelCaseOnly'
										},
										sourceMap: isDevelopment
									}
								},
								// postCssLoader, --> autoprefixer
								{
									loader: 'sass-loader',
									options: { sourceMap: isDevelopment }
								},
								sassResourcesLoader
							]
						},
						{
							use: [
								'style-loader',
								'css-loader',
								// postCssLoader, --> autoprefixer
								'sass-loader',
								sassResourcesLoader
							]
						}
					]
				}
			]
		},
		plugins: [
			// new BundleAnalyzerPlugin(),
			new CleanWebpackPlugin(),
			new HtmlWebpackPlugin({
				template: path.join(__dirname, 'src', 'index.html')
			}),
			new DefinePlugin({
				'process.env.BUILD_MODE': JSON.stringify(env.BUILD_MODE)
			})
		],
		devtool: isDevelopment ? 'eval-cheap-module-source-map' : false,
		devServer: {
			static: {
				directory: path.join(__dirname, 'dist')
			},
			historyApiFallback: true,
			host: '0.0.0.0'
		},
		resolve: {
			extensions: [ '.js', '.scss' ],
			alias: {
				Assets: path.join(__dirname, 'src/assets/'),
				Context: path.join(__dirname, 'src/context/'),
				Util: path.join(__dirname, 'src/util/')
			}
		}
	}
}
