import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import "../css/Login.css";

const Register = () => {
  return (
    <>
      <Navbar />
      <div className="container d-flex flex-column">
        <div
          className="row align-items-center justify-content-center g-0
    min-vh-100"
        >
          <div className="col-12 col-md-8 col-lg-6 col-xxl-4 py-5 py-xl-0">
            <div className="card card-outline smooth-shadow">
              <div className="card-body p-4">
                <div className="mb-4">
                  <h1>Register</h1>
                  <p className="mb-6">Please enter your user information.</p>
                </div>
                <form>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      placeholder="name"
                    />
                    <label for="floatingInput">Name</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingInput"
                      placeholder="Email"
                    />
                    <label for="floatingPassword">Email address</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="floatingPassword"
                      placeholder="Password"
                    />
                    <label for="floatingPassword">Password</label>
                  </div>

                  <div className="text-start my-3">
                    <Link to="/login" className="text-success a-none">
                      Have account? Login
                    </Link>
                  </div>
                  <button className="btn btn-success w-100 py-2" type="submit">
                    Register
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

export default Register;
