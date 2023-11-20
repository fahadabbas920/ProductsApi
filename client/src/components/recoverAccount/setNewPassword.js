import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import stringSimilarity from "string-similarity";
import axios from "axios";

const SetNewPassword = () => {
  const location = useLocation();
  const { state } = location;
  // const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    newPass: "",
    reNewPass: "",
  });
  const submit = async (event) => {
    event.preventDefault();
    const similarity = stringSimilarity.compareTwoStrings(
      credentials.newPass,
      credentials.reNewPass
    );
    if (similarity === 1) {
      console.log(credentials);
      console.log(state);
      try {
        const data = await axios.post(`http://localhost:5000/`, {
          credentials,
        });
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Password not similar");
    }
  };
  return (
    <>
      <div className="login-container">
        <form onSubmit={submit}>
          <h3>Recover Account</h3>
          <label>
            New Password
            <input
              name="newPassword"
              type="password"
              onChange={(e) => {
                setCredentials((state) => {
                  return { ...state, newPass: e.target.value };
                });
              }}
              value={credentials.newPass}
              autoComplete="off"
            />
          </label>
          <label>
            Re-type New Password
            <input
              name="ReEnterNewPassword"
              type="password"
              onChange={(e) => {
                setCredentials((state) => {
                  return { ...state, reNewPass: e.target.value };
                });
              }}
              value={credentials.reNewPass}
              autoComplete="off"
            />
          </label>
          <button onClick={submit}>Recover</button>
          <div>
            <pre>
              <Link to={"/"}>Login</Link>
              &nbsp;&nbsp;&nbsp;
              <Link to={"/signup"}>Sign up</Link>
            </pre>
          </div>
        </form>
      </div>

      {/* <div className="card-container">
        Main Title
        <div className="card-row">
          <div className="card-img-container">
            <img src="" alt="img-" />
          </div>
          description
        </div>
        <div className="card-row">
          <div className="card-img-container">
            <img src="" alt="img-" />
          </div>
          description
        </div>
      </div> */}
    </>
  );
};

export default SetNewPassword;
