import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../../contents/AuthProvider";

const Signup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { createUser, guthubSignin } = useContext(AuthContext);

  const handlePushUsers = (user)=>{
    const userData = {
      id: user.uid,
      tech: [
        {
          name: "Docker",
          version: "1.5.6",
        },
        {
          name: "Python",
          version: "1.6.6",
        },
        {
          name: "Terraform",
          version: "2.5.6",
        },
        {
          name: "Vault",
          version: "6.5.6",
        },
      ],
    };
    fetch("https://knitops-backend.vercel.app/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        navigate("/");
      });
  }

const handleGithubSignin = ()=>{
  guthubSignin()
  .then(data=>{
    handlePushUsers(data.user)
    navigate("/");
    console.log(data)
  })
  .catch(error=>console.log(error))
}



  const handleSignup = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    createUser(email, password)
      .then((res) => {
        const user = res.user;
        handlePushUsers(user)
        event.target.reset();
      
      
      })
      .catch((error) => setError(error.message));
  };
  return (
    <div className="hero w-full min-h-[100vh]">
      <div className="hero-content ">
        <form
          onSubmit={handleSignup}
          className="card flex-shrink-0 w-full max-w-xl shadow-2xl bg-base-100 py-5"
        >
          <h1 className="text-5xl font-bold text-center">Signup</h1>
          <div className="card-body w-full">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="input input-bordered lg:w-96 w-full"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                name="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                name="password"
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <p className="text-red-600">{error}</p>
            </div>
            <div className="form-control mt-6">
              <input
                className="btn bg-blue-600 border-none text-white"
                type="submit"
                value="Signup"
              />
            </div>
            <div className="divider">OR</div>
            <div className="text-center ">
              <button onClick={handleGithubSignin}>Continue With Github</button>
            </div>
            <p className="text-center">
              Already Have an Account?{" "}
              <Link className="text-blue-600 font-bold" to="/signin">
                Signin
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
