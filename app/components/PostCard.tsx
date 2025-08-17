import { Link } from 'react-router';
import type { PostType } from '~/routes/types/post';

const PostCard = ({ post }: { post: PostType }) => {
	return (
		<article className='bg-gray-800 p-6 rounded-lg shadow mb-6'>
			<Link to={`/blog/${post.slug}`} className='hover:underline decoration-blue-400'>
				<h3 className='text-2xl font-semibold text-blue-400'>{post.title}</h3>
			</Link>
			{post.img && <img src={post.img} alt={post.title} className='w-full h-65 object-cover my-2' />}
			<p className='text-sm text-gray-400 mb-2'>{new Date(post.date).toDateString()}</p>
			<p className='text-gray-300'>{post.excert}</p>
		</article>
	);
};
export default PostCard;
