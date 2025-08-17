import FeaturedProjects from '~/components/FeaturedProjects';
import type { Route } from './+types/index';
import type { Project, ResJsonStrapi } from '../types/project';
import AboutPreview from '~/components/AboutPreview';
import type { PostStrapi, PostType } from '../types/post';
import PostsLatest from '~/components/PostsLatest';

export function meta({}: Route.MetaArgs) {
	return [{ title: 'The Friendly Dev | Welcome' }, { name: 'description', content: 'Welcome to the main page!' }];
}

//! Change: Promise.all()  To  Promise.allSettled()
export async function loader({
	request,
}: Route.LoaderArgs): Promise<{ projectsFeatured: Project[]; posts: PostType[] }> {
	const url = new URL(request.url);
	const [resProjectsFeaturedStrapi, resPosts] = await Promise.all([
		fetch(`${import.meta.env.VITE_API_STRAPI_BASE}/api/projects?filters[featured][$eq]=true&populate=*`),
		fetch(`${import.meta.env.VITE_API_STRAPI_BASE}/api/posts?sort[0]=date:desc&populate=*`),
	]);
	if (!resProjectsFeaturedStrapi.ok || !resPosts.ok) throw new Error('Failed to fetch posts or projects');
	const [jsonProjectsFeaturedStrapi, jsonPosts]: [ResJsonStrapi, ResJsonStrapi<PostStrapi>] = await Promise.all([
		resProjectsFeaturedStrapi.json(),
		resPosts.json(),
	]);

	const posts = jsonPosts.data.map((item) => ({
		id: item.id,
		slug: item.slug,
		body: item.body,
		title: item.title,
		excert: item.excert,
		img: item.image?.url ? item.image.url : null,
		date: item.date,
	}));
	const projectsFeatured = jsonProjectsFeaturedStrapi.data.map((item) => ({
		id: item.id,
		documentId: item.documentId,
		title: item.title,
		description: item.description,
		url: item.url,
		date: item.date,
		category: item.category,
		featured: item.featured,
		image: item.image?.formats.medium?.url
			? item.image.formats.medium.url
			: 'images/no-image.png',
	}));

	return { projectsFeatured, posts };
}

const HomePage = ({ loaderData }: Route.ComponentProps) => {
	const { projectsFeatured, posts } = loaderData;

	return (
		<>
			<FeaturedProjects projectsFeatured={projectsFeatured} count={2} />
			<AboutPreview />
			<PostsLatest posts={posts} limit={3} />
		</>
	);
};

export default HomePage;
