import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="main-container not-found">
      <h3>Error: 4😟4, Resource Not Found</h3>
      <p style={{ fontSize: "1rem" }}>
        Unfortunately, The page you are trying to access does not exist.
      </p>
      <Link to="/panel/products">Goto Homepage</Link>
    </div>
  );
};

export default NotFound;
