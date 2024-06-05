import React from "react";

import { LoaderContainer } from "./Loader.styles";

const Loader: React.FC = () => {
  return (
    <LoaderContainer>
      <img
        src={require("../../assets/Kaciga.png")}
        alt="Loading..."
        className="loader"
      />
      <p>Loading...</p>
    </LoaderContainer>
  );
};

export default Loader;
