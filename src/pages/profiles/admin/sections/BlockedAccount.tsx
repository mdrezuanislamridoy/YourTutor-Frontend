import React, { useEffect, useState } from "react";
import {
  FaUnlock,
  FaLock,
  FaClock,
  FaCheckCircle,
  FaSyncAlt,
} from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";
import axiosInstance from "../../../../lib/axiosInstance";

const BlockedAccounts = () => {
  const [blockedUsers, setBlockedUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [actionInProgressId, setActionInProgressId] = useState<string | null>(
    null
  );
  const [refreshing, setRefreshing] = useState(false);

  const loadBlockedAccounts = async () => {
    setIsLoading(true);
    setError(null);
    setMessage(null);
    try {
      const res = await axiosInstance.get("/admin/blockedAccount");
      const users = res?.data?.blockedAccounts || [];
      setBlockedUsers(users);
      if (users.length === 0) {
        setMessage("✅ All clear! No accounts are currently blocked.");
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Failed to fetch blocked accounts."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadBlockedAccounts();
  }, []);

  const handleUnblock = async (id: string) => {
    const confirmUnblock = window.confirm(
      "Are you sure you want to unblock this user's account?"
    );
    if (!confirmUnblock) return;

    setActionInProgressId(id);
    setError(null);
    setMessage(null);

    try {
      const res = await axiosInstance.put(`/admin/unblock/${id}`);
      if (res.data.success) {
        setMessage("✅ User unblocked successfully!");
        await loadBlockedAccounts();
      } else {
        setError("Failed to unblock user. Try again.");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to unblock user.");
    } finally {
      setActionInProgressId(null);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadBlockedAccounts();
    setTimeout(() => setRefreshing(false), 800);
  };

  return (
    <div className="p-4 md:p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen animate-fadeIn">

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-3">
          <FaLock className="text-red-500" />
          Blocked User Accounts
        </h1>

  
        <button
          onClick={handleRefresh}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-transform disabled:opacity-50"
          disabled={refreshing}
        >
          <FaSyncAlt
            className={`transition-transform ${
              refreshing ? "animate-spin" : ""
            }`}
          />
          {refreshing ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {/* Status / Error Message */}
      {(error || message) && (
        <div
          className={`p-4 mb-6 rounded-lg transition-all duration-300 ${
            error
              ? "bg-red-100 text-red-700 border border-red-300"
              : "bg-green-100 text-green-700 border border-green-300"
          }`}
        >
          <p className="flex items-center font-medium">
            {error ? (
              <IoIosWarning className="w-5 h-5 mr-2" />
            ) : (
              <FaCheckCircle className="w-5 h-5 mr-2" />
            )}
            {error || message}
          </p>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-16 text-gray-600">
          <FaClock className="animate-spin text-teal-600 mb-3 text-3xl" />
          <p className="text-lg font-medium">Loading blocked accounts...</p>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && blockedUsers.length === 0 && !error && (
        <div className="text-center py-12 bg-white rounded-xl shadow-md border border-gray-200">
          <p className="text-xl text-gray-500 font-medium">
            ✅ All clear! No accounts are currently blocked.
          </p>
        </div>
      )}

      {/* Blocked Users Table */}
      {!isLoading && blockedUsers.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-x-auto animate-fadeInUp">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                {["User ID", "Name", "Email", "Status", "Action"].map(
                  (header) => (
                    <th
                      key={header}
                      className={`px-4 py-3 text-xs font-semibold text-gray-600 uppercase ${
                        header === "Action" ? "text-center" : "text-left"
                      }`}
                    >
                      {header}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {blockedUsers.map((user, index) => (
                <tr
                  key={user._id}
                  className={`hover:bg-gray-50 transition ${
                    index % 2 === 0 ? "bg-gray-50/50" : ""
                  }`}
                >
                  <td className="px-4 py-3 text-xs font-mono text-gray-500">
                    {user._id.substring(0, 8)}...
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    {user.name || "N/A"}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {user.email}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span className="px-2 py-1 inline-flex text-xs font-semibold rounded-full bg-red-100 text-red-700">
                      BLOCKED
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleUnblock(user._id)}
                      disabled={actionInProgressId === user._id}
                      className="inline-flex items-center justify-center px-4 py-1.5 text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-105 hover:shadow-md transition disabled:opacity-50 min-w-[110px]"
                    >
                      {actionInProgressId === user._id ? (
                        "Unblocking..."
                      ) : (
                        <>
                          <FaUnlock className="mr-2 hidden sm:inline" /> Unblock
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BlockedAccounts;
