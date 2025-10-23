import React from "react";
import Admin from "./admin/Admin";

export default function Profile({ user }) {
  const Page = () => {
    switch (user.role) {
      case "student":
        return <div>Student</div>;
      case "mentor":
        return <div>Mentor</div>;
      default:
        return <Admin />;
    }
  };

  return (
    <div>
      <Page />
    </div>
  );
}
