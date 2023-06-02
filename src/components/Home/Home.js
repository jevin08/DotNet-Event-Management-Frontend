import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Notify from "../../utils/toast";
import { useSelector } from "react-redux";

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);


  useEffect(() => {
    if (!isAuthenticated) {
      Notify({ message: `Please login first.`, type: "info" });
      navigate("/login");
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return (
      <>

      </>
  );
}

export default Home;