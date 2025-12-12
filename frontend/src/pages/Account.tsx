import { useAuth } from '@/context/AuthContext';

const Account = () => {
	const { logout, name, username, isAdmin } = useAuth();
	return (
    <div className="min-h-screen w-screen flex flex-col gap-5 justify-center items-center p-6">
      <h1 className="text-5xl text-center font-semibold mt-8">Your Account</h1>
      <p>
        <span className="font-semibold">Full Name:</span> {name}
      </p>
      <p>
        <span className="font-semibold">Username:</span> {username}
      </p>
      <p>
        <span className="font-semibold">Is Admin:</span>{" "}
        {isAdmin ? "Yes" : "No"}
      </p>
      <button
        className="mt-8 px-10 py-3 pb-4 pl-11 text-lg font-semibold rounded-2 text-white bg-indigo-600 hover:bg-indigo-700 transition duration-200 shadow-xl transform hover:scale-[1.02] !font-pixel"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
};

export default Account;
