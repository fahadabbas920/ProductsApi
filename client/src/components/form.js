import { Link } from "react-router-dom";

const Form = ({ credentials, setCredentials, submit, details }) => {
  return (
    <form onSubmit={submit}>
      <h3>{details.name}</h3>
      <label>
        Email:
        <input
          name="email"
          type="text"
          onChange={(e) => {
            setCredentials((state) => {
              return { ...state, email: e.target.value };
            });
          }}
          value={credentials.email}
          autoComplete="off"
        />
      </label>

      <label>
        Password:{" "}
        <input
          name="password"
          type="password"
          onChange={(e) => {
            setCredentials((state) => {
              return { ...state, password: e.target.value };
            });
          }}
          value={credentials.password}
          autoComplete="off"
        />
      </label>
      {details.name === "Signup" && (
        <>
          <h4>For Account Recovery</h4>
          &nbsp;
          <label>
            Secret question:
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
        </>
      )}
      <button onClick={submit}>{details.name}</button>
      <div>
        <pre>
          {details.description} <Link to={details.link}>{details.linkto}</Link>
        </pre>
        <pre>
          Forgot Password?{" "}
          <Link to={"/account_recovery/find_email"}>Recover Account</Link>
        </pre>
      </div>
    </form>
  );
};

export default Form;
