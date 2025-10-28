import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import editorconfig from 'eslint-plugin-editorconfig';
import pathAlias from 'eslint-plugin-path-alias';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import { defineConfig, globalIgnores } from 'eslint/config';

import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all
});

export default defineConfig([
	globalIgnores(['**/node_modules', '**/dist']),
	{
		extends: compat.extends(
			'plugin:@typescript-eslint/recommended',
			'prettier',
			'plugin:editorconfig/noconflict'
		),

		plugins: {
			editorconfig,
			'path-alias': pathAlias,
			'unused-imports': unusedImports,
			'simple-import-sort': simpleImportSort,
			'@typescript-eslint': typescriptEslint
		},

		languageOptions: {
			parser: tsParser
		},

		settings: {
			'import/resolver': {
				alias: {
					map: [
						['~/*', './packages/*'],
						['@app/*', './packages/src/*'],
						['@ui/*', './packages/src/ui/*'],
						['@stores/*', './packages/src/stores/*'],
						['@modules/*', 'modules/*']
					]
				}
			}
		},

		rules: {
			quotes: [
				'error',
				'single',
				{
					avoidEscape: true
				}
			],

			semi: ['error', 'always'],
			'require-await': 'error',
			'object-curly-spacing': ['error', 'always'],
			'array-bracket-spacing': ['error', 'never'],
			'comma-dangle': ['error', 'never'],

			'no-unneeded-ternary': [
				'error',
				{
					defaultAssignment: false
				}
			],

			'prefer-const': 'error',
			'prefer-spread': 'error',
			'no-unsafe-optional-chaining': 'error',
			'no-nested-ternary': 'warn',
			'@typescript-eslint/no-non-null-assertion': 'off'
		}
	}
]);
