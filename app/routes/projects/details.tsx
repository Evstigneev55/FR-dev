import { Link } from 'react-router';
import type { Project, ProjectStrapi, ResJsonStrapi } from '../types/project';
import type { Route } from './+types/details';
import { FaArrowLeft } from 'react-icons/fa';

export async function loader({ request, params }: Route.LoaderArgs): Promise<{ project: Project }> {
	const res = await fetch(
		`${import.meta.env.VITE_API_STRAPI_BASE}/api/projects?filters[documentId][$eq]=${params.documentId}&populate=*`
	);
	if (!res.ok) throw new Response('Project not found', { status: 404 });
	const jsone: ResJsonStrapi<ProjectStrapi> = await res.json();

	const item = jsone.data[0];
	const project: Project = {
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
	};
	return { project };
}

const ProjectDetailsPage = ({ loaderData }: Route.ComponentProps) => {
	const {project} = loaderData;

	return (
		<>
			<Link to='/projects' className='flex items-center text-blue-400 hover:text-blue-500 mb-6 transition'>
				<FaArrowLeft className='mr-2' />
				<span>Back To Projects</span>
			</Link>

			<div className='grid gap-8 md:grid-cols-2 items-start'>
				<div>
					<img src={project?.image} alt={project?.title} className='w-full rounded-lg shadow-md' />
				</div>
				<div>
					<h1 className='text-3xl font-bold text-blue-400 mb-4'>{project?.title}</h1>
					<p className='text-gray-300 mb-4'>
						{new Date(project?.date || 404).toLocaleDateString()} • {project?.category}
					</p>
					<p className='text-gray-200 mb-6'>{project?.description}</p>
					<a
						href={project?.url}
						target='_blank'
						className='inline-block text-white bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded transition'
					>
						View Live Site →
					</a>
				</div>
			</div>
		</>
	);
};
export default ProjectDetailsPage;
