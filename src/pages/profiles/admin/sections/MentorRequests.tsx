// MentorRequests.tsx
import React, { useEffect, useState } from "react";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaUserGraduate,
} from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";
import { adminStore } from "../../../../store/admin.store";

interface MentorRequest {
  _id: string;
  name?: string;
  email?: string;
}

const MentorRequests: React.FC = () => {
  const { getRequestedMentors, approveMentor, rejectMentor, message } =
    adminStore();

  const [requests, setRequests] = useState<MentorRequest[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [actionInProgressId, setActionInProgressId] = useState<string | null>(
    null
  );

  const loadRequests = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await getRequestedMentors();
      // Handle common shapes safely
      const payload = res?.data ?? res;
      const reqs =
        Array.isArray(payload?.requests) && payload.requests
          ? payload.requests
          : Array.isArray(payload?.data)
          ? payload.data
          : Array.isArray(payload)
          ? payload
          : [];

      setRequests(reqs);
      setStatusMessage(
        reqs.length > 0
          ? `Loaded ${reqs.length} pending request${
              reqs.length > 1 ? "s" : ""
            }.`
          : "No pending mentor requests currently."
      );
    } catch (err: any) {
      console.error("Fetch error:", err);
      setError(
        err?.response?.data?.message || "Failed to fetch mentor requests."
      );
      setRequests([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (message) {
      setStatusMessage(message);
      const t = setTimeout(() => setStatusMessage(""), 5000);
      return () => clearTimeout(t);
    }
  }, [message]);

  const handleAction = async (id: string, actionType: "approve" | "reject") => {
    const confirmText =
      actionType === "approve"
        ? "Approve this mentor request?"
        : "Reject this mentor request?";
    if (!window.confirm(confirmText)) return;

    setActionInProgressId(id);
    setError(null);

    try {
      const result =
        actionType === "approve"
          ? await approveMentor(id)
          : await rejectMentor(id);

      // Accept both { success: true } or truthy result
      if (!result || result?.success === false) {
        throw new Error(result?.message || `Failed to ${actionType} mentor.`);
      }

      // remove from UI immediately
      setRequests((prev) => prev.filter((r) => r._id !== id));
      setStatusMessage(
        actionType === "approve" ? "Mentor approved." : "Mentor rejected."
      );
    } catch (err: any) {
      console.error(err);
      setError(err?.message || `Failed to ${actionType} mentor.`);
    } finally {
      setActionInProgressId(null);
    }
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
        <FaUserGraduate className="text-teal-600" />
        Pending Mentor Requests
      </h1>

      {/* status / error */}
      {(error || statusMessage) && (
        <div
          className={`p-3 mb-6 rounded-lg border text-sm ${
            error
              ? "bg-red-100 text-red-700 border-red-300"
              : "bg-green-100 text-green-700 border-green-300"
          }`}
        >
          <p className="flex items-center gap-2">
            {error ? <IoIosWarning /> : <FaCheckCircle />}
            {error || statusMessage}
          </p>
        </div>
      )}

      {/* loading */}
      {isLoading && (
        <div className="py-12 flex justify-center items-center text-teal-600 gap-3">
          <FaClock className="animate-spin" />
          <span>Loading pending requests...</span>
        </div>
      )}

      {/* empty */}
      {!isLoading && requests.length === 0 && !error && (
        <div className="py-12 bg-white rounded-lg shadow-sm border border-gray-200 text-center">
          <p className="text-gray-600 text-lg">
            🎉 No pending mentor requests.
          </p>
        </div>
      )}

      {/* list */}
      {!isLoading && requests.length > 0 && (
        <div className="space-y-4 max-w-4xl mx-auto">
          {requests.map((r) => (
            <article
              key={r._id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
            >
              {/* left: name & email stacked */}
              <div className="flex flex-col gap-0.5 min-w-0">
                <span className="text-sm font-medium text-gray-900 truncate">
                  {r.name ?? "No name"}
                </span>
                <a
                  href={`mailto:${r.email}`}
                  className="text-sm text-blue-600 truncate"
                  title={r.email}
                >
                  {r.email ?? "No email"}
                </a>
              </div>

              {/* right: actions (stack on mobile, inline on sm+) */}
              <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:ml-4 mt-2 sm:mt-0 w-full sm:w-auto">
                <button
                  onClick={() => handleAction(r._id, "approve")}
                  disabled={actionInProgressId === r._id}
                  className="w-full sm:w-auto px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 disabled:opacity-50 transition"
                >
                  {actionInProgressId === r._id ? "Approving..." : "Approve"}
                </button>

                <button
                  onClick={() => handleAction(r._id, "reject")}
                  disabled={actionInProgressId === r._id}
                  className="w-full sm:w-auto px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 disabled:opacity-50 transition"
                >
                  {actionInProgressId === r._id ? "Rejecting..." : "Reject"}
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default MentorRequests;
