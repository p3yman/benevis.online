import React, { useEffect } from "react";
import { newPost } from "../helpers";

const Home = () => {
  useEffect(() => {
    newPost();
  }, []);

  return <div>Loading...</div>;
};

export default Home;
