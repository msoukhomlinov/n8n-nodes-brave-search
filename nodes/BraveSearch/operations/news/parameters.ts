import type { INodeProperties } from 'n8n-workflow';
import { country_codes, language_codes, market_codes } from '../_base';

const parameters: INodeProperties[] = [];
const optional_parameters: INodeProperties['options'] = [];

// The parameters for this operation
parameters.push(
	{
		displayName: 'Query',
		name: 'query',
		type: 'string' as const,
		default: '',
		description:
			'The user’s search query term. Query can not be empty. Maximum of 400 characters and 50 words in the query.',
		required: true,
	},
	{
		displayName: 'Count',
		name: 'count',
		type: 'number' as const,
		default: 20,
		description:
			'The number of news results returned in response. The maximum is 50. The actual number delivered may be less than requested. Combine this parameter with offset to paginate search results.',
		typeOptions: {
			minValue: 1,
			maxValue: 50,
		},
	},
);

// Optional Parameters
optional_parameters.push(
	{
		displayName: 'Country',
		name: 'country',
		type: 'options',
		// eslint-disable-next-line n8n-nodes-base/node-param-default-wrong-for-options
		default: 'US',
		description:
			'The search query country, where the results come from. The country string is limited to 2 character country codes of supported countries.',
		options: country_codes.map(({ country, code }) => ({ name: country, value: code })),
	},
	{
		displayName: 'Search Language',
		name: 'search_lang',
		type: 'options',
		// eslint-disable-next-line n8n-nodes-base/node-param-default-wrong-for-options
		default: 'en',
		description:
			'The language of the search query. The language string is limited to 2 character language codes of supported languages.',
		options: language_codes.map(({ language, code }) => ({
			name: language,
			value: code,
		})),
	},
	{
		displayName: 'User Interface Language',
		name: 'ui_lang',
		type: 'options',
		// eslint-disable-next-line n8n-nodes-base/node-param-default-wrong-for-options
		default: 'en-US',
		description:
			'User interface language preferred in response. Usually of the format <language_code>-<country_code>. For more, see <a href="https://www.rfc-editor.org/rfc/rfc9110.html#name-accept-language">RFC 9110</a>.',
		options: market_codes.map(({ country, language, code }) => ({
			name: `${language} (${country})`,
			value: code,
		})),
	},
	{
		displayName: 'Offset',
		name: 'offset',
		type: 'number',
		default: 0,
		description:
			'The number of results to skip before returning results. The default is 0. Combine this parameter with `count` to paginate search results.',
		typeOptions: {
			minValue: 0,
			maxValue: 9,
		},
	},
	{
		displayName: 'Spellcheck',
		name: 'spellcheck',
		type: 'boolean',
		default: true,
		description: 'Whether to enable spellcheck for the search query. The default is true.',
	},
	{
		displayName: 'Safe Search',
		name: 'safesearch',
		type: 'options',
		default: 'moderate',
		description: 'Whether to enable safe search for the search query. The default is moderate.',
		options: [
			{
				name: 'Off',
				value: 'off',
			},
			{
				name: 'Moderate',
				value: 'moderate',
			},
			{
				name: 'Strict',
				value: 'strict',
			},
		],
	},
	{
		displayName: 'Freshness',
		name: 'freshness',
		type: 'options',
		default: '',
		description: 'The freshness of the search query',
		options: [
			{
				name: 'All Time',
				value: '',
			},
			{
				name: 'Past 24 Hours',
				value: 'pd',
			},
			{
				name: 'Past 7 Days',
				value: 'pw',
			},
			{
				name: 'Past Month',
				value: 'pm',
			},
			{
				name: 'Past Year',
				value: 'py',
			},
		],
	},
	{
		displayName: 'Extra Snippets',
		name: 'extra_snippets',
		type: 'boolean',
		default: false,
		description:
			'Whether to enable extra snippets for the search query. A snippet is an excerpt from a page you get as a result of the query, and extra_snippets allow you to get up to 5 additional, alternative excerpts. Only available under Free AI, Base AI, Pro AI, Base Data, Pro Data and Custom plans.',
	},
	{
		displayName: 'Goggles',
		name: 'goggles',
		type: 'string',
		default: '',
		description:
			'Goggles act as a custom re-ranking on top of Brave’s search index. The parameter supports both a URL where the Goggle is hosted or the definition of the Goggle. For more details, refer to the <a href="https://github.com/brave/goggles-quickstart">Goggles repository</a>. The parameter can be repeated to query with multiple goggles.',
	},
);

if (optional_parameters.length > 0) {
	parameters.push({
		displayName: 'Additional Parameters',
		name: 'additionalParameters',
		type: 'collection' as const,
		default: {},
		placeholder: 'Add Parameter',
		options: optional_parameters,
	});
}

export default parameters satisfies INodeProperties[];
