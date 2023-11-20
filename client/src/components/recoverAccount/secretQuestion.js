import { useLocation, useNavigate, Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
// import Select from "react-select";
import axios from "axios";
import { toast } from "react-toastify";

const SecretQuestion = () => {
  const formRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  useEffect(() => {
    if (!state?.success) {
      navigate("/account_recovery/find_email");
    }
  }, []);
  const [credentials, setCredentials] = useState({
    questionVal: "FP",
    answerVal: "",
  });
  const submit = async (event) => {
    event.preventDefault();
    try {
      const data = await axios.post(
        `http://localhost:5000/api/v1/account_recovery/security_ques`,
        {
          ...state,
          ...credentials,
          answerVal: credentials.answerVal.toLowerCase(),
        }
      );
      if (data?.data.success) {
        navigate("/account_recovery/set_newpassword", {
          state: { email: state.email, ...credentials, success: state.success },
        });
      }
    } catch (error) {
      if (!error.response) {
        toast.error("No Response from the server");
      } else {
        toast.error(error?.response.data.message);
      }
    }
  };
  return (
    <>
      {state?.success && (
        <div className="login-container">
          <form onSubmit={submit} ref={formRef}>
            <h3>Recover Account</h3>
            <label>
              Secret question:
              {/* <Select options={options} /> */}
              <select
                onChange={(e) => {
                  console.log(credentials);
                  setCredentials((state) => {
                    return { ...state, questionVal: e.target.value };
                  });
                }}
                defaultValue="FP"
              >
                <option value="FP">First pet name?</option>
                <option value="FC">Favourite city?</option>
                <option value="FA">Favourite animal?</option>
              </select>
            </label>
            <label>
              Secret Answer
              <input
                name="secretAnswer"
                type="text"
                onChange={(e) => {
                  console.log(credentials);
                  setCredentials((state) => {
                    return { ...state, answerVal: e.target.value };
                  });
                }}
                value={credentials.answerval}
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
      )}
    </>
  );
};

export default SecretQuestion;

// $2b$10$.myRhcAoUp2tCXMmFOBn3OleVFRSCcpe9FV4FPL7jfPrZrKDdIfaq
