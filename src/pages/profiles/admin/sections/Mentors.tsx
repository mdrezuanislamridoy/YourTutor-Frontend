import React, { useEffect, useState } from "react";
import axiosInstance from "../../../../lib/axiosInstance";
import Pagination from "../../../../components/Pagination";

export default function Mentors() {
  const [mentors, setMentors] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [confirmAction, setConfirmAction] = useState<{
    id: string;
    type: "block" | "delete";
  } | null>(null);

  const [loadingInHandle, setLoadingInHanlde] = useState(false);

  const fetchMentors = async (pageNumber = 1, searchQuery = "") => {
    try {
      const res = await axiosInstance.get("/admin/mentors", {
        params: { page: pageNumber, limit: 10, search: searchQuery },
      });
      const data = res.data;
      setMentors(data.mentors || []);
      setTotalPages(data.totalPages || 1);
      setPage(data.currentPage || 1);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMentors();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    fetchMentors(1, value);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      fetchMentors(newPage, search);
    }
  };

  const handleBlock = async (id: string) => {
    setLoadingInHanlde(true);
    try {
      await axiosInstance.put(`/admin/block/${id}`);
      fetchMentors(page, search);
      setConfirmAction(null);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingInHanlde(false);
    }
  };

  const handleDelete = async (id: string) => {
    setLoadingInHanlde(true);
    try {
      await axiosInstance.put(`/admin/delete/${id}`);
      fetchMentors(page, search);
      setConfirmAction(null);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingInHanlde(false);
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <input
        type="text"
        placeholder="Search mentors..."
        value={search}
        onChange={handleSearch}
        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-blue-200"
      />

      <div className="mt-4 space-y-3">
        {mentors.length > 0 ? (
          mentors.map((mentor: any) => (
            <div
              key={mentor._id}
              className="p-3 border rounded-md bg-white shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-semibold">{mentor.name}</p>
                <p className="text-gray-500 text-sm">{mentor.email}</p>
              </div>

              <div className="flex gap-2 mt-2 sm:mt-0">
                <button
                  className={`px-3 py-1 rounded-lg text-white ${
                    mentor.isBlocked
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-500 hover:bg-red-600"
                  }`}
                  disabled={mentor.isBlocked}
                  onClick={() =>
                    setConfirmAction({ id: mentor._id, type: "block" })
                  }
                >
                  {mentor.isBlocked ? "Blocked" : "Block"}
                </button>

                <button
                  className="bg-gray-800 hover:bg-black text-white px-3 py-1 rounded-lg"
                  onClick={() =>
                    setConfirmAction({ id: mentor._id, type: "delete" })
                  }
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No mentors found</p>
        )}
      </div>

      <Pagination
        totalPages={totalPages}
        handlePageChange={handlePageChange}
        pageNumber={page}
      />

      {confirmAction && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] sm:w-96">
            <p className="mb-4 text-gray-700 text-center">
              Are you sure you want to{" "}
              <span className="font-semibold text-red-600">
                {confirmAction.type === "block" ? "block" : "delete"}
              </span>{" "}
              this mentor?
            </p>
            <div className="flex justify-end gap-3">
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
                onClick={() =>
                  confirmAction.type === "block"
                    ? handleBlock(confirmAction.id)
                    : handleDelete(confirmAction.id)
                }
              >
                {loadingInHandle ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Please wait...</span>
                  </div>
                ) : confirmAction.type === "block" ? (
                  "Block"
                ) : (
                  "Delete"
                )}
              </button>
              <button
                className="bg-gray-300 hover:bg-gray-400 px-3 py-1 rounded-lg"
                onClick={() => setConfirmAction(null)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
