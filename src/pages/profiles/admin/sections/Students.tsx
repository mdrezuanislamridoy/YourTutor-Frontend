import React, { useEffect, useState } from "react";
import axiosInstance from "../../../../lib/axiosInstance";
import {
  FaLock,
  FaUnlock,
  FaClock,
  FaRedoAlt,
  FaCheckCircle,
} from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";
import Pagination from "../../../../components/Pagination";

export default function Students() {
  const [students, setStudents] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [actionInProgressId, setActionInProgressId] = useState<string | null>(
    null
  );

  const fetchStudents = async (pageNumber = 1, searchQuery = "") => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axiosInstance.get("/admin/students", {
        params: { page: pageNumber, limit: 10, search: searchQuery },
      });

      const data = res.data;
      setStudents(data.students || []);
      setTotalPages(data.totalPages || 1);
      setPage(data.currentPage || 1);
    } catch (error: any) {
      console.error(error);
      setError("Failed to fetch students. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    fetchStudents(1, value);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      fetchStudents(newPage, search);
    }
  };

  const handleBlockToggle = async (id: string, currentStatus: boolean) => {
    const action = currentStatus ? "unblock" : "block";
    const confirmAction = window.confirm(
      `Are you sure you want to ${action} this student?`
    );
    if (!confirmAction) return;

    setActionInProgressId(id);
    setError(null);
    setMessage(null);

    try {
      const res = await axiosInstance.put(`/admin/${action}/${id}`);
      if (res.data.success) {
        setMessage(`✅ Student ${action}ed successfully.`);
        await fetchStudents(page, search);
      } else {
        setError(`Failed to ${action} student. Try again.`);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || `Failed to ${action} student.`);
    } finally {
      setActionInProgressId(null);
    }
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      {/* Title + Refresh */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3 sm:mb-0">
          Student Management
        </h1>

        <button
          onClick={() => fetchStudents(page, search)}
          className="inline-flex items-center px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm transition"
        >
          <FaRedoAlt className="mr-2" /> Refresh
        </button>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="🔍 Search Students..."
        value={search}
        onChange={handleSearch}
        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-300 focus:outline-none bg-white shadow-sm"
      />

      {/* Message & Error */}
      {(error || message) && (
        <div
          className={`mt-4 p-4 rounded-lg ${
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

      {/* Loading */}
      {isLoading && (
        <div className="text-center py-12 text-blue-600 font-medium text-lg flex justify-center items-center">
          <FaClock className="animate-spin mr-3" /> Loading students...
        </div>
      )}

      {/* Table */}
      {!isLoading && students.length > 0 && (
        <div className="mt-6 bg-white rounded-xl shadow-lg border border-gray-200 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {students.map((student) => (
                <tr key={student._id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 whitespace-nowrap text-xs font-mono text-gray-500">
                    {student._id.substring(0, 8)}...
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                    {student.name || "N/A"}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                    {student.email}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-center">
                    {student.isBlocked ? (
                      <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        BLOCKED
                      </span>
                    ) : (
                      <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        ACTIVE
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-center text-sm font-medium">
                    <button
                      onClick={() =>
                        handleBlockToggle(student._id, student.isBlocked)
                      }
                      disabled={actionInProgressId === student._id}
                      className={`inline-flex items-center justify-center px-3 py-1 rounded-md text-white shadow-sm min-w-[110px] transition ${
                        student.isBlocked
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-red-600 hover:bg-red-700"
                      } disabled:opacity-50`}
                    >
                      {actionInProgressId === student._id ? (
                        student.isBlocked ? (
                          "Unblocking..."
                        ) : (
                          "Blocking..."
                        )
                      ) : (
                        <>
                          {student.isBlocked ? (
                            <>
                              <FaUnlock className="mr-2 hidden sm:inline" />{" "}
                              Unblock
                            </>
                          ) : (
                            <>
                              <FaLock className="mr-2 hidden sm:inline" /> Block
                            </>
                          )}
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

      {!isLoading && students.length === 0 && !error && (
        <div className="text-center py-12 bg-white rounded-lg shadow-md border border-gray-200 mt-6">
          <p className="text-lg text-gray-500">No students found.</p>
        </div>
      )}

      <Pagination
        totalPages={totalPages}
        handlePageChange={handlePageChange}
        pageNumber={page}
      />
    </div>
  );
}
