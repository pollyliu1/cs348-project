import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import { Provider } from "@/components/ui/provider";
import { Landing } from "./pages";
import NavBar from "./components/Navbar";
import Adopt from "./pages/Adopt";
import Wiki from "./pages/Wiki";
import Account from "./pages/Account";
function App() {
  const location = useLocation();
  return (
    <>
      <Provider>
        <AnimatePresence>
          <NavBar />
          <Routes location={location} key={location.key}>
            <Route index element={<Landing />} />
            <Route path="/wiki" element={<Wiki />} />
            <Route path="/adopt" element={<Adopt />} />
            <Route path="/account" element={<Account />} />
          </Routes>
        </AnimatePresence>
      </Provider>
    </>
  );
}

export default App;
