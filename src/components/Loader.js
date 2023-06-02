import React from "react";

const Loader = () => {
  return (
    <div className="loading" style={{width: "100vw", height: "100vh", backgroundColor: "white", display: "grid", placeItems: "center", maxWidth: "100%", transform: "translateX(-12%)"}}>
      <div style={{width: "10vmax", height: "10vmax", borderBottom: "5px solid rgba(0, 0, 0, 0.719)", borderRadius: "50%", animation: "loadingRotate 800ms linear infinite"}}></div>
    </div>
  );
};

export default Loader;
