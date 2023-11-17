import Navbar from "./navbar";
// import Footer from "./footer";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Panel = () => {
  const token = localStorage.getItem("token");
  // const [user, setUser] = useState("");
  const navigate = useNavigate();
  const render = (
    <>
      {/* <Navbar user={products.user} /> */}
      <Navbar />
      <div className="main-container">
        <Outlet />
      </div>
      {/* <Footer /> */}
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
