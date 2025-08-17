import ProjectCard from '~/components/ProjectCard';
import type { Project, ProjectStrapi, ResJsonStrapi } from '../types/project';
import type { Route } from './+types';
import { useState } from 'react';
import Pagination from '~/components/Pagination';
import { AnimatePresence, motion } from 'framer-motion';

export async function loader({ params }: Route.LoaderArgs): Promise<{ projects: Project[] }> {
	const res = await fetch(`${import.meta.env.VITE_API_STRAPI_BASE}/api/projects?populate=*`);
	const jsone: ResJsonStrapi<ProjectStrapi> = await res.json();

	const projects = jsone.data.map((item) => ({
		id: item.id,
		documentId: item.documentId,
		title: item.title,
		description: item.description,
		url: item.url,
		date: item.date,
		category: item.category,
		featured: item.featured,
		image: item.image?.formats.medium?.url
			? item.image.formats.medium.url
			: 'images/no-image.png',
	}));
	return { projects };
}

const ProjectsPage = ({ loaderData }: Route.ComponentProps) => {
	const [curPage, setCurPage] = useState(1);
	const [selectedCategory, setSelectedCategory] = useState('All');

	const { projects } = loaderData;

	const categories = ['All', ...new Set(projects.map((project) => project.category))];

	const filteredProjects =
		selectedCategory === 'All' ? projects : projects.filter((p) => p.category === selectedCategory);

	const projectsPerPage = 4;
	const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
	// indexes of Projects, that displayed on current Page
	const indexOfLast = curPage * projectsPerPage;
	const indexOfFirst = indexOfLast - projectsPerPage;
	const currentProjectsOnPage = filteredProjects.slice(indexOfFirst, indexOfLast);

	return (
		<>
			<div className='flex justify-between'>
				<h2 className='text-3xl text-white font-bold mb-8'>🚀 Projects</h2>

				<div className='flex flex-wrap gap-2 mb-8'>
					{categories.map((c) => (
						<button
							key={c}
							onClick={() => {
								setSelectedCategory(c);
								setCurPage(1);
							}}
							className={`px-3 py-1 cursor-pointer rounded text-s ${selectedCategory === c ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-200'}`}
						>
							{c}
						</button>
					))}
				</div>
			</div>
			<AnimatePresence mode='wait'>
				<div className='grid gap-6 sm:grid-cols-2'>
					{currentProjectsOnPage.map((project) => (
						<motion.div key={project.id} layout>
							<ProjectCard project={project} />
						</motion.div>
					))}
				</div>
			</AnimatePresence>
			<Pagination curPage={curPage} setCurPage={setCurPage} totalPages={totalPages} />
		</>
	);
};
export default ProjectsPage;
