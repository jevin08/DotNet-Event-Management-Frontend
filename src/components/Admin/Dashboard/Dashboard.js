import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Notify from "../../../utils/toast";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
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

export default Dashboard;