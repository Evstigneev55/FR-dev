import { Link } from 'react-router';
import type { PostType } from '~/routes/types/post';

const PostsLatest = ({ posts, limit = 2 }: PostsLatestProps) => {
	const latests = [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, limit);

	return (
		<section className='max-w-6xl mx-auto px-6 py-12'>
			<h2 className='text-2xl font-bold mb-6 text-white'>🆕 Latests posts</h2>

			<div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
				{latests.map((post) => (
					<Link
						key={post.slug}
						to={`blog/${post.slug}`}
						className='block p-4 border border-gray-700 rounded-lg bg-gray-800 hover:shadow-md transition'
					>
						<h3 className='text-lg text-semibold text-blue-400 mb-1'>{post.title}</h3>
						<p className='text-s text-gray-300'>{post.excert}</p>
						<span className='block mt-2 text-xs text-gray-400'>{new Date(post.date).toDateString()}</span>
					</Link>
				))}
			</div>
		</section>
	);
};
export default PostsLatest;

interface PostsLatestProps {
	posts: PostType[];
	limit?: number;
}
