import type { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

export interface BraveSearchOperation {
	key: string;
	endpoint: string;
	details: INodePropertyOptions;
	parameters: INodeProperties[];
	buildQuery(parameters: Record<string, any>): Record<string, any>;
}

/**
 * Standard buildQuery implementation that properly handles array parameters and filters empty values
 * @param query - The query parameters object
 * @returns Processed query parameters suitable for API consumption
 */
export function standardBuildQuery(query: Record<string, any>): Record<string, any> {
	const { query: q, ...rest } = query;
	const qs: Record<string, any> = { q };

	for (const [key, value] of Object.entries(rest)) {
		if (value !== undefined && value !== null && value !== '') {
			// Handle array parameters (like result_filter) by converting to comma-separated string
			if (Array.isArray(value)) {
				qs[key] = value.join(',');
			} else {
				qs[key] = value;
			}
		}
	}

	return qs;
}
