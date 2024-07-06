import { useState } from "react";
import React from "react";
import { Link } from "react-router-dom"; // Import Link from React Router


export default function Signup() {
  const [credentials, setcredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
    isChecked: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.geolocation,
        isChecked: credentials.isChecked,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (!json.success) {
      alert("enter valid credentials");
    }
  };
  const onchange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <section className="vh-100" style={{ backgroundColor: "#eee" }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: "25px" }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Sign up
                      </p>

                      <form onSubmit={handleSubmit} className="mx-1 mx-md-4">
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="htmlForm-outline flex-fill mb-0">
                            <input
                              type="text"
                              id="htmlForm3Example1c"
                              className="htmlForm-control"
                              name="name"
                              value={credentials.name}
                              onChange={onchange}
                            />
                            <label
                              className="htmlForm-label"
                              htmlFor="htmlForm3Example1c"
                            >
                              Your Name
                            </label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="htmlForm-outline flex-fill mb-0">
                            <input
                              type="email"
                              id="htmlForm3Example3c"
                              className="htmlForm-control"
                              name="email"
                              value={credentials.email}
                              onChange={onchange}
                            />
                            <label
                              className="htmlForm-label"
                              htmlFor="htmlForm3Example3c"
                            >
                              Your Email
                            </label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="htmlForm-outline flex-fill mb-0">
                            <input
                              type="password"
                              id="htmlForm3Example4c"
                              className="htmlForm-control"
                              name="password"
                              value={credentials.password}
                              onChange={onchange}
                            />
                            <label
                              className="htmlForm-label"
                              htmlFor="htmlForm3Example4c"
                            >
                              Password
                            </label>
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="htmlForm-outline flex-fill mb-0">
                            <input
                              type="text"
                              id="htmlForm3Example3c"
                              className="htmlForm-control"
                              name="geolocation"
                              value={credentials.geolocation}
                              onChange={onchange}
                            />
                            <label
                              className="htmlForm-label"
                              htmlFor="htmlForm3Example3c"
                            >
                              Address
                            </label>
                          </div>
                        </div>

                        <div className="htmlForm-check d-flex justify-content-center mb-5">
                          <input
                            className="htmlForm-check-input me-2"
                            type="checkbox"
                            name="isChecked"
                            value={credentials.isChecked}
                            id="htmlForm2Example3c"
                            onChange={onchange}
                          />
                          <label
                            className="htmlForm-check-label"
                            htmlFor="htmlForm2Example3"
                          >
                            I agree all statements in{" "}
                            <a href="#!">Terms of service</a>
                          </label>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="submit"
                            className="m-3 btn btn-primary btn-lg"
                          >
                            Register
                          </button>
                          <Link
                            to="/Login"
                            className="m-3 btn btn-primary btn-lg"
                          >
                            Already a user
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
