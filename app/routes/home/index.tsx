import FeaturedProjects from '~/components/FeaturedProjects';
import type { Route } from './+types/index';
import type { Project } from '../types/project';
import AboutPreview from '~/components/AboutPreview';

export function meta({}: Route.MetaArgs) {
	return [{ title: 'The Friendly Dev | Welcome' }, { name: 'description', content: 'Welcome to the main page!' }];
}

export async function loader({ request }: Route.LoaderArgs): Promise<{ projects: Project[] }> {
	const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/projects`);
	if (!res.ok) throw new Response('Failed to fetch products', { status: 400 });
	const data: Project[] = await res.json();

	return { projects: data };
}

const HomePage = ({ loaderData }: Route.ComponentProps) => {
	const { projects } = loaderData;

	return (
		<>
			<FeaturedProjects projects={projects} count={1}/>
			<AboutPreview />
		</>
	);
};

export default HomePage;
