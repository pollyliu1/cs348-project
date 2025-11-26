import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';

const Landing = () => {
	const navigate = useNavigate();
	const { isAuthenticated } = useAuth();

	const handleSignupRedirect = () => {
		navigate('/signup');
	};

	useEffect(() => {
		if (isAuthenticated) {
			navigate('/adopt', { replace: true });
		}
	}, [isAuthenticated, navigate]);

	return (
		<div className='min-h-screen w-screen flex flex-col justify-center items-center p-6'>
			<div className='max-w-4xl text-center space-y-8'>
				<h1 className='text-white font-display text-5xl sm:text-7xl font-extrabold leading-tight'>
					Adopt. Care. Evolve together.
				</h1>
				<p className='text-gray-300 text-xl'>
					Discover Pokémon who are ready for a fresh start. When you open your
					home and heart, you don’t just change their life—you evolve together.
				</p>
				<div className='flex justify-center space-x-4 pt-4'>
					<button
						onClick={handleSignupRedirect}
						className='px-8 py-3 text-lg font-semibold rounded-2 text-white bg-indigo-600 hover:bg-indigo-700 transition duration-200 shadow-xl transform hover:scale-[1.02]'
					>
						Start Adopting
					</button>
				</div>
			</div>
		</div>
	);
};

export default Landing;
