import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NavBar = () => {
	const nav = useNavigate();
	const { isAuthenticated } = useAuth();

	return (
		<div className='flex flex-col fixed top-0 left-0 z-50 w-screen bg-gray-900/90 shadow-lg'>
			<div className='z-30 flex justify-between items-center px-6 py-4'>
				<h1
					className='text-4xl text-white font-semibold font-display mb-1 cursor-pointer hover:text-indigo-400 transition'
					onClick={() => nav('/')}
				>
					Adopt-A-Mon
				</h1>
				<div className='flex items-center justify-center gap-4 *:text-white *:font-display *:font-medium text-md *:cursor-pointer'>
					{isAuthenticated ? (
						<>
							<h2
								onClick={() => nav('/wiki')}
								className='hover:text-indigo-400 transition'
							>
								Wiki
							</h2>
							<h2
								onClick={() => nav('/adopt')}
								className='hover:text-indigo-400 transition'
							>
								Adopt
							</h2>
							<h2
								onClick={() => nav('/account')}
								className='hover:text-indigo-400 transition'
							>
								Account
							</h2>
						</>
					) : (
						<>
							<h2
								onClick={() => nav('/login')}
								className='px-4 py-1 text-md text-white hover:text-white/80 transition'
							>
								Login
							</h2>
							<h2
								onClick={() => nav('/signup')}
								className='px-4 py-2 text-md border-white border rounded-2 text-white hover:text-white/80 hover:border-white/80 transition'
							>
								Sign Up
							</h2>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default NavBar;
