import * as vscode from 'vscode';
import {readPackageUp, getDependencieNames} from './lib/package';
import {createSnippet} from './lib/snippets';
import {config} from './lib/config';

function handleActiveFile(activeTextEditor?: vscode.TextEditor) {
	const activeEditor = activeTextEditor || vscode.window.activeTextEditor;

	if (activeEditor && config.languages.includes(activeEditor.document.languageId)) {
		readPackageUp(activeEditor.document.fileName).then(pkg => {
			createSnippet([...new Set(getDependencieNames(pkg))]).save();
		});
	}
}

export function activate() {
	const filepath = config.snippetFilename;

	if (typeof filepath !== 'string' || filepath.trim() === '') {
		return;
	}

	if (vscode.env.appName.toLowerCase() !== 'visual studio code') {
		return;
	}

	if (vscode.workspace.rootPath) {
		handleActiveFile();
		vscode.window.onDidChangeActiveTextEditor(handleActiveFile);
	}
}

export function deactivate() {
	//
}
