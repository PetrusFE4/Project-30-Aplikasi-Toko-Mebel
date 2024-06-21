import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import "../css/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Both email and password are required.");
    } else {
      setError("");
      // Proceed with form submission
      // For example, you could send a request to the server here
      console.log("Form submitted with:", { email, password });
    }
  };

  return (
    <>
      <Navbar />
      <div className="container d-flex flex-column">
        <div className="row align-items-center justify-content-center g-0 min-vh-100">
          <div className="col-12 col-md-8 col-lg-6 col-xxl-4 py-5 py-xl-0">
            <div className="card card-outline smooth-shadow">
              <div className="card-body p-4">
                <div className="mb-4">
                  <h1>Login</h1>
                  <p className="mb-6">Please enter your user information.</p>
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                  <div className="input-group">
                    <div className="form-floating mb-3">
                      <input
                        type="email"
                        className="form-control"
                        id="floatingInput"
                        placeholder="name@example.com"
                        value={email}
                        onChange={handleEmailChange}
                      />
                      <label htmlFor="floatingInput">Email address</label>
                    </div>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="floatingPassword"
                      placeholder="Password"
                      value={password}
                      onChange={handlePasswordChange}
                    />
                    <label htmlFor="floatingPassword">Password</label>
                  </div>

                  <div className="text-start my-3">
                    <Link to="/register" className="text-success a-none">
                      Don't have an account? Register
                    </Link>
                  </div>
                  <button className="btn btn-success w-100 py-2" type="submit">
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
