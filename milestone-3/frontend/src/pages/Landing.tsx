import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';

const Landing = () => {
	const navigate = useNavigate();
	const { isAuthenticated, isSettingUp } = useAuth();

	const handleSignupRedirect = () => {
		navigate('/signup');
	};

	useEffect(() => {
		if (isAuthenticated && !isSettingUp) {
			navigate('/adopt', { replace: true });
		}
	}, [isAuthenticated, navigate]);

	return (
		<div
			className='overflow-none h-screen w-screen flex flex-col justify-center items-center p-6'
			style={{
				backgroundImage: `url("/src/assets/background.jpg")`,
				backgroundSize: 'cover',
			}}
		>
			<div className='max-w-4xl text-center space-y-8'>
				<h1 className='text-white font-display text-4xl sm:text-7xl font-semibold leading-tight'>
					Adopt. Care. Evolve together.
				</h1>
				<p className='text-gray-300 text-xl'>
					Discover Pokémon who are ready for a fresh start. When you open your
					home and heart, you don’t just change their life—you evolve together.
				</p>
				<div className='flex justify-center space-x-4 pt-4'>
					<button
						onClick={handleSignupRedirect}
						className='px-8 py-3 text-lg rounded-2 pb-3.5 pl-9 text-white ring-1 ring-white transition duration-200 transform hover:scale-[1.02] hover:text-indigo-400 hover:ring-indigo-400 !font-pixel'
					>
						Start Adopting
					</button>
				</div>
			</div>
		</div>
	);
};

export default Landing;
