import { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
	isAuthenticated: boolean;
	isSettingUp: boolean;
	isAdmin: boolean;
	userId: string | null;
	login: (id: string) => void;
	logout: () => void;
	setIsSettingUp: (v: boolean) => void;
	setIsAdmin: (v: boolean) => void;
}

const AuthContext = createContext<AuthContextType>({
	isAuthenticated: false,
	isSettingUp: false,
	isAdmin: false,
	userId: null,
	login: () => {},
	logout: () => {},
	setIsSettingUp: () => {},
	setIsAdmin: () => {},
});

// Function to initialize state from Local Storage
const getInitialState = () => {
	const storedUserId = localStorage.getItem('userId');
	return {
		isAuthenticated: !!storedUserId, // true if userId exists
		isSettingUp: false,
		isAdmin: false,
		userId: storedUserId || null,
	};
};

interface AuthProviderProps {
	children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [authState, setAuthState] = useState(getInitialState);

	const login = (id: string) => {
		setAuthState((prev) => ({
			...prev,
			isAuthenticated: true,
			userId: id,
		}));
		localStorage.setItem('userId', id);
	};

	const logout = () => {
		setAuthState({
			isAuthenticated: false,
			isSettingUp: false,
			userId: null,
			isAdmin: false,
		});
		localStorage.removeItem('userId');
	};

	const setIsSettingUp = (value: boolean) => {
		setAuthState((prev) => ({
			...prev,
			isSettingUp: value,
		}));
	};

	const setIsAdmin = (value: boolean) => {
		setAuthState((prev) => ({
			...prev,
			isAdmin: value,
		}));
	};

	const contextValue = {
		...authState,
		setIsSettingUp,
		setIsAdmin,
		login,
		logout,
	};

	return (
		<AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
	);
};

export const useAuth = () => {
	return useContext(AuthContext);
};
