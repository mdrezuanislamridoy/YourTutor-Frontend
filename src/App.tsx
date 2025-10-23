import { useEffect } from "react";
import HomePage from "./pages/home/HomePage";
import { UserStore } from "./store/user.store";
import { Navigate, Route, Routes } from "react-router-dom";
import Auth from "./pages/auth/Auth";
import Navbar from "./components/Navbar";
import Profile from "./pages/profiles/Profile";

export default function App() {
  const { profile, user } = UserStore();

  useEffect(() => {
    const fetchUser = async () => {
      await profile();
    };
    fetchUser();
  }, []);

  return (
    <>
      <Navbar bgColor="bg-cyan-500" />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={user ? <Navigate to={"/"} /> : <Auth />} />
        <Route
          path="/profile"
          element={user ? <Profile user={user} /> : <Navigate to={"/auth"} />}
        />
      </Routes>
    </>
  );
}
