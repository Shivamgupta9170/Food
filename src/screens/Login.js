import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });
      const json = await response.json();
      console.log(json);
      if (!response.ok || !json.success) {
        throw new Error("Invalid credentials");
      }
      localStorage.setItem("authToken", json.authToken);
      localStorage.setItem("userEmailID", credentials.email);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error.message);
      alert("Login failed: Please check your credentials and try again.");
    }
  };

  const handleChange = (event) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      <section className="vh-100" style={{ backgroundColor: "#eee" }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card shadow-lg p-3 mb-5 bg-white rounded">
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <h2 className="text-center mb-4">Login</h2>
                      <form onSubmit={handleSubmit} className="mx-1 mx-md-4">
                        <div className="mb-3">
                          <label htmlFor="email" className="form-label">
                            Your Email
                          </label>
                          <div className="input-group">
                            <span className="input-group-text">
                              <i className="fas fa-envelope fa-lg"></i>
                            </span>
                            <input
                              type="email"
                              id="email"
                              className="form-control"
                              name="email"
                              value={credentials.email}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="mb-3">
                          <label htmlFor="password" className="form-label">
                            Password
                          </label>
                          <div className="input-group">
                            <span className="input-group-text">
                              <i className="fas fa-lock fa-lg"></i>
                            </span>
                            <input
                              type="password"
                              id="password"
                              className="form-control"
                              name="password"
                              value={credentials.password}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="m-3 d-grid gap-2">
                          <button
                            type="submit"
                            className="btn btn-primary btn-lg"
                          >
                            Submit
                          </button>
                        </div>
                        <div className="m-3 d-grid gap-2">
                          <Link
                            to="/createuser"
                            className="btn btn-primary btn-lg"
                          >
                            Create User
                          </Link>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid"
                        alt="Sample"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

