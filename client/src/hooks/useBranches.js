import { useState, useEffect } from "react";

const useBranches = () => {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/updatebranch`);
        if (!response.ok) throw new Error("Failed to fetch branches");
        const data = await response.json();
        setBranches(data);
      } catch (err) {
        setError(err.message || "An error occurred while fetching branches");
      } finally {
        setLoading(false);
      }
    };

    fetchBranches();
  }, []);

  return { branches, loading, error };
};

export default useBranches;
