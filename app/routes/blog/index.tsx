import type { Route } from './+types';
import type { PostStrapi, PostType } from '../types/post';
import PostCard from '~/components/PostCard';
import { useState } from 'react';
import Pagination from '~/components/Pagination';
import InputSearch from '~/components/InputSearch';
import type { ResJsonStrapi } from '../types/project';

export async function loader({ request }: Route.LoaderArgs): Promise<{ posts: PostType[] }> {
	const resPosts = await fetch(`${import.meta.env.VITE_API_STRAPI_BASE}/api/posts?sort[0]=date:desc&populate=*`);
	if (!resPosts.ok) throw new Error('Failed to get posts');
	const jsonPosts: ResJsonStrapi<PostStrapi> = await resPosts.json();

	const posts = jsonPosts.data.map((item) => ({
		id: item.id,
		slug: item.slug,
		body: item.body,
		title: item.title,
		excert: item.excert,
		img: item.image?.url ? item.image.url : null,
		date: item.date,
	}));
	return { posts };
}

const BlogPage = ({ loaderData }: Route.ComponentProps) => {
	const [curPage, setCurPage] = useState(1);
	const [searchQuery, setSearchQuery] = useState('');

	const { posts } = loaderData;

	const filteredPosts = posts.filter((p) => {
		const query = searchQuery.toLowerCase();
		return p.title.toLowerCase().includes(query) || p.excert.toLowerCase().includes(query);
	});

	const postsPerPage = 2;
	const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
	// Vars For Pagination
	const indexOfLast = curPage * postsPerPage;
	const indexOfFirst = indexOfLast - postsPerPage;
	const slicedFilteredPosts = filteredPosts.slice(indexOfFirst, indexOfLast);

	return (
		<div className='max-w-3xl mx-auto mt-10 p-6 bg-gray-900'>
			<h2 className='text-3xl font-bold mb-8 text-white'>📝 Blog</h2>

			<InputSearch
				searchQuery={searchQuery}
				onSearchQuery={(val) => {
					setSearchQuery(val);
					setCurPage(1);
				}}
			/>

			{filteredPosts.length === 0 ? (
				<p className='text-gray-400 text-center'>No matches</p>
			) : (
				slicedFilteredPosts.map((post) => <PostCard key={post.id} post={post} />)
			)}

			<Pagination curPage={curPage} setCurPage={setCurPage} totalPages={totalPages} />
		</div>
	);
};

export default BlogPage;

// const url = new URL('/posts-meta.json', request.url);
// const res = await fetch(url.href);
// if (!res.ok) throw new Error('Failed to get response');
// const data: PostType[] = await res.json();

// data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
// return { posts: data };
