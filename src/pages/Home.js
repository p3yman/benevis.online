import React, { useEffect } from "react";
import { newPost } from "../helpers";

import Loading from "../components/Loading";

const Home = () => {
  useEffect(() => {
    newPost();
  }, []);

  return <Loading />;
};

export default Home;
