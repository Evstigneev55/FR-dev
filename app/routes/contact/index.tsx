const ContactPage = () => {
	return (
		<div className='max-3xl mx-auto mt-12 px-6 py-8 bg-gray-900'>
			<h2 className='text-3xl font-bold text-white mb-8 text-center'>📬 Contact Me</h2>
			<form action='https://formspree.io/f/xvgqngzy' method='POST' className='space-y-6'>
				<div>
					<label htmlFor='fullName' className='block text-s font-medium text-gray-300'>
						Full Name
					</label>
					<input
						required
						type='text'
						id='fullName'
						name='fullName'
						className='w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100'
					/>
				</div>
				<div>
					<label htmlFor='email' className='block text-s font-medium text-gray-300'>
						Email
					</label>
					<input
						required
						type='email'
						id='email'
						name='email'
						className='w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100'
					/>
				</div>
				<div>
					<label htmlFor='subject' className='block text-s font-medium text-gray-300'>
						Subject
					</label>
					<input
						required
						type='text'
						id='subject'
						name='subject'
						className='w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100'
					/>
				</div>
				<div>
					<label htmlFor='message' className='block text-s font-medium text-gray-300'>
						Message
					</label>
					<textarea
						required
						id='message'
						name='message'
						className='w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100'
					/>
				</div>
				<button className='w-full bg-blue-600 text-white py-2 rounded-lg cursor-pointer hover:bg-blue-700'>
					Send Message
				</button>
			</form>
		</div>
	);
};
export default ContactPage;
