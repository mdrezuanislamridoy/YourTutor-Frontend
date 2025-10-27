import { useEffect, useState } from "react";
import { adminStore } from "../../../../store/admin.store";
import type { Mentor } from "../../../../types/user.type";

export default function RejectedMentors() {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);

  const { rejectedMentors }: any = adminStore();

  const loadMentors = async () => {
    try {
      const result = await rejectedMentors();

      setMentors(result.data.mentors);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMentors();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      {mentors.length > 0 ? (
        mentors.map((mentor: Mentor) => (
          <div key={mentor._id}>
            <p>{mentor.name}</p>
            <p>{mentor.email}</p>
          </div>
        ))
      ) : (
        <div>
          <p>No mentor is rejected</p>
        </div>
      )}
    </div>
  );
}
