import React, { useEffect, useState } from "react";
import { adminStore } from "../../../../store/admin.store";

export default function RejectedMentors() {
  const [mentors, setMentors] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const { rejectedMentors } = adminStore();

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
        mentors.map((mentor) => (
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
