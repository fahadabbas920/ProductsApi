import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const FindEmail = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState("");
  const submit = async (event) => {
    event.preventDefault();
    try {
      const data = await axios.post(
        `http://192.168.18.189:5000/api/v1/account_recovery/find_mail`,
        { email: credentials }
      );
      navigate("/account_recovery/secret_question", {
        state: {
          email: data?.data?.email[0]?.email,
          success: data.data.success,
        },
      });
    } catch (error) {
      if (!error.response) {
        toast.error("No Response from the server");
      } else {
        toast.error(error?.response.data.message);
      }
    }
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
