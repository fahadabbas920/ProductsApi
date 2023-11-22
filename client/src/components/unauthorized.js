import { Link } from "react-router-dom";

const UnAuthorized = () => {
  return (
    <div className="main-container session-expired">
      <h3>Oops...🤯 Session Expired!</h3>
      <Link to="/">Login</Link>
    </div>
  );
};

export default UnAuthorized;
