import * as path from 'path';
import readPkgUp from 'read-pkg-up';

const noop = () => {};

export async function readPackageUp(pth) {
	return readPkgUp({cwd: path.dirname(pth)})
		.then(pkg => pkg.pkg || {})
		.catch(noop);
};

export function getDependencieNames(pkg) {
	const arr = [
		...Object.keys(pkg.dependencies || {}),
		...Object.keys(pkg.devDependencies || {}),
	];

	return arr.filter(str => !str.startsWith('@types/'));
}
