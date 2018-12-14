import * as os from 'os';
import * as fs from 'fs';
import * as path from 'path';
import camelCase from 'camelcase';
import {config} from './config';

const {snippetFilename, prefix, quotes} = config;
const noop = () => {};

function getSnippetPath() {
	// Todo: It should get the snippet path from vsode API instead.
	switch (os.platform()) {
		case 'darwin':
			return path.resolve(
				process.env.HOME as string,
				'Library',
				'Application Support',
				'Code',
				'User',
				'snippets',
				snippetFilename
			);
		case 'linux':
			return path.resolve(
				process.env.HOME as string,
				'.config',
				'Code',
				'User',
				'snippets',
				snippetFilename
			);
		case 'win32':
			return path.resolve(
				process.env.APPDATA as string,
				'Code',
				'User',
				'snippets',
				snippetFilename
			);
		default:
			return null;
	}
}

function writeSnippetFile(filepath: string, snippets: string) {
	const str = [
		"// WARNING: DON'T EDIT THIS FILE DIRECTLY.",
		'// This Snippet Was Generated by Npm Package Snippet Extension For Visual Studio Code',
		snippets
	];

	fs.writeFile(filepath, str.join(os.EOL), 'utf8', noop);
}

interface SnippetOptions {
	declaration: 'const' | 'import';
	identifier: string;
	callee: 'require' | 'from';
	moduleId: string;
}

function formatSnippet(options: SnippetOptions): string {
	const body = [
		options.declaration,
		options.identifier
	];

	if (options.callee === 'require') {
		if (quotes === 'single') {
			body.push(`= require('${options.moduleId}')`);
		} else {
			body.push(`= require("${options.moduleId}")`);
		}
	} else {
		if (quotes === 'single') {
			body.push(`from '${options.moduleId}'`);
		} else {
			body.push(`from "${options.moduleId}"`);
		}
	}

	const statement = body.join(' ').trim();
	return config.semicolon ? `${statement};` : statement;
}

export function createSnippet(dependencieNames: string[]) {
	const snippets = {};

	dependencieNames.forEach(moduleId => {
		let identifier = moduleId.startsWith('@')
			? moduleId.replace('@', '').replace('/', '-')
			: moduleId;

		identifier = camelCase(identifier);

		snippets[`(commonjs) - require '${moduleId}'`] = (() => {
			const opts: SnippetOptions = {
				declaration: 'const',
				identifier,
				callee: 'require',
				moduleId
			};

			return {
				scope: config.languages.join(','),
				prefix: `${prefix.cjs}${moduleId}`,
				description: formatSnippet(opts),
				body: formatSnippet({
					...opts,
					identifier: `\${1:${identifier}}`
				})
			};
		})();

		snippets[`(esmodule) - import '${moduleId}'`] = (() => {
			const opts: SnippetOptions = {
				declaration: 'import',
				identifier,
				callee: 'from',
				moduleId
			};

			return {
				prefix: `${prefix.esm}${moduleId}`,
				description: formatSnippet(opts),
				body: formatSnippet({
					...opts,
					identifier: `\${1:\${2:* as }${identifier}}`
				})
			};
		})();

		snippets[`(typescript) - import = require '${moduleId}'`] = (() => {
			const opts: SnippetOptions = {
				declaration: 'import',
				identifier,
				callee: 'require',
				moduleId
			};

			return {
				prefix: `${prefix.ts}${moduleId}`,
				description: formatSnippet(opts),
				body: formatSnippet({
					...opts,
					identifier: `\${1:${identifier}}`
				})
			};
		})();
	});

	return {
		snippets,
		save() {
			const filepath = getSnippetPath();
			if (filepath !== null) {
				writeSnippetFile(filepath, JSON.stringify(snippets, null, 2));
			}
		}
	};
}

export function cleanupSnippet() {
	const filepath = getSnippetPath();
	if (filepath !== null) {
		writeSnippetFile(filepath, JSON.stringify({}));
	}
}