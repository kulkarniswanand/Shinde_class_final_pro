// src/hooks/useBranches.js
import { useEffect, useState } from "react";

const useBranches = () => {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBranches = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/updatebranch`);
      if (response.ok) {
        const data = await response.json();
        setBranches(Array.isArray(data) ? data : []);
      } else {
        console.error("Failed to fetch branches. Status:", response.status);
        setBranches([]);
      }
    } catch (error) {
      console.error("Error fetching branches:", error);
      setBranches([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  return { branches, loading };
};

export default useBranches;
