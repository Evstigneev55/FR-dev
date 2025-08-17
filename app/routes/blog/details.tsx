import ReactMarkdown from 'react-markdown';
import type { PostStrapi, PostType } from '../types/post';
import type { Route } from './+types/details';
import { Link } from 'react-router';
import type { ResJsonStrapi } from '../types/project';

export async function loader({ request, params }: Route.LoaderArgs): Promise<{ post: PostType }> {
	const resPosts = await fetch(
		`${import.meta.env.VITE_API_STRAPI_BASE}/api/posts?filters[slug][$eq]=${params.slug}&populate=*`
	);
	if (!resPosts.ok) throw new Error('Failed to get posts...');
	const jsonPosts: ResJsonStrapi<PostStrapi> = await resPosts.json();

	const item = jsonPosts.data[0];
	const post: PostType = {
		id: item.id,
		slug: item.slug,
		body: item.body,
		title: item.title,
		excert: item.excert,
		img: item.image?.url ? item.image.url : null,
		date: item.date,
	};
	return { post };
}

const PostDetailsPage = ({ loaderData }: Route.ComponentProps) => {
	const { post } = loaderData;
	return (
		<div className='max-w-3xl mx-auto px-6 py-12 bg-gray-900'>
			<h1 className='text-3xl font-bold text-blue-400 mb-2'>{post.title}</h1>
			<p className='text-sm text-gray-400 mb-6'>{new Date(post.date).toLocaleDateString()}</p>
			{post.img && <img src={post.img} alt={post.title} className='w-full h-65 object-cover mb-4' />}
			<div className='prose prose-invert max-w-none mb-12'>
				<ReactMarkdown>{post.body}</ReactMarkdown>
			</div>

			<Link
				to='/blog'
				className='inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition'
			>
				← Back to Posts
			</Link>
		</div>
	);
};
export default PostDetailsPage;

type PostsDetailsPageProps = {
	loaderData: {
		PostType: PostType;
		markdown: string;
	};
};

// const url = new URL(`/posts-meta.json`, request.url);
// 	const res = await fetch(url.href);
// 	if (!res.ok) throw new Error('Failed to fetch posts-meta');
// 	const postsMeta: PostType[] = await res.json();
// 	const PostType = postsMeta.find((p) => p.slug === params.slug);
// 	if (!PostType) throw new Response('Not Found that post', { status: 404 });
// 	const markdown = await import(`../posts/${params.slug}.md?raw`);
// 	return { PostType, markdown: markdown.default };
