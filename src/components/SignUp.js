import React, { useState } from 'react';
import Alert from './Alert';
import { useNavigate } from 'react-router-dom';

function Signup(props) {
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
  });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        'https://hux-assessment-backend.vercel.app/api/auth/createUser',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: credentials.name,
            email: credentials.email,
            password: credentials.password,
          }),
        }
      );

      const json = await response.json();

      if (!json.success) {
        // Show a warning alert if the email already exists
        props.showAlert('Email with this email Already Exists', 'warning');
      } else {
        // Store authentication and user information in local storage
        localStorage.setItem('token', json.authToken);
        localStorage.setItem('name', json.name);
        localStorage.setItem('success', json.success);
        // Navigate to the login page and show a success alert
        navigate('/login');
        props.showAlert('Signup Success', 'success');
      }
    } catch (error) {
      // Show a warning alert for database connection issues
      props.showAlert('db not connected', 'warning');
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <div className="display-4 text-center">SignUp 🤓</div>
            <br />
            <Alert alert={alert} />
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  {' '}
                  <i className="fa-solid fa-file-signature"></i> Full Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={credentials.name}
                  onChange={onChange}
                  aria-describedby="nameHelp"
                  minLength={3}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  <i className="fa-solid fa-envelope-circle-check"></i> Email address
                </label>
                <input
                  type="email"
                  value={credentials.email}
                  onChange={onChange}
                  className="form-control"
                  id="email"
                  name="email"
                  aria-describedby="emailHelp"
                />
                <div id="emailHelp" className="form-text">
                  We'll never share your email with anyone else.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  <i className="fa-solid fa-key"></i> Password
                </label>
                <input
                  type="password"
                  value={credentials.password}
                  onChange={onChange}
                  className="form-control"
                  name="password"
                  id="password"
                  minLength={5}
                  required
                />
              </div>
              <div className="d-grid gap-2 col-6 mx-auto">
                <button type="submit" className="btn btn-primary">
                  SignUp
                </button>
              </div>
            </form>
            <br />
            <br />
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
