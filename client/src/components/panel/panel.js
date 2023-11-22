import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";

const Panel = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const render = (
    <>
      <Navbar />
      <div className="main-container">
        <Outlet />
      </div>
      <Footer />
    </>
  );
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [navigate, token]);
  return <>{token && render}</>;
};

export default Panel;
