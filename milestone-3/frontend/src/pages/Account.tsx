import { useAuth } from '@/context/AuthContext';

const Account = () => {
	const { logout } = useAuth();
	return (
		<div className='min-h-screen w-screen flex flex-col justify-center items-center p-6'>
			<button
				className='px-8 py-3 text-lg font-semibold rounded-2 text-white bg-indigo-600 hover:bg-indigo-700 transition duration-200 shadow-xl transform hover:scale-[1.02]'
				onClick={logout}
			>
				Logout
			</button>
		</div>
	);
};

export default Account;
