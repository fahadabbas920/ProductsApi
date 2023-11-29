import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import stringSimilarity from "string-similarity";
import axios from "axios";
import { toast } from "react-toastify";

const SetNewPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  useEffect(() => {
    if (!state?.success) {
      navigate("/account_recovery/secret_question");
    }
  }, [navigate, state]);

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
      try {
        const data = await axios.post(
          `http://192.168.18.189:5000/api/v1/account_recovery/change_pass`,
          {
            ...state,
            ...credentials,
          }
        );
        toast.success(data.data.message);
        navigate("/");
      } catch (error) {
        if (!error.response) {
          toast.error("No Response from the server");
        } else {
          toast.error(error.response.data.message);
        }
      }
    } else {
      toast.error("Password is not identical");
    }
  };
  return (
    <>
      {state?.success && (
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
      )}
    </>
  );
};

export default SetNewPassword;
