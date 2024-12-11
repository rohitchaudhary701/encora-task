import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const RepoList = () => {
  const [repos, setRepos] = useState([]);
  const [filteredRepos, setFilteredRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRepoList = async () => {
      try {
        const response = await fetch("https://api.github.com/orgs/godaddy/repos");
        if (!response.ok) {
          throw new Error("Failed to fetch repositories");
        }
        const data = await response.json();
        setRepos(data);
        setFilteredRepos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRepoList();
  }, []);

  const findRepos = (searchKey) => {
    const filterRepos = repos.filter((repo) =>
      repo.name.toLowerCase().includes(searchKey.toLowerCase())
    );
    setFilteredRepos(filterRepos);
  };

  if (loading) {
    return (
      <div
        className="flex items-center justify-center min-h-screen"
        aria-live="polite"
      >
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
        <span className="sr-only">Loading repositories...</span>
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-500 mt-10" aria-live="assertive">
        {error}
      </p>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg mb-8">
      <h1 className="text-2xl p-6 text-gray-800 flex items-center justify-center">
        GitHub Repositories{" "}
        <span className="repo-length ml-2 text-blue-600">
          ({filteredRepos.length})
        </span>
      </h1>
      <input
        type="text"
        className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Search repositories"
        onChange={(e) => findRepos(e.target.value)}
      />
      <ul className="divide-y divide-gray-200">
        {filteredRepos.length > 0 ? (
          filteredRepos.map((repo, index) => (
            <li
              key={repo.id}
              className={`px-4 py-2 text-left ${
                index % 2 === 0 ? "bg-gray-100" : "bg-white"
              } hover:bg-gray-50`}
              tabIndex={0}
            >
              <span className="pr-2">{index + 1}.</span>
              <Link
                to={`/repo/${repo.name}`}
                className="text-md text-blue-600 hover:underline"
              >
                {repo.name}
              </Link>{" "}
              <span className="text-sm text-gray-500">
                (Forks: {repo.forks_count})
              </span>
            </li>
          ))
        ) : (
          <p className="text-left px-4 text-red-500 py-4">
            No repositories found
          </p>
        )}
      </ul>
    </div>
  );
};

export default RepoList;
