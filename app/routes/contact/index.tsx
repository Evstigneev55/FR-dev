import { Form } from 'react-router';
import type { Route } from './+types';

export async function action({ request }: Route.ActionArgs) {
	let formData = await request.formData();
	let fullName = formData.get('fullName');
	let email = formData.get('email');
	let subject = formData.get('subject');
	let message = formData.get('message');
	const data = { fullName, email, subject, message };

	// Any actions with that data(exmp: Create db note)

	const errors: Partial<Record<ErrorsKeys, string>> = {};
	// Validation
	if (!fullName) errors.fullName = 'Name is required';
	if (!email) errors.email = 'Email is required';
	else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email))) errors.email = 'Invalid email format';
	if (!subject) errors.subject = 'Subject is required';
	if (!message) errors.message = 'Message is required';

	if (Object.keys(errors).length > 0) return { errors };
	return { message: 'All right, all right!', data };
}

const ContactPage = ({ actionData }: Route.ComponentProps) => {
	const errors = actionData?.errors ?? {};
	return (
		<div className='max-3xl mx-auto mt-12 px-6 py-8 bg-gray-900'>
			{actionData?.message && (
				<p className='mb-4 p-4 bg-green-700 text-green-100 text-center rounded-lg border border-green-500 shadow-md'>
					{actionData.message}
				</p>
			)}
			<h2 className='text-3xl font-bold text-white mb-8 text-center'>📬 Contact Me</h2>
			<Form method='post' className='space-y-6'>
				<div>
					<label htmlFor='fullName' className='block text-s font-medium text-gray-300'>
						Full Name
					</label>
					<input
						type='text'
						id='fullName'
						name='fullName'
						className='w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100'
					/>
					{errors.fullName && <p className='text-red-500 text-s mt-1'>{errors.fullName}</p>}
				</div>
				<div>
					<label htmlFor='email' className='block text-s font-medium text-gray-300'>
						Email
					</label>
					<input
						type='email'
						id='email'
						name='email'
						className='w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100'
					/>
					{errors.email && <p className='text-red-500 text-s mt-1'>{errors.email}</p>}
				</div>
				<div>
					<label htmlFor='subject' className='block text-s font-medium text-gray-300'>
						Subject
					</label>
					<input
						type='text'
						id='subject'
						name='subject'
						className='w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100'
					/>
					{errors.subject && <p className='text-red-500 text-s mt-1'>{errors.subject}</p>}
				</div>
				<div>
					<label htmlFor='message' className='block text-s font-medium text-gray-300'>
						Message
					</label>
					<textarea
						id='message'
						name='message'
						className='w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100'
					/>
					{errors.message && <p className='text-red-500 text-s mt-1'>{errors.message}</p>}
				</div>
				<button className='w-full bg-blue-600 text-white py-2 rounded-lg cursor-pointer hover:bg-blue-700'>
					Send Message
				</button>
			</Form>
		</div>
	);
};
export default ContactPage;

type ErrorsKeys = 'fullName' | 'email' | 'subject' | 'message';
