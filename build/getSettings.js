import {
	existsSync,
	readFileSync,
} from 'node:fs';

import { extend } from '../src/utils/extends/extend.js';
import { isDefined } from '../src/utils/types/isDefined.js';

export const getSettings = (src, remove) => {
	const args = process.env.npm_lifecycle_event.split(':');

	let [
		project,
		version,
		stage,
	] = args;

	if (isDefined(stage) && /^(dev|prod)$/.test(stage)) {
		stage = undefined;
	}

	let path = `${src}/${project}/${version}/${stage}`;
	if (!existsSync(path)) {
		path = `${src}/${project}/${version}`;
	}

	const config = {
		main: {
			inline: true,
			inject: 'body',
		},
	};

	[
		`${src}/${project}/config.json`,
		`${src}/${project}/${version}/config.json`,
		`${src}/${project}/${version}/config_${stage}.json`,
		`${src}/${project}/${version}/${stage}/config.json`,
	].forEach(path => {
		if (existsSync(path)) {
			let d;
			try {
				const buff = readFileSync(path);
				d = JSON.parse(buff.toString());
			} catch (e) {
				console.log(`cant parse config ${path}`);
				return;
			}

			console.log(`parse ${path}`);
			extend(config, d);
		}
	});

	const {
		prefix = '',
	} = config;

	const projectName = project.replace(/^\w+?/, d => d.toUpperCase());
	const versionName = (version + (stage ?
		'_' + stage :
		'')).split('_').map(name => name.replace(/^\w+?/, d => d.toUpperCase())).join('');

	const output = `${(prefix ? prefix + '_' : '')}${projectName}_${versionName}.html`;

	const client = Object.assign({}, config);

	remove.forEach(key => {
		delete client[key];
	});

	return {
		path,
		output,
		config,
		client,
	};
};