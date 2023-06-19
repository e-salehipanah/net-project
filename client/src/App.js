import React, { useState } from 'react';
import axios from 'axios';
import MyTable from './table/Table';

function App() {
  const [name, setName] = useState('');
  const [nameValid, setNameValid] = useState(false);
  const [address, setAddress] = useState('');
  const [addressValid, setAddressValid] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordValid, setPasswordValid] = useState(false);
  const [email, setEmail] = useState('');
  const [emailValid, setEmailValid] = useState(false);

  function handleNameChange(event) {
    setName(event.target.value);
    if (event.target.value.length >= 8) {
      setNameValid(true);
    } else {
      setNameValid(false);
    }
  }

  function handleAddressChange(event) {
    setAddress(event.target.value);
    if (event.target.value.trim().length > 0) {
      setAddressValid(true);
    } else {
      setAddressValid(false);
    }
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
    if (event.target.value.length >= 8) {
      setPasswordValid(true);
    } else {
      setPasswordValid(false);
    }
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
    // Regular expression to match email pattern
    const regex = /^\S+@\S+\.\S+$/;
    if (regex.test(event.target.value)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    axios.post('http://localhost:5000/api/form', { name, email, password, address })
      .then(res => console.log(res))
      .catch(err => console.error(err));
  }

  return (
    <div className="container">
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nameInput">Name:</label>
          <input
            type="text"
            className={`form-control ${nameValid ? "is-valid" : "is-invalid"}`}
            id="nameInput"
            value={name}
            onChange={handleNameChange}
            required
          />
          <div className="invalid-feedback">Name must be at least 8 characters.</div>
        </div>
        <div className="form-group">
          <label htmlFor="addressInput">Address:</label>
          <textarea
            className={`form-control ${addressValid ? "is-valid" : "is-invalid"}`}
            id="addressInput"
            rows="3"
            value={address}
            onChange={handleAddressChange}
            required
          ></textarea>
          <div className="invalid-feedback">Please enter your address.</div>
        </div>
        <div className="form-group">
          <label htmlFor="passwordInput">Password:</label>
          <input
            type="password"
            className={`form-control ${passwordValid ? "is-valid" : "is-invalid"}`}
            id="passwordInput"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <div className="invalid-feedback">Password must be at least 8 characters.</div>
        </div>
        <div className="form-group">
          <label htmlFor="emailInput">Email:</label>
          <input
            type="email"
            className={`form-control ${emailValid ? "is-valid" : "is-invalid"}`}
            id="emailInput"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <div className="invalid-feedback">Please enter a valid email address.</div>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      <MyTable />
    </div>
  );
}

export default App;
