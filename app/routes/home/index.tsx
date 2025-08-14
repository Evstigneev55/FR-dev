import type { Route } from './+types/index';
import Hero from '~/components/Hero';

export function meta({}: Route.MetaArgs) {
	return [
		{title: 'The Friendly Dev | Welcome'}, 
		{name: 'description', content: 'Welcome to the main page!'},
	];
}

export default function HomePage() {
	return <>HomePage</>;
}
