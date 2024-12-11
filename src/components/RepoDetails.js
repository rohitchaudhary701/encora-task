import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const RepoDetails = () => {
  const { name } = useParams();
  const [repo, setRepo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchRepoDetails = async () => {
      try {
        const response = await fetch(`https://api.github.com/repos/godaddy/${name}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setRepo(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRepoDetails();
  }, [name]);

  if (loading) {
    return (
      <div
        className="flex items-center justify-center min-h-screen"
      >
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-500 mt-10">
        {error}
      </p>
    );
  }

  return (
    <div className="max-w-24rem mt-7 mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-2xl text-left font-bold text-gray-800 p-4 bg-gray-200">{repo.name}</h1>
      <div className="p-6 text-left">
      <p className="text-gray-700 mb-2 border-b pb-2">
        <strong>Description:</strong> {repo.description || "No description available."}
      </p>
      <p className="text-gray-700 mb-2 border-b pb-2">
        <strong>Repo Link:</strong>{" "}
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          View on GitHub
        </a>
      </p>
      <p className="text-gray-700 mb-2 border-b pb-2">
        <strong>Language:</strong> {repo.language || "Not specified"}
      </p>
      <p className="text-gray-700 mb-2 border-b pb-2">
        <strong>Forks:</strong> {repo.forks_count}
      </p>
      <p className="text-gray-700 mb-2 border-b pb-2">
        <strong>Open Issues:</strong> {repo.open_issues_count}
      </p>
      <p className="text-gray-700 mb-2 border-b pb-2">
        <strong>Watchers:</strong> {repo.watchers_count}
      </p>
      <Link to="/" className="text-blue-600 hover:underline">
        Back to Repo List
      </Link>
      </div>
    </div>
  );
};

export default RepoDetails;
