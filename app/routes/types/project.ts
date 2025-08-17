export interface Project {
	id: number;
	documentId: string;
	title: string;
	description: string;
	image: string;
	url: string;
	date: Date;
	category: string;
	featured: boolean;
}

export interface ResJsonStrapi<T = ProjectStrapi> {
	data: T[];
	meta?: unknown;
}

export interface ProjectStrapi {
	id: number;
	documentId: string;
	title: string;
	description: string;
	url: string;
	date: Date;
	category: string;
	featured: boolean;
	createdAt: Date;
	updatedAt: Date;
	publishedAt: Date;
	image?: Image;
}

// --------------- ProjectStrapi depends START------
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
	ext: string;
	mime: string;
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
	large?: FormatSize;
	small?: FormatSize;
	medium?: FormatSize;
	thumbnail?: FormatSize;
}
interface FormatSize {
	ext: string;
	url: string;
	hash: string;
	mime: string;
	name: string;
	path: null;
	size: number;
	width: number;
	height: number;
	sizeInBytes: number;
}
// --------------- Project Strapi depends END------
