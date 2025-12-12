import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.png';

const NavBar = () => {
	const nav = useNavigate();
	const { isAuthenticated } = useAuth();
	const location = useLocation();
	const isLanding = location.pathname === '/';
	console.log(isLanding);
	return (
		<div
			className={`flex flex-col fixed top-0 left-0 z-50 w-screen ${isLanding ? '' : 'bg-slate-900'}`}
		>
			<div className='z-30 flex justify-between items-center px-6 py-4'>
				<div
					className='text-2xl text-white font-semibold font-display mb-1 cursor-pointer hover:text-indigo-400 transition'
					onClick={() => nav('/')}
				>
					<img src={logo} alt='Logo' className='h-12 w-auto' />
				</div>
				<div className='flex items-center justify-center gap-6 *:text-white *:font-display *:font-medium text-md *:cursor-pointer'>
					{isAuthenticated ? (
						<>
							<h2
								onClick={() => nav('/adopt')}
								className='hover:text-indigo-400 transition !font-pixel text-sm'
							>
								Adopt
							</h2>
							<h2
								onClick={() => nav('/wiki')}
								className='hover:text-indigo-400 transition !font-pixel text-sm'
							>
								Wiki
							</h2>

							<h2
								onClick={() => nav('/account')}
								className='hover:text-indigo-400 transition !font-pixel text-sm'
							>
								Account
							</h2>
						</>
					) : (
						<>
							<h2
								onClick={() => nav('/login')}
								className='p-1 text-sm text-white hover:text-indigo-400 transition !font-pixel '
							>
								Login
							</h2>
							<h2
								onClick={() => nav('/signup')}
								className='px-6 py-2 pb-2.5 pl-8 text-sm border-white border rounded-2 text-white hover:text-indigo-400 hover:border-indigo-400  !font-pixel transition'
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
