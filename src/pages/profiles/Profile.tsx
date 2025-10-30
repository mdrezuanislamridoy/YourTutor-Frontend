import { useEffect, useState } from "react";
import { UserStore } from "../../store/user.store";
import Student from "./student/Student";
import { Loader2 } from "lucide-react";
import Admin from "./admin/Admin";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { profile, user } = UserStore();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        await profile();
      } catch (error) {
        console.log("Failed to fetch profile", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [loading, user, navigate]);

  const Page = () => {
    switch (user?.role) {
      case "admin":
        return <Admin />;
      case "mentor":
        return <div>Mentor</div>;
      default:
        return <Student />;
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[80vh] justify-center items-center">
        <Loader2 className="w-8 h-8 text-teal-500 animate-spin" />
      </div>
    );
  }

  return <Page />;
}
