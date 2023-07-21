import React, { useContext, useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contents/AuthProvider';


const Signin = () => {
    const {user} = useContext(AuthContext);
    if(user) return <Navigate to="/"></Navigate>
    const navigate = useNavigate();
    const location = useLocation()
    const from = location?.state?.from.pathname || ""
    const [error, setError] = useState("");
    const {userSignin} = useContext(AuthContext)

    const handleSignin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value
        const password = form.password.value
        userSignin(email, password)
        .then(user => {
            console.log(user.user)
            event.target.reset();
            navigate(from, {replace: true})
        })
        .catch(error => setError(error.message))
    }
    return (
        <div className="hero w-full min-h-[100vh]">
        <div className="hero-content ">
            
            <form onSubmit={handleSignin} className="card flex-shrink-0 w-full max-w-xl shadow-2xl bg-base-100 py-5">
                <h1 className="text-5xl font-bold text-center">Signin</h1>
                <div className="card-body w-full">
                  
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="text" name="email" placeholder="email" className="input input-bordered lg:w-96" required/>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input name="password" type="password" placeholder="password" className="input input-bordered" required />
                    <p className='text-red-600'>{error}</p>
                    </div>
                    <div className="form-control mt-6">
                        <input className="btn bg-blue-600 border-none text-white" type="submit" value="Signin" />
                    </div>
                    <div>
                         
                        </div>
                        <p className="text-center">New Here? <Link className='text-blue-600 font-bold' to='/signup'>Signup</Link></p>
                </div>
                
            </form>
        </div>
    </div>
    );
};

export default Signin;