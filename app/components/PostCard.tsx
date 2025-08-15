import { Link } from 'react-router';
import type { PostMeta } from '~/routes/types/post';

const PostCard = ({ post }: { post: PostMeta }) => {
	return (
		<article className='bg-gray-800 p-6 rounded-lg shadow mb-6'>
			<Link to={`/blog/${post.slug}`} className='hover:underline decoration-blue-400'>
				<h3 className='text-2xl font-semibold text-blue-400'>{post.title}</h3>
			</Link>
			<p className='text-sm text-gray-400 mb-2'>{new Date(post.date).toDateString()}</p>
			<p className='text-gray-300'>{post.excerpt}</p>
		</article>
	);
};
export default PostCard;
