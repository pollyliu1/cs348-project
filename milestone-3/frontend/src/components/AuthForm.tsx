import { useState, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLoader } from 'react-icons/fi';
import { useAuth } from '@/context/AuthContext';

interface AuthFormProps {
	isLogin: boolean;
	onSignupSuccess?: () => void;
}

export default function AuthForm({ isLogin }: AuthFormProps) {
	const [name, setName] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const { login, isAuthenticated, isSettingUp, setIsSettingUp } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (isAuthenticated && !isSettingUp) {
			navigate('/adopt', { replace: true });
		}
	}, [isAuthenticated, isSettingUp, navigate]);

	const handleToggle = () => {
		const targetPath = isLogin ? '/signup' : '/login';
		navigate(targetPath);
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		// api call to authenticate/create user
		// if isLogin then authenticate use otherwise call endpoint to create new user with name, username and password
		// call auth context login function with user id
		// also set any error strings on error
		const url = isLogin ? `/api/login` : `/api/create-account`;
		setIsLoading(true);
		try {
			const response = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ name, username: username, password }),
			});

			if (!response.ok) {
				console.log('error is: ', await response.json());
				// setError(await response.text());
			}

			const res = await response.json();
			console.log('uid is ', res['uid']);

			login(res['uid']);

			// navigate to adopt if signin successful
			if (isLogin) {
				navigate('/adopt');
			} else {
				setIsSettingUp(true);
			}
		} catch (err: any) {
			setError(err.toString());
		} finally {
			setIsLoading(false);
		}
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
							<label
								htmlFor='name'
								className='text-sm text-gray-900 font-medium'
							>
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
								className='bg-white appearance-none rounded-1.5 w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
								disabled={isLoading}
							/>
						</div>
					)}
					<div className='flex flex-col gap-1'>
						<label
							htmlFor='username'
							className='text-sm text-gray-900 font-medium'
						>
							Username
						</label>
						<input
							id='username'
							name='username'
							type='username'
							autoComplete='username'
							required
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							placeholder='Username'
							className='bg-white appearance-none rounded-1.5 w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
							disabled={isLoading}
						/>
					</div>
					<div className='flex flex-col gap-1'>
						<label
							htmlFor='password'
							className='text-sm text-gray-900 font-medium'
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
							className='bg-white appearance-none rounded-1.5 w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
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
