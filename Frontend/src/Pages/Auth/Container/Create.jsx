import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Create = ({toggle}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async(event) => {
    event.preventDefault();

    // Perform account creation logic here
    let data  = {name : username,email:email,password:password}
    try {
        const response = await fetch('https://attryb.onrender.com/user/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        const responseData = await response.json();
        if(responseData.Message === "Sucessfully Register"){
          toast.success(responseData.Message)
           toggle()
        }
       else{
        toast.error(responseData.Message)
       }
      } catch(error) {
        console.error(error);
        toast.error(responseData.Message)
      }
  };

  return (
    <div className="create-account-page">
      <h1>Create Account</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          onChange={handleUsernameChange}
        />
        <input
          type="email"
          placeholder="Email"
          onChange={handleEmailChange}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={handlePasswordChange}
        />
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default Create;

