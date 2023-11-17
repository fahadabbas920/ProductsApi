import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const FindEmail = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState("");
  const submit = async (event) => {
    event.preventDefault();
    navigate("/account_recovery/secret_question", {
      state: { email: credentials },
    });
    // console.log(credentials);
    // try {
    //   const data = await axios.post(`http://localhost:5000/`, {
    //     credentials,
    //   });
    //   console.log(data);
    // } catch (error) {
    //   console.log(error);
    // }
  };
  return (
    <div className="login-container">
      <form onSubmit={submit}>
        <h3>Recover Account</h3>
        <label>
          Search Email
          <input
            name="email"
            type="text"
            onChange={(e) => {
              setCredentials(e.target.value);
            }}
            value={credentials}
            autoComplete="off"
          />
        </label>
        <button onSubmit={submit}>Recover</button>
        <div>
          <pre>
            <Link to={"/"}>Login</Link>
            &nbsp;&nbsp;&nbsp;
            <Link to={"/signup"}>Sign up</Link>
          </pre>
        </div>
      </form>
    </div>
  );
};

export default FindEmail;
