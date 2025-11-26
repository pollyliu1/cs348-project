import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLoader } from 'react-icons/fi';

interface AuthFormProps {
	isLogin: boolean;
}

export default function AuthForm({ isLogin }: AuthFormProps) {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();

	const handleToggle = () => {
		const targetPath = isLogin ? '/signup' : '/login';
		navigate(targetPath);
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		// api call to authenticate/create user
		// if isLogin then authenticate use otherwise call endpoint to create new user with name, email and password
		// call auth context login function with user id
		// also set any error strings on error
	};

	return (
		<div className='h-screen flex items-center justify-center p-4'>
			<div className='w-full max-w-md bg-white rounded-3 p-10 space-y-6'>
				<div className='flex flex-col items-center'>
					<h2 className='mt-3 text-3xl font-extrabold text-gray-900'>
						{isLogin ? 'Login to Adopt-A-Mon' : 'Create a New Account'}
					</h2>
				</div>
				<form className='space-y-4' onSubmit={handleSubmit}>
					{!isLogin && (
						<div className='flex flex-col gap-1'>
							<label htmlFor='email' className='text-sm text-black font-medium'>
								Name
							</label>
							<input
								id='name'
								name='name'
								type='text'
								autoComplete='name'
								required
								value={name}
								onChange={(e) => setName(e.target.value)}
								placeholder='Name'
								className='appearance-none rounded-1.5 w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
								disabled={isLoading}
							/>
						</div>
					)}
					<div className='flex flex-col gap-1'>
						<label htmlFor='email' className='text-sm text-black font-medium'>
							Email address
						</label>
						<input
							id='email'
							name='email'
							type='email'
							autoComplete='email'
							required
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder='Email address'
							className='appearance-none rounded-1.5 w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
							disabled={isLoading}
						/>
					</div>
					<div className='flex flex-col gap-1'>
						<label
							htmlFor='password'
							className='text-sm text-black font-medium'
						>
							Password
						</label>
						<input
							id='password'
							name='password'
							type='password'
							autoComplete={isLogin ? 'current-password' : 'new-password'}
							required
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder='Password'
							className='appearance-none rounded-1.5 w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
							disabled={isLoading}
						/>
					</div>
					{error && (
						<div className='text-red-600 text-sm -mt-2'>Error: {error}</div>
					)}
					<div>
						<button
							type='submit'
							className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-1.5 text-white ${
								isLoading
									? 'bg-indigo-400 cursor-not-allowed'
									: 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
							}`}
							disabled={isLoading}
						>
							{isLoading ? (
								<FiLoader className='animate-spin h-5 w-5 text-white' />
							) : isLogin ? (
								'Login'
							) : (
								'Sign Up'
							)}
						</button>
					</div>
				</form>
				<div className='text-center'>
					<button
						type='button'
						onClick={handleToggle}
						className='text-sm font-medium text-indigo-600 hover:text-indigo-800 transition duration-150 ease-in-out'
						disabled={isLoading}
					>
						{isLogin
							? "Don't have an account? Sign up"
							: 'Already have an account? Login'}
					</button>
				</div>
			</div>
		</div>
	);
}
