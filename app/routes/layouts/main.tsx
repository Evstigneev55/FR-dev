import { Outlet } from 'react-router';
import type { Route } from '../home/+types';

export function meta({}: Route.MetaArgs) {
	return [{ title: 'The Friendly dev' }, { name: 'description', content: 'About / Contant me / projects / blogs pages' }];
}


const MainLayout = () => {
	return (
		<section className='max-w-6xl mx-auto px-6 my-8'>
			<Outlet />
		</section>
	);
};
export default MainLayout;
