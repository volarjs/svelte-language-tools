import { LanguageServerPlugin, createConnection, startLanguageServer } from '@volar/language-server/node';
import createTsService from 'volar-service-typescript';
import { svelteLanguage } from './language';

const plugin: LanguageServerPlugin = (): ReturnType<LanguageServerPlugin> => {
	return {
		extraFileExtensions: [{ extension: 'svelte', isMixedContent: true, scriptKind: 7 }],
		watchFileExtensions: ['js', 'cjs', 'mjs', 'ts', 'cts', 'mts', 'jsx', 'tsx', 'json', 'svelte'],
		resolveConfig(config) {

			config.services ??= {};
			config.services.typescript ??= createTsService();

			config.languages ??= {};
			config.languages.svelte ??= svelteLanguage;

			return config;
		},
	}
};

startLanguageServer(
	createConnection(),
	plugin,
);
