import React, { useState } from 'react';
import Heading from '../components/Heading';
import SubHeading from '../components/SubHeading';
import InputBox from '../components/InputBox';
import ButtonComponent from '../components/ButtonComponent';
import axios from 'axios';
import BottomWarningComponent from '../components/BottomWarningComponent';

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");


  return (
    <div className="justify-center bg-gray-500">
      <div className="p-4 flex flex-col items-center justify-center min-h-screen bg-white p-2">
        <Heading label="Sign up" />
        <SubHeading label="Enter your information to create your account" />
        <InputBox onChange={e => setUserName(e.target.value)} label="Username" type="text" />
        <InputBox onChange={e => setFirstName(e.target.value)} label="First Name" type="text" />
        <InputBox onChange={e => setLastName(e.target.value)} label="Last Name" type="text" />
        <InputBox onChange={e => setPassword(e.target.value)} label="Password" type="password" />
        <ButtonComponent label="Sign up" onClick={async()=>{
            try{
              const resp = await axios.post(" http://localhost:3000/api/v1/users/signup",
                {
                  username: userName,
                  firstName: firstName,
                  lastName: lastName,
                  password: password
                }
              )
            }
            catch(err)
            {
                console.log("Something went wrong while creating account")
            }
        }}/>
   <BottomWarningComponent label={"Already have an account? "} routing = {"signin"}/>

      </div>
    </div>
  );
}

export { Signup };
