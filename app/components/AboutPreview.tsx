import { Link } from 'react-router';
const AboutPreview = () => {
	return (
		<section className='mt-12 p-10 flex flex-col items-center gap-8 bg-gray-900 md:flex-row '>
			<img
				src='/images/profile.jpg'
				alt='Profile'
				className='w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-md'
			/>
			<div>
				<h2 className='text-2xl font-bold text-white mb-2'>About Me</h2>
				<p className='text-gray-200 max-w-4xl mb-4'>Bla-bla-blah... Bruh, just click at the Link, and read there)</p>
				<Link to='/about' className='inline-block text-blue-400 text-s hover:underline'>
					Learn More About Me
				</Link>
			</div>
		</section>
	);
};
export default AboutPreview;
