import { useEffect, useState } from "react";
import { token } from "../config";

const useFetchData = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`, // Make sure to define token
          },
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        setData(result.data);
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }
    };

    fetchData();
  }, [url]); // Make sure to include token in the dependency array if used

  return { data, loading, error };
};

export default useFetchData;
