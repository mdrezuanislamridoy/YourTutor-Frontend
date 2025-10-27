import  { useEffect, useState } from "react";
import Admin from "./admin/Admin";
import { UserStore } from "../../store/user.store";
import Student from "./student/Student";

export default function Profile() {
  const { profile, user } = UserStore();
  const [loading, setLoading] = useState(true);

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
      case "student":
        return <Student />;
      case "mentor":
        return <div>Mentor</div>;
      default:
        return <Admin />;
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Page />
    </div>
  );
}
