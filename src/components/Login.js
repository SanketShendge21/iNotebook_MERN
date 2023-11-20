import React from "react";
import { useState } from "react";
import { useNavigate  } from "react-router-dom";

const Login = () => {

    const [credentials, setCredentials] = useState({email : "", password : ""});
    let navigate = useNavigate ();

    const onChange = (e) =>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // API endpoint URL
        const response = await fetch('http://localhost:5000/api/auth/login',{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
           },
          body: JSON.stringify({email : credentials.email,password: credentials.password}) // passing the credentials to the API endpoint
    });
        const json = await response.json();
        console.log(json);
        if(json.success){
            // Save the auth-token and redirect to
            localStorage.setItem('token',json.authtoken);
            navigate('/'); // UseNavigation to navigate
        }
        else{
            alert("Invalid credentials");
        }
    };
	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div className="mb-3">
					<label
						htmlFor="exampleInputEmail1"
						className="form-label"
					>
						Email address
					</label>
					<input
						type="email"
						className="form-control"
						id="email"
                        name="email"
                        value={credentials.email}
                        onChange={onChange}
					/>
				</div>
				<div className="mb-3">
					<label
						htmlFor="exampleInputPassword1"
						className="form-label"
					>
						Password
					</label>
					<input
						type="password"
						className="form-control"
						id="password"
                        name="password"
                        value={credentials.password}
                        onChange={onChange}
					/>
				</div>
				<button
					type="submit"
					className="btn btn-primary"
                    
				>
					Submit
				</button>
			</form>
		</div>
	);
};

export default Login;
