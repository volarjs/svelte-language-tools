import createTsPlugin from 'volar-service-typescript';
import { createConnection, startLanguageServer, LanguageServerPlugin } from '@volar/language-server/node';
import { languageModule } from '@volar-examples/svelte-language-core';

const connection = createConnection();
const baseExts = ['js', 'cjs', 'mjs', 'ts', 'cts', 'mts', 'jsx', 'tsx', 'json', 'svelte'];
const plugin: LanguageServerPlugin = (): ReturnType<LanguageServerPlugin> => {
	return {
		extraFileExtensions: [{ extension: 'svelte', isMixedContent: true, scriptKind: 7 }],
		watchFileExtensions: baseExts,
		resolveConfig(config) {

			config.services ??= {};
			config.services.typescript ??= createTsPlugin();

			config.languages ??= {};
			config.languages.svelte ??= languageModule;

			return config;
		},
	}
};

startLanguageServer(
	connection,
	plugin,
);
