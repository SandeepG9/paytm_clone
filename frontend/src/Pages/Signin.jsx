import React, { useState } from "react"
import Heading from "../components/Heading"
import InputBox from "../components/InputBox"
import ButtonComponent from "../components/ButtonComponent";
import BottomWarningComponent from "../components/BottomWarningComponent";
import axios from "axios"
function Signin()
{
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");


    return(
        <div className="flex justify-center items-center min-h-screen bg-neutral-500">
  <div className="bg-white rounded-lg shadow-lg p-6">
    <div className="mb-6 text-center">
      <Heading label={"Sign In"}></Heading>
    </div>
    <div className="mt-4">
      <InputBox
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        label={"Username"}
        type="text"
      />
    </div>
    <div className="mt-4">
      <InputBox
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        label={"Password"}
        type="password"
      />
    </div>
    <div className="mb-6 text-center">
        <br />
        <BottomWarningComponent  label="Create Account " routing="Signup"/>
    </div>
    <div className="mt-6">
      <ButtonComponent
        label={"Sign In"}
        type={"submit"}
        onClick={async () => {
          const response = await axios.post("http://localhost:3000/api/v1/users/signin",
            {
              username,
              password,
            }
          );
          localStorage.setItem("token",response.data.token);

        }
    }
      />
    </div>
  </div>
</div>

      
    )
}

export{Signin}