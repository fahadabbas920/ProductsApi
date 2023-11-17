import logo from "../../assets/logo-removebg.png";
import { Link, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const Navbar = () => {
  const query = useQueryClient();
  const user = localStorage.getItem("user");
  // console.log("====================================");
  // console.log(query.getQueryData(["products"]));
  // console.log("====================================");
  const navigate = useNavigate();
  return (
    <div className="navbar-container">
      <div className="navbar-left">
        <img src={logo} alt="" />
        <span>Products</span>
        <ul>
          <li>
            <Link to={"/panel/products"}>Products</Link>
          </li>
          <li>
            <Link to={"/panel/add"}>Add New</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-right">
        <span>{user}</span>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            query.clear();
            navigate("/");
          }}
        >
          log out
        </button>
      </div>
    </div>
  );
};

export default Navbar;
