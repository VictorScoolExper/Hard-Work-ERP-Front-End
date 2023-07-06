import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const useFetch = (reduxAction) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        await dispatch(reduxAction);
        setLoading(false);
      } catch (err) {
        setError(err);
      }
    })();
    
  }, [dispatch]);

  return {
    loading,
    error
  }
};

export default useFetch;
