import * as vscode from 'vscode';

interface ConfigOptions {
	snippetFilename: string;
	languages: string[]
	semicolon: boolean | undefined;
	quotes: 'single' | 'double';
	prefix: {
		cjs: string;
		esm: string;
		ts: string;
	}
}

const configuration = vscode.workspace.getConfiguration('snippet.npm-package')

export const config: ConfigOptions = {
	snippetFilename: configuration.get('filename') as string,
	languages: configuration.get('languages') as string[],
	semicolon: configuration.get('semicolon'),
	quotes: configuration.get('quotes') as ('single' | 'double'),
	prefix: {
		cjs: configuration.get('prefix.cjs') as string,
		esm: configuration.get('prefix.esm') as string,
		ts: configuration.get('prefix.ts') as string,
	}
}
