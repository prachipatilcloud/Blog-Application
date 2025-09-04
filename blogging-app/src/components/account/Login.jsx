import React, { useState, useEffect, useContext } from 'react';
import {
  TextField,
  Box,
  Button,
  Typography,
  styled,
  Container,
  Tab,
  Tabs,
  Paper
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';

const LoginContainer = styled(Container)`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem 1rem;
`;

const LoginPaper = styled(Paper)`
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 10px 10px -5px rgb(0 0 0 / 0.04);
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  width: 100%;
  max-width: 450px;

  @media (max-width: 768px) {
    padding: 2rem;
    margin: 1rem;
  }
`;

const Logo = styled(Typography)`
  text-align: center;
  margin-bottom: 2rem;
  font-weight: 800;
  background: linear-gradient(45deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: 2.5rem;
  letter-spacing: -0.02em;
`;

const StyledTabs = styled(Tabs)`
  margin-bottom: 2rem;

  .MuiTabs-indicator {
    background: linear-gradient(45deg, #667eea, #764ba2);
    height: 3px;
    border-radius: 3px;
  }

  .MuiTab-root {
    font-weight: 600;
    text-transform: none;
    font-size: 1rem;
    color: #64748b;

    &.Mui-selected {
      color: #2563eb;
    }
  }
`;

const FormContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const StyledTextField = styled(TextField)`
  .MuiOutlinedInput-root {
    border-radius: 12px;
    background-color: #f8fafc;

    &:hover .MuiOutlinedInput-notchedOutline {
      border-color: #2563eb;
    }

    &.Mui-focused .MuiOutlinedInput-notchedOutline {
      border-color: #2563eb;
      border-width: 2px;
    }
  }

  .MuiInputLabel-root {
    color: #64748b;
    font-weight: 500;

    &.Mui-focused {
      color: #2563eb;
    }
  }
`;

const ActionButton = styled(Button)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  text-transform: none;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  margin-top: 1rem;

  &:hover {
    background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
    transform: translateY(-2px);
    box-shadow: 0 8px 15px -3px rgb(0 0 0 / 0.1);
  }

  &:disabled {
    opacity: 0.7;
    transform: none;
  }
`;

const ErrorMessage = styled(Typography)`
  color: #dc2626;
  font-size: 0.875rem;
  text-align: center;
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  padding: 0.75rem;
  border-radius: 8px;
  margin-top: 1rem;
`;

const WelcomeText = styled(Typography)`
  text-align: center;
  color: #64748b;
  margin-bottom: 2rem;
  font-size: 1.1rem;
  line-height: 1.6;
`;

const loginInitialValues = {
  username: '',
  password: ''
};

const signupInitialValues = {
  name: '',
  username: '',
  password: ''
};

const Login = ({ isUserAuthenticated }) => {
  const [login, setLogin] = useState(loginInitialValues);
  const [signup, setSignup] = useState(signupInitialValues);
  const [error, showError] = useState('');
  const [account, toggleAccount] = useState('login');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { setAccount } = useContext(DataContext);

  useEffect(() => {
    showError(false);
  }, [login]);

  const onValueChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const loginUser = async () => {
    setLoading(true);
    try {
      let response = await API.userLogin(login);
      if (response.isSuccess) {
        showError('');
        sessionStorage.setItem(
          'accessToken',
          `Bearer ${response.data.accessToken}`
        );
        sessionStorage.setItem(
          'refreshToken',
          `Bearer ${response.data.refreshToken}`
        );
        setAccount({
          name: response.data.name,
          username: response.data.username
        });

        isUserAuthenticated(true);
        setLogin(loginInitialValues);
        navigate('/');
      } else {
        showError('Something went wrong! Please try again later');
      }
    } catch (error) {
      showError('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const signupUser = async () => {
    setLoading(true);
    try {
      let response = await API.userSignup(signup);
      if (response.isSuccess) {
        showError('');
        setSignup(signupInitialValues);
        toggleAccount('login');
      } else {
        showError('Something went wrong! Please try again later');
      }
    } catch (error) {
      showError('Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleSignup = () => {
    account === 'signup'
      ? toggleAccount('login')
      : toggleAccount('signup');
    showError('');
  };

  return (
    <LoginContainer maxWidth={false}>
      <LoginPaper elevation={0}>
        <Logo variant="h3">BlogApp</Logo>

        <WelcomeText>
          {account === 'login'
            ? 'Welcome back! Sign in to your account'
            : 'Create your account to start blogging'}
        </WelcomeText>

        <StyledTabs value={account} onChange={() => toggleSignup()} centered>
          <Tab label="Sign In" value="login" />
          <Tab label="Sign Up" value="signup" />
        </StyledTabs>

        {account === 'login' ? (
          <FormContainer component="form" noValidate>
            <StyledTextField
              variant="outlined"
              name="username"
              label="Username"
              value={login.username}
              onChange={onValueChange}
              fullWidth
              required
            />
            <StyledTextField
              variant="outlined"
              name="password"
              label="Password"
              value={login.password}
              onChange={onValueChange}
              fullWidth
              required
              type="password"
            />
            <ActionButton
              variant="contained"
              onClick={loginUser}
              disabled={loading}
              fullWidth
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </ActionButton>
          </FormContainer>
        ) : (
          <FormContainer component="form" noValidate>
            <StyledTextField
              variant="outlined"
              name="name"
              label="Full Name"
              value={signup.name}
              onChange={onInputChange}
              fullWidth
              required
            />
            <StyledTextField
              variant="outlined"
              name="username"
              label="Username"
              value={signup.username}
              onChange={onInputChange}
              fullWidth
              required
            />
            <StyledTextField
              variant="outlined"
              name="password"
              label="Password"
              value={signup.password}
              onChange={onInputChange}
              fullWidth
              required
              type="password"
            />
            <ActionButton
              variant="contained"
              onClick={signupUser}
              disabled={loading}
              fullWidth
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </ActionButton>
          </FormContainer>
        )}

        {error && <ErrorMessage>{error}</ErrorMessage>}
      </LoginPaper>
    </LoginContainer>
  );
};

export default Login;
