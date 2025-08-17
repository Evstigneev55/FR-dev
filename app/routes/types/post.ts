export type PostType = {
	id: string;
	slug: string;
	body: string;
	title: string;
	excert: string;
	img?: string | null;
	date: Date;
};

export interface PostStrapi {
	id: string;
	documentId: string;
	title: string;
	slug: string;
	body: string;
	excert: string;
	date: Date;
	createdAt: Date;
	updatedAt: Date;
	publishedAt: Date;
	image: Image;
}

// --------- PostStrapi depends START ------
interface Image {
	id: number;
	documentId: string;
	name: string;
	alternativeText: null;
	caption: null;
	width: number;
	height: number;
	formats: Formats;
	hash: string;
	size: number;
	url: string;
	previewUrl: null;
	provider: string;
	provider_metadata: null;
	createdAt: Date;
	updatedAt: Date;
	publishedAt: Date;
}
interface Formats {
	large: Large;
	small: Large;
	medium: Large;
	thumbnail: Large;
}
interface Large {
	url: string;
	hash: string;
	name: string;
	path: null;
	size: number;
	width: number;
	height: number;
	sizeInBytes: number;
}
interface Meta {
	pagination: Pagination;
}
interface Pagination {
	page: number;
	pageSize: number;
	pageCount: number;
	total: number;
}
// --------- PostStrapi depends END ------
