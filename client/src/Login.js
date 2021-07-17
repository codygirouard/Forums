import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import Header from './header';

export const SignIn = () => {
  // error texts for signin
  const userErrors = {
    required: 'Username is required to login',
    minLength: 'Username must be at least 3 characters long',
    maxLength: 'Username must be 10 characters long maximum',
    'No user found!': 'No user found with that username',
    err: 'Error trying to login, please try again later',
  };
  const passErrors = {
    required: 'Password is required to login',
    minLength: 'Password must be at least 6 characters long',
    maxLength: 'Password must be 24 characters long maximum',
    'Incorrect password!': 'Incorrect password',
    err: 'Error trying to login, please try again later',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const [userError, setUserError] = useState(null);
  const [passError, setPassError] = useState(null);

  useEffect(() => {
    document.title = 'Login - Denton Forums';
    if (localStorage.getItem('name')) {
      navigate('/');
    }
  });

  const onSubmit = async (data) => {
    setUserError(null);
    setPassError(null);
    const loginInfo = {
      username: data.username.toLowerCase(),
      pwd: data.password,
    };

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginInfo),
    };
    const res = await fetch('/be/userLogin', options).then((response) =>
      response.json()
    );

    if (res.succ) {
      localStorage.setItem('name', res.succ);

      navigate('/');
    } else {
      if (res.err === 'No user found!') {
        setUserError('No user found!');
      } else if (res.err === 'Incorrect password!') {
        setPassError('Incorrect password!');
      } else {
        setPassError('err');
        setUserError('err');
      }
    }
  };

  const onErrors = (errors) => {
    setUserError(errors.username ? errors.username.type : null);
    setPassError(errors.password ? errors.password.type : null);
  };

  return (
    <div className="centerScreen">
      <Header login={true} />
      <div className="loginContainer">
        <h2 className="formTitle">Login</h2>
        <form onSubmit={handleSubmit(onSubmit, onErrors)}>
          <div className="formGroup">
            <input
              id="username"
              className="formField"
              autoFocus={true}
              type="text"
              placeholder="Username"
              aria-invalid={errors.username ? 'true' : 'false'}
              {...register('username', {
                required: true,
                minLength: 3,
                maxLength: 30,
              })}
            />
            <label className="formLabel" htmlFor="username">
              Username
            </label>
          </div>

          {userError && (
            <span role="alert" className="fieldError">
              {userErrors[userError]}
            </span>
          )}

          <div className="formGroup">
            <input
              id="password"
              className="formField"
              type="password"
              placeholder="Password"
              aria-invalid={errors.password ? 'true' : 'false'}
              {...register('password', {
                required: true,
                minLength: 6,
                maxLength: 24,
              })}
            />
            <label className="formLabel" htmlFor="password">
              Password
            </label>
          </div>

          {passError && (
            <span role="alert" className="fieldError">
              {passErrors[passError]}
            </span>
          )}

          <div className="login">
            <button type="submit" className="btn">
              <svg
                width="180px"
                height="60px"
                viewBox="0 0 180 60"
                className="border"
              >
                <polyline
                  points="179,1 179,59 1,59 1,1 179,1"
                  className="bg-line"
                />
                <polyline
                  points="179,1 179,59 1,59 1,1 179,1"
                  className="hl-line"
                />
              </svg>
              <span>Login</span>
            </button>
          </div>
        </form>

        <div className="swapLogin">
          <p>
            Don't have an account? <Link to="/register">Sign up here!</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export const SignUp = () => {
  // error texts
  const userErrors = {
    required: 'Username is required to register',
    minLength: 'Username must be at least 3 characters long',
    maxLength: 'Username must be 10 characters long maximum',
    pattern: 'Username must contain only letters and numbers',
    username: 'Username is already taken',
    err: 'Error trying to register, please try again later',
  };
  const emailErrors = {
    required: 'Email is required to register',
    maxLength: 'Email must be 30 characters long maximum',
    pattern: 'Email must be in the correct format',
    email: 'An account with this email already exists',
    err: 'Error trying to register, please try again later',
  };
  const passErrors = {
    required: 'Password is required to register',
    minLength: 'Password must be at least 6 characters long',
    maxLength: 'Password must be 24 characters long maximum',
    err: 'Error trying to register, please try again later',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [userError, setUserError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passError, setPassError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Register - Denton Forums';
    if (localStorage.getItem('name')) {
      navigate('/');
    }
  });

  const onSubmit = async (data) => {
    setUserError(null);
    setEmailError(null);
    setPassError(null);

    const loginInfo = {
      name: data.username,
      email: data.email.toLowerCase(),
      pwd: data.password,
    };

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginInfo),
    };
    const res = await fetch('/be/createAccount', options).then((response) =>
      response.json()
    );

    if (res.succ) {
      localStorage.setItem('name', res.succ);
      navigate('/');
    } else {
      if (res.err === 'Username and email taken') {
        setUserError('username');
        setEmailError('email');
      } else if (res.err === 'Username taken') {
        setUserError('username');
      } else if (res.err === 'Email taken') {
        setEmailError('email');
      } else {
        setPassError('err');
        setEmailError('err');
        setUserError('err');
      }
    }
  };

  const onErrors = (errors) => {
    setUserError(errors.username ? errors.username.type : null);
    setEmailError(errors.email ? errors.email.type : null);
    setPassError(errors.password ? errors.password.type : null);
  };

  return (
    <div className="centerScreen">
      <Header login={true} />
      <div className="loginContainer">
        <h2 className="formTitle">Create An Account</h2>
        <form onSubmit={handleSubmit(onSubmit, onErrors)}>
          <div className="formGroup">
            <input
              id="username"
              className="formField"
              autoFocus={true}
              type="text"
              placeholder="Username"
              aria-invalid={errors.username ? 'true' : 'false'}
              {...register('username', {
                required: true,
                minLength: 3,
                maxLength: 10,
                pattern: /^[a-z0-9]+$/i,
              })}
            />
            <label className="formLabel" htmlFor="username">
              Username
            </label>
          </div>

          {userError && (
            <span role="alert" className="fieldError">
              {userErrors[userError]}
            </span>
          )}

          <div className="formGroup">
            <input
              id="email"
              className="formField"
              type="email"
              placeholder="Email"
              aria-invalid={errors.email ? 'true' : 'false'}
              {...register('email', {
                required: true,
                maxLength: 30,
                pattern: /\S+@\S+\.\S+/,
              })}
            />
            <label className="formLabel" htmlFor="email">
              Email
            </label>
          </div>

          {emailError && (
            <span role="alert" className="fieldError">
              {emailErrors[emailError]}
            </span>
          )}

          <div className="formGroup">
            <input
              id="password"
              className="formField"
              type="password"
              placeholder="Password"
              aria-invalid={errors.password ? 'true' : 'false'}
              {...register('password', {
                required: true,
                minLength: 6,
                maxLength: 24,
              })}
            />
            <label className="formLabel" htmlFor="password">
              Password
            </label>
          </div>

          {passError && (
            <span role="alert" className="fieldError">
              {passErrors[passError]}
            </span>
          )}

          <div className="register">
            <button type="submit" className="btn">
              <svg
                width="180px"
                height="60px"
                viewBox="0 0 180 60"
                className="border"
              >
                <polyline
                  points="179,1 179,59 1,59 1,1 179,1"
                  className="bg-line"
                />
                <polyline
                  points="179,1 179,59 1,59 1,1 179,1"
                  className="hl-line"
                />
              </svg>
              <span>Register</span>
            </button>
          </div>
        </form>

        <div className="swapLogin">
          <p>
            Already have an account? <Link to="/login">Sign in here!</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
