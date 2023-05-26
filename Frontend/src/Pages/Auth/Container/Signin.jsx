import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()


  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    // Perform account creation logic here
    let data  = {email:email,password:password}
    try {
        const response = await fetch('http://localhost:8080/user/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        const responseData = await response.json();
         toast.success(responseData.Message);
         localStorage.setItem("Car Token",JSON.stringify(responseData.token))
         navigate("/home")
  
      } catch(error) {
        console.error(error);
        toast.error("Wrong Crendential")
      }
  };

  return (
    <div className="create-account-page">
      <h1>Sign in</h1>
      <form onSubmit={handleSubmit}>
       
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button type="submit">Sign in</button>

      </form>
    </div>
  );
};

export default Signin;

