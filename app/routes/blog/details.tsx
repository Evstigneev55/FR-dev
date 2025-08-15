import ReactMarkdown from 'react-markdown';
import type { PostMeta } from '../types/post';
import type { Route } from './+types/details';
import { Link } from 'react-router';

export async function loader({ request, params }: Route.LoaderArgs): Promise<{ postMeta: PostMeta; markdown: string }> {
	const url = new URL(`/posts-meta.json`, request.url);
	const res = await fetch(url.href);
	if (!res.ok) throw new Error('Failed to fetch posts-meta');
	const postsMeta: PostMeta[] = await res.json();
	const postMeta = postsMeta.find((p) => p.slug === params.slug);
	if (!postMeta) throw new Response('Not Found that post', { status: 404 });
	const markdown = await import(`../posts/${params.slug}.md?raw`);
	return { postMeta, markdown: markdown.default };
}

type PostsDetailsPageProps = {
	loaderData: {
		postMeta: PostMeta;
		markdown: string;
	};
};

const PostDetailsPage = ({ loaderData }: PostsDetailsPageProps) => {
	const { markdown, postMeta } = loaderData;
	return (
		<div className='max-w-3xl mx-auto px-6 py-12 bg-gray-900'>
			<h1 className='text-3xl font-bold text-blue-400 mb-2'>{postMeta.title}</h1>
			<p className='text-sm text-gray-400 mb-6'>{new Date(postMeta.date).toLocaleDateString()}</p>
			<div className='prose prose-invert max-w-none mb-12'>
				<ReactMarkdown>{markdown}</ReactMarkdown>
			</div>

			<Link to='/blog' className='inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition'>← Back to Posts</Link>
		</div>
	);
};
export default PostDetailsPage;
