import ProjectCard from '~/components/ProjectCard';
import type { Project } from '../types/project';
import type { Route } from './+types';

export async function loader({ params }: Route.LoaderArgs): Promise<{ projects: Project[] }> {
	const res = await fetch('http://localhost:8000/projects');
	const data = await res.json();
	return { projects: data };
}

const ProjectsPage = ({ loaderData }: Route.ComponentProps) => {
	const { projects } = loaderData as { projects: Project[] };

	return (
		<>
			<h2 className='text-3xl text-white font-bold mb-8'>🚀 Projects</h2>
			<div className='grid gap-6 sm:grid-cols-2'>
				{projects.map((project) => (
					<ProjectCard key={project.id} project={project} />
				))}
			</div>
		</>
	);
};
export default ProjectsPage;
