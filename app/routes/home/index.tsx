import FeaturedProjects from '~/components/FeaturedProjects';
import type { Route } from './+types/index';
import type { Project } from '../types/project';
import AboutPreview from '~/components/AboutPreview';
import type { PostMeta } from '../types/post';
import PostsLatest from '~/components/PostsLatest';

export function meta({}: Route.MetaArgs) {
	return [{ title: 'The Friendly Dev | Welcome' }, { name: 'description', content: 'Welcome to the main page!' }];
}

//! Change: Promise.all()  To  Promise.allSettled()
export async function loader({ request }: Route.LoaderArgs): Promise<{ projects: Project[]; posts: PostMeta[] }> {
	const url = new URL(request.url);
	const [resProjects, resPosts] = await Promise.all([
		fetch(`${import.meta.env.VITE_API_BASE_URL}/projects`),
		fetch(new URL('/posts-meta.json', url)),
	]);
	if (!resProjects.ok || !resPosts.ok) throw new Error('Failed to fetch posts or projects');
	const [projects, posts] = await Promise.all([resProjects.json(), resPosts.json()]);
	return { projects, posts };
}

const HomePage = ({ loaderData }: Route.ComponentProps) => {
	const { projects, posts } = loaderData;

	return (
		<>
			<FeaturedProjects projects={projects} count={2} />
			<AboutPreview />
			<PostsLatest posts={posts} limit={3}/>
		</>
	);
};

export default HomePage;
