import React, { useEffect, useState } from "react";

function useFetch(url, callable) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    refetch();
  }, [url]);

  const getInit = (init, ctType = "application/json") => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", ctType);
    myHeaders.append("Accept", ctType);
    var myInit = {
      method: "GET",
      headers: myHeaders,
      mode: "cors",
      cache: "default",
    };
    myInit = { ...myInit, ...init };
    return myInit;
  };

  const refetch = () => {
    setLoading(true);
    fetch(url, getInit())
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error");
        }
        return response.json();
      })
      .then((json) => {
        setData(callable(json));
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { data, loading, error, refetch };
}

export default useFetch;
