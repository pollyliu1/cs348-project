import AuthForm from '../components/AuthForm';
import ProfileSetupForm from '@/components/ProfileSetupForm';
import { useAuth } from '@/context/AuthContext';

const SignUp = () => {
	const { isSettingUp } = useAuth();
	return (
		<>
			{!isSettingUp ? (
				<AuthForm isLogin={false} />
			) : (
				<ProfileSetupForm />
			)}
		</>
	);
};

export default SignUp;
