import { useState } from "react";
import UserProfile from "./UserProfile";
import conf from "./conf";

const Search = () => {
  const [course, setCourse] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [noResults, setNoResults] = useState(false);

  const handleSearch = async () => {
    if (!course.trim()) return;
    const response = await fetch(
      `${conf.apiUrl}/api/users/search?course=${course}`
    );
    const data = await response.json();

    setSearchResults(data);
    setNoResults(data.length === 0);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 text-center max-w-md w-full relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-500 opacity-50 rounded-lg"></div>
        <div className="relative z-10">
          <h2 className="text-xl font-bold mb-4">Search Courses</h2>
          <input
            type="text"
            value={course}
            onChange={(e) => {
              setCourse(e.target.value);
              if (e.target.value.length === 1) {
                setSearchResults([]);
                setNoResults(false);
              }
            }}
            onKeyPress={handleKeyPress}
            placeholder="Enter course code"
            className="border border-gray-300 rounded p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="w-full bg-blue-500 text-white rounded p-2 hover:bg-blue-600 transition duration-200"
          >
            Search
          </button>
          {searchResults.length > 0 ? (
            <div className="mt-5">
              <h3 className="text-lg font-semibold">Search Results:</h3>
              {searchResults.map((result) => (
                <UserProfile
                  key={result._id}
                  user={result}
                  searchedCourse={course}
                />
              ))}
            </div>
          ) : (
            course.trim().length > 0 &&
            noResults && <p className="mt-5 text-red-600">No results found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
