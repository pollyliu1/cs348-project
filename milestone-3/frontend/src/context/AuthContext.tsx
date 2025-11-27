import { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
	isAuthenticated: boolean;
	isSettingUp: boolean;
	isAdmin: boolean;
	userId: string | null;
	name: string | null;
	username: string | null;
	login: (id: string, isAdmin: boolean, name?: string | null, username?: string | null) => void;
	logout: () => void;
	setName: (v: string | null) => void;
	setUsername: (v: string | null) => void;
	setIsSettingUp: (v: boolean) => void;
	setIsAdmin: (v: boolean) => void;
}

const AuthContext = createContext<AuthContextType>({
	isAuthenticated: false,
	isSettingUp: false,
	isAdmin: false,
	userId: null,
	name: null,
	username: null,
	login: () => {},
	logout: () => {},
	setName: () => {},
	setUsername: () => {},
	setIsSettingUp: () => {},
	setIsAdmin: () => {},
});

// Function to initialize state from Local Storage
const getInitialState = () => {
	const storedUserId = localStorage.getItem('userId');
	const storedRole = localStorage.getItem('role');
	const storedName = localStorage.getItem('name');
	const storedUsername = localStorage.getItem('username');
	return {
		isAuthenticated: !!storedUserId, // true if userId exists
		isSettingUp: false,
		isAdmin: storedRole == "admin",
		userId: storedUserId || null,
		name: storedName || null,
		username: storedUsername || null,
	};
};

interface AuthProviderProps {
	children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [authState, setAuthState] = useState(getInitialState);

 	const login = (id: string, isAdmin: boolean, name?: string | null, username?: string | null) => {
 		setAuthState((prev) => ({
 			...prev,
 			isAuthenticated: true,
 			userId: id,
			isAdmin,
 			name: name ?? prev.name,
 			username: username ?? prev.username,
 		}));
 		localStorage.setItem('userId', id);
		localStorage.setItem('role', isAdmin ? "admin" : "adopter");
 		if (name) localStorage.setItem('name', name);
 		if (username) localStorage.setItem('username', username);
 	};

 	const logout = () => {
 		setAuthState({
 			isAuthenticated: false,
 			isSettingUp: false,
 			userId: null,
 			name: null,
 			username: null,
 			isAdmin: false,
 		});
 		localStorage.removeItem('userId');
 		localStorage.removeItem('name');
 		localStorage.removeItem('username');
 	};

	const setName = (value: string | null) => {
		setAuthState((prev) => ({ ...prev, name: value }));
		if (value === null) localStorage.removeItem('name');
		else localStorage.setItem('name', value);
	};

	const setUsername = (value: string | null) => {
		setAuthState((prev) => ({ ...prev, username: value }));
		if (value === null) localStorage.removeItem('username');
		else localStorage.setItem('username', value);
		localStorage.removeItem('role');
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
		setName,
		setUsername,
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
