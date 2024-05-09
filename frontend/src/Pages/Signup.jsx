import React from 'react';
import Heading from '../components/Heading';
import SubHeading from '../components/SubHeading';
import InputBox from '../components/InputBox';
function Signup() {
  return (
    <div>
      <Heading label="Sign up"/>
      <SubHeading label="Enter you information to create your Account"/>
      <InputBox label="First Name"/>
    </div>
  );
}

export { Signup };
