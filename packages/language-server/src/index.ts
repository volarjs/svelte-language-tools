import * as createTsPlugin from '@volar-plugins/typescript';
import { createConnection, startLanguageServer, LanguageServerPlugin } from '@volar/language-server/browser';
import { languageModule } from '@volar-examples/svelte-language-core';

const connection = createConnection();
const baseExts = ['js', 'cjs', 'mjs', 'ts', 'cts', 'mts', 'jsx', 'tsx', 'json', 'svelte'];
const plugin: LanguageServerPlugin = (): ReturnType<LanguageServerPlugin> => {
	return {
		tsconfigExtraFileExtensions: [{ extension: 'svelte', isMixedContent: true, scriptKind: 7 }],
		diagnosticDocumentSelector: [
			{ language: 'javascript' },
			{ language: 'typescript' },
			{ language: 'javascriptreact' },
			{ language: 'typescriptreact' },
			{ language: 'svelte' },
		],
		extensions: {
			fileRenameOperationFilter: baseExts,
			fileWatcher: baseExts,
		},
		resolveConfig(config) {

			config.plugins ??= {};
			config.plugins.typescript ??= createTsPlugin();

			config.languages ??= {};
			config.languages.svelte ??= languageModule;
		},
	}
};

startLanguageServer(
	connection,
	plugin,
);
