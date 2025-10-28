import { useEffect, useState } from "react";
import { UserStore } from "../../store/user.store";
import Student from "./student/Student";
import { Loader2 } from "lucide-react";
import Admin from "./admin/Admin";

export default function Profile() {
  const { profile, user } = UserStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const fetchProfile = async () => {
        await profile();
      };
      fetchProfile();
    } catch (error: any) {
      console.log("Failed to fetch profile ", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    try {
      const fetchUser = async () => {
        await profile();
        setLoading(false);
      };
      fetchUser();
    } catch (error) {
      console.log(error);
    } finally {
      if (loading) {
        setLoading(false);
      }
    }
  }, []);

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
      <div className="flex min-h-screen justify-center items-center">
        <Loader2 className="w-8 h-8 text-teal-500 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <Page />
    </div>
  );
}
