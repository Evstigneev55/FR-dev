import type { Project } from '~/routes/types/project';
import ProjectCard from './ProjectCard';

const FeaturedProjects = ({ projectsFeatured, count = 4 }: FeaturedProjectsProps) => {
	if (projectsFeatured.length === 0) return null;

	const projectsFeaturedSliced = [...projectsFeatured]
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
		.slice(0, count);

	return (
		<>
			<h2 className='text-2xl font-bold mb-6 text-gray-200'>⭐ Featured Projects</h2>

			<div className='grid gap-6 sm:grid-cols-2'>
				{projectsFeaturedSliced.map((p) => (
					<ProjectCard key={p.id} project={p} />
				))}
			</div>
		</>
	);
};
export default FeaturedProjects;

interface FeaturedProjectsProps {
	projectsFeatured: Project[];
	count?: number;
}
