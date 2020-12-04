import React from "react";
import axios from "axios";
const getAuthUrl = async () => {
  const results = await axios.get(
    "https://g6sym0e9h1.execute-api.eu-central-1.amazonaws.com/dev/api/get-auth-url"
  );
  const { authUrl } = results.data;
  return authUrl;
}
function Login() {
  const authUrl = getAuthUrl();
  return (
    <div className="App">
      <h1>Welcome to the Meet app</h1>
      <h4>
        Log in to see upcoming events around the world for
        full-stack
        developers
</h4>
      <div className="button_cont" align="center">
        <div className="google-btn">
          <div className="google-icon-wrapper">
            <img
              className="google-icon"
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/G
oogle_%22G%22_Logo.svg"
              alt="Google sign-in"
            />
          </div>
          <a
            href={`${authUrl}`}
            rel="nofollow noopener"
            className="btn-text"
          >
            <b>Sign in with google</b>
          </a>
        </div>
      </div>
      <a
        href="https://glenzy.github.io/meet/privacy.html"
        rel="nofollow noopener"
      >
        Privacy policy
</a>
    </div>
  );
}

export default Login;