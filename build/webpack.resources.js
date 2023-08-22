import {
	resolve,
	basename,
} from 'node:path';
import {
	mkdirSync,
	existsSync,
} from 'node:fs';

import { default as HtmlWebpackPlugin } from 'html-webpack-plugin';
import { default as ScriptExtHtmlWebpackPlugin } from 'script-ext-html-webpack-plugin';

import pkg from 'webpack';

import { getSettings } from './getSettings.js';

const { DefinePlugin } = pkg;

const projectSource = resolve('./src');

const getBuildConfig = (settings, options) => {
	const {
		path,
		output,
		config,
		client,
	} = settings;

	const {
		mode,
		release,
		inlineAsset,
		server = false,
	} = options;

	const isProduction = mode === 'production';
	const assetsMode = inlineAsset ? 'asset/inline' : 'asset/resource';

	const {
		bg,
		main,
	} = config;

	const {
		inject,
		inline,
	} = main;

	console.log('Client Config: ' + JSON.stringify(client));

	const plugins = [
		new HtmlWebpackPlugin({
			filename: output,
			template: resolve('./build/templates/standart.ejs'),
			inject: inject,
			minify: false,
			bgColor: bg,
			cache: false,
		}),
		new DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(mode),
			'process.env.CONFIG': JSON.stringify(client),
			'process.env.ANDROID_LINK': JSON.stringify(client.android || ''),
			'process.env.IOS_LINK': JSON.stringify(client.ios || ''),
		}),
	];

	if (inline) {
		plugins.push(new ScriptExtHtmlWebpackPlugin({
			inline: /\.js$/,
			removeInlinedAssets: true,
		}));
	}

	const presets = [
		[
			'@babel/preset-env', {
			useBuiltIns: 'usage',
			loose: true,
			//debug: true,
			corejs: '3',
			targets: 'cover 93% in US, not dead',
		},
		],
		['@babel/preset-flow', { loose: true }],
	];

	if (!server) {
		presets.push([
			'minify',
			{
				builtIns: false,
				simplify: false,
				removeConsole: isProduction,  // console
				removeDebugger: isProduction,
			},
		]);
	}

	return {
		name: 'build',
		target: 'web',
		entry: `${path}/index.js`,
		// entry: [`${path}/index.js`, `${path}/worker.js`],
		output: {
			publicPath: '',
			path: resolve(release),
			filename: 'index.js',
		},
		mode: mode,
		//cache: false,
		devtool: isProduction ? false : 'inline-source-map',
		devServer: {
			static: {
				directory: resolve(release),
				staticOptions: {
					index: basename(output),
				},
			},
			devMiddleware: {
				writeToDisk: true,
			},
			liveReload: false,
			hot: false,
			server: 'spdy',
			allowedHosts: ['test.ts'],
			host: '0.0.0.0',
			port: 443,
		},
		watch: false,
		resolve: {
			alias: {
				//'core-js': resolve('./libs/core-js/packages/core-js'),
				'regenerator-runtime': resolve('./node_modules/regenerator-runtime'),
			},
		},
		optimization: {
			chunkIds: 'natural',
			moduleIds: 'natural',
			mangleExports: 'size',
		},
		module: {
			rules: [
				{
					test: /\.(fnt|txt|css|json|wasm|svg|gif|hdr)$/,
					type: assetsMode,
					generator: {
						//mimetype: 'application/javascript'
					},
				},
				{
					test: /\.(wav|mp3|m4a)$/,
					type: assetsMode,
				},
				{
					test: /\.(ogg|mp4|m4v)$/,
					type: assetsMode,
				},
				{
					test: /\.(png|jpg|jpeg|jfif)$/,
					type: assetsMode,
				},
				{
					test: /\.js$/,
					exclude: [
						/bower_components/,
						/node_modules/,
						/core-js/,
					],
					use: {
						loader: 'babel-loader',
						options: {
							babelrc: false,
							compact: isProduction,
							minified: isProduction,
							comments: !isProduction,
							//modules: 'commonjs',
							presets: presets,
							plugins: [
								['@babel/plugin-transform-function-name', { loose: true }],
								['@babel/plugin-proposal-decorators', { legacy: true }],
								['@babel/plugin-proposal-class-properties', { loose: true }],
								// ['@babel/plugin-syntax-dynamic-import', {loose: true}],
							],
						},
					},
				},
			],
		},
		plugins: plugins,
	};
};

const remove = [
	'prefix',
	'network',
	'template',
	'zip',
	'sound',
	'main',
	'assets',
];

export default (env, argv) => {
	const {
		mode = 'production',
	} = argv;

	let {
		WEBPACK_SERVE = false,
		WEBPACK_WATCH = false,
		inline = true,
		assets = 'assets',
		release = 'release',
	} = env;

	const inlineAsset = inline !== 'false' && inline !== false;
	const isDevServer = WEBPACK_SERVE === true;

	const releaseDir = resolve(release);
	if (!existsSync(releaseDir)) {
		mkdirSync(releaseDir);
	}
	const assetsDir = resolve(release, assets);
	if (!existsSync(assetsDir)) {
		mkdirSync(assetsDir);
	}

	const settings = getSettings(projectSource, remove);

	const options = {
		mode,
		inlineAsset,
		assets,
		release,
		server: isDevServer,
	};

	return getBuildConfig(settings, options)
};
