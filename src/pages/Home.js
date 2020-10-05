import React, { useEffect } from "react";
import { navigate } from "@reach/router";

import Loading from "../components/Loading";

const Home = () => {
  useEffect(() => {
    fetch("/api/create")
      .then((r) => (r.ok ? r.json() : Promise.reject(r)))
      .then((results) => {
        navigate(`/e/${results.id}`);
      })
      .catch(() => {
        navigate("/404");
      });
  }, []);

  return <Loading />;
};

export default Home;
