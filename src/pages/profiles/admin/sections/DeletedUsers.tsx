import  { useEffect, useState } from "react";
import {
  FaCheckCircle,
  FaClock,
  FaUndo,
  FaUsersSlash,
  FaUserAltSlash,
  FaSyncAlt,
} from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";
import axiosInstance from "../../../../lib/axiosInstance";

const DeletedUsers = () => {
  const [deletedUsers, setDeletedUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [actionInProgressId, setActionInProgressId] = useState<string | null>(
    null
  );
  const [refreshing, setRefreshing] = useState(false);

  const loadDeletedAccounts = async () => {
    setRefreshing(true);
    setIsLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get("/admin/getDeletedAccounts");
      const users = response.data?.deletedAccounts || [];
      setDeletedUsers(users);
      setStatusMessage(
        users.length
          ? `Loaded ${users.length} deleted account${
              users.length > 1 ? "s" : ""
            }.`
          : "No deleted accounts found."
      );
    } catch (err: any) {
      console.error("Fetch error:", err);
      setError(
        err.response?.data?.message || "Failed to fetch deleted accounts."
      );
      setDeletedUsers([]);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadDeletedAccounts();
  }, []);

  const handleUndoDelete = async (id: string) => {
    const confirm = window.confirm(
      "Are you sure you want to restore this user's account?"
    );
    if (!confirm) return;

    setActionInProgressId(id);
    setError(null);

    try {
      const res = await axiosInstance.put(`/admin/undoDelete/${id}`);
      if (res.data?.success) {
        setStatusMessage("✅ Account restored successfully!");
        setDeletedUsers((prev) => prev.filter((u) => u._id !== id));
      } else {
        setError(res.data?.message || "Failed to restore account.");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to restore account.");
    } finally {
      setActionInProgressId(null);
    }
  };

  return (
    <div className="p-4 md:p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-3">
          <FaUsersSlash className="text-red-600" />
          Deleted User Accounts
        </h1>
        <button
          onClick={loadDeletedAccounts}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-transform disabled:opacity-50"
        >
          <FaSyncAlt
            className={`transition-transform ${
              refreshing ? "animate-spin" : ""
            }`}
          />
          {refreshing ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {(error || statusMessage) && (
        <div
          className={`p-4 mb-6 rounded-lg border flex items-center text-sm ${
            error
              ? "bg-red-50 text-red-700 border-red-300"
              : "bg-green-50 text-green-700 border-green-300"
          }`}
        >
          {error ? (
            <IoIosWarning className="w-5 h-5 mr-2" />
          ) : (
            <FaCheckCircle className="w-5 h-5 mr-2" />
          )}
          {error || statusMessage}
        </div>
      )}

      {isLoading && (
        <div className="text-center py-20 text-gray-600 text-lg flex justify-center items-center">
          <FaClock className="animate-spin mr-3 text-blue-500" /> Loading
          deleted accounts...
        </div>
      )}

      {!isLoading && deletedUsers.length === 0 && !error && (
        <div className="text-center py-20 bg-white rounded-xl shadow-md border border-gray-200">
          <FaUserAltSlash className="mx-auto text-4xl text-gray-400 mb-3" />
          <p className="text-gray-600 text-lg">
            No deleted accounts right now 🎉
          </p>
        </div>
      )}

      {!isLoading && deletedUsers.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {deletedUsers.map((user) => (
            <div
              key={user._id}
              className="bg-white p-5 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 bg-red-100 text-red-600 flex items-center justify-center rounded-full font-bold">
                  {user.name?.charAt(0).toUpperCase() || "U"}
                </div>
                <div>
                  <h2 className="font-semibold text-gray-800 text-base">
                    {user.name || "Unnamed"}
                  </h2>
                  <p className="text-sm text-red-600">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm mb-3">
                <p className="text-gray-500 font-mono text-xs">
                  ID: {user._id.slice(0, 8)}...
                </p>
                <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full font-medium">
                  Deleted
                </span>
              </div>

              <button
                onClick={() => handleUndoDelete(user._id)}
                disabled={actionInProgressId === user._id}
                className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
                  actionInProgressId === user._id
                    ? "bg-blue-300 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                }`}
              >
                {actionInProgressId === user._id ? (
                  <>
                    <FaClock className="animate-spin" /> Restoring...
                  </>
                ) : (
                  <>
                    <FaUndo /> Restore
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DeletedUsers;
