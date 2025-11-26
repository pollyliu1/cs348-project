import { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
	isAuthenticated: boolean;
	userId: string | null; // <-- Correct type: string OR null
	login: (id: string) => void;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
	isAuthenticated: false,
	userId: null,
	login: () => {},
	logout: () => {},
});

// Function to initialize state from Local Storage
const getInitialState = () => {
	const storedUserId = localStorage.getItem('userId');
	return {
		isAuthenticated: !!storedUserId, // true if userId exists
		userId: storedUserId || null,
	};
};

interface AuthProviderProps {
	children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [authState, setAuthState] = useState(getInitialState);

	const login = (id: string) => {
		setAuthState({
			isAuthenticated: true,
			userId: id,
		});
		localStorage.setItem('userId', id);
	};

	const logout = () => {
		setAuthState({
			isAuthenticated: false,
			userId: null,
		});
		localStorage.removeItem('userId');
	};

	const contextValue = {
		...authState,
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
