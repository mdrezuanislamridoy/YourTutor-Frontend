import React, { useEffect, useState } from "react";
import axiosInstance from "../../../../lib/axiosInstance";

export default function Mentors() {
  const [mentors, setMentors] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

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
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No mentors found</p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          <span className="text-gray-700">
            Page {page} of {totalPages}
          </span>

          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
