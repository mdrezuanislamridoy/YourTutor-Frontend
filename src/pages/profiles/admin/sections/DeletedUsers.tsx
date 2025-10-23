import React, { useEffect, useState } from "react";

import {
  FaCheckCircle,
  FaClock,
  FaUndo,
  FaUsersSlash,
} from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";
import { adminStore } from "../../../../store/admin.store";

const DeletedUsers = () => {
  const { getDeletedAcc, undoDelete, message } = adminStore();

  const [deletedUsers, setDeletedUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [actionInProgressId, setActionInProgressId] = useState(null);

  const loadDeletedAccounts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getDeletedAcc();
      if (response && response.data && response.data.deletedAccounts) {
        setDeletedUsers(response.data.deletedAccounts);
        setStatusMessage(
          `Successfully loaded ${response.data.deletedAccounts.length} deleted accounts.`
        );
      } else {
        setDeletedUsers([]);
        setStatusMessage("No deleted accounts found.");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError(
        err.response?.data?.message || "Failed to fetch deleted accounts."
      );
      setDeletedUsers([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDeletedAccounts();
  }, []);

  useEffect(() => {
    if (message) {
      setStatusMessage(message);

      if (actionInProgressId) {
        setTimeout(() => {
          loadDeletedAccounts();
          setActionInProgressId(null);
        }, 1000);
      }

      const timer = setTimeout(() => {
        setStatusMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleUndoDelete = async (id) => {
    if (
      window.confirm("Are you sure you want to restore this user's account?")
    ) {
      setActionInProgressId(id);
      setError(null);

      const result = await undoDelete(id);

      if (!result || !result.success) {
        setError(result?.message || `Failed to undo deletion.`);
        setActionInProgressId(null);
      }
    }
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 flex items-center">
        <FaUsersSlash className="mr-3 text-red-600" />
        Deleted User Accounts
      </h1>

      {(error || statusMessage) && (
        <div
          className={`p-4 mb-4 rounded-lg ${
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
            {error || statusMessage}
          </p>
        </div>
      )}

      {isLoading && (
        <div className="text-center py-12 text-teal-600 font-medium text-lg flex justify-center items-center">
          <FaClock className="animate-spin mr-3" /> Loading deleted accounts...
        </div>
      )}

      {!isLoading && deletedUsers.length === 0 && !error && (
        <div className="text-center py-12 bg-white rounded-lg shadow-md border border-gray-200">
          <p className="text-xl text-gray-500">
            ✅ No deleted accounts currently.
          </p>
        </div>
      )}

      {!isLoading && deletedUsers.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {deletedUsers.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap text-xs font-mono text-gray-500">
                    {user._id.substring(0, 8)}...
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                    {user.name || "N/A"}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-red-600">
                    {user.email}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                      DELETED
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-center text-sm font-medium">
                    <button
                      onClick={() => handleUndoDelete(user._id)}
                      disabled={actionInProgressId === user._id}
                      className="inline-flex items-center justify-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition min-w-[100px]"
                    >
                      {actionInProgressId === user._id ? (
                        "Restoring..."
                      ) : (
                        <>
                          <FaUndo className="mr-2 hidden sm:inline" /> Restore
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

export default DeletedUsers;
