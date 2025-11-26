import { AnimatePresence } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Provider } from '@/components/ui/provider';
import { Landing } from './pages';
import NavBar from './components/Navbar';
import Adopt from './pages/Adopt';
import Wiki from './pages/Wiki';
import Account from './pages/Account';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
	const location = useLocation();
	const showNavbar =
		location.pathname !== '/login' && location.pathname !== '/signup';
	return (
		<>
			<Provider>
				<AnimatePresence>
					{showNavbar && <NavBar />}
					<Routes location={location} key={location.key}>
						<Route index element={<Landing />} />
						<Route path='/login' element={<Login />} />
						<Route path='/signup' element={<SignUp />} />
						<Route
							path='/wiki'
							element={
								<ProtectedRoute>
									<Wiki />
								</ProtectedRoute>
							}
						/>
						<Route
							path='/adopt'
							element={
								<ProtectedRoute>
									<Adopt />
								</ProtectedRoute>
							}
						/>
						<Route
							path='/account'
							element={
								<ProtectedRoute>
									<Account />
								</ProtectedRoute>
							}
						/>
					</Routes>
				</AnimatePresence>
			</Provider>
		</>
	);
}

export default App;
