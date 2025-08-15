import type { Project } from '~/routes/types/project';
import ProjectCard from './ProjectCard';

const FeaturedProjects = ({ projects, count = 4 }: FeaturedProjectsProps) => {
	const fProjects = projects.filter((p) => p.featured).slice(0, count);

	return (
		<>
			<h2 className='text-2xl font-bold mb-6 text-gray-200'>Featured Projects</h2>

			<div className='grid gap-6 sm:grid-cols-2'>
				{fProjects.map((p) => (
					<ProjectCard key={p.id} project={p} />
				))}
			</div>
		</>
	);
};
export default FeaturedProjects;

interface FeaturedProjectsProps {
	projects: Project[];
	count?: number;
}
