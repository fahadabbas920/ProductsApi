import { useLocation, useNavigate, Link } from "react-router-dom";
import { useState, useRef } from "react";
// import Select from "react-select";

const SecretQuestion = () => {
  const formRef = useRef();
  const location = useLocation();
  const { state } = location;
  console.log(state);
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    questionVal: "FP",
    answerVal: "",
  });
  const submit = async (event) => {
    event.preventDefault();
    // console.log(event);
    // const form = event.target;
    // const formData = new FormData(event.target);
    // const data = Object.fromEntries(formData);
    // console.log(data);
    // console.log({ email: state.email, ...credentials });
    //////////////////////////////////////
    // navigate("/account_recovery/set_newpassword", {
    //   state: { email: state.email, ...credentials },
    // });
    //////////////////////////////////////

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
    <>
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
    </>
  );
};

export default SecretQuestion;
