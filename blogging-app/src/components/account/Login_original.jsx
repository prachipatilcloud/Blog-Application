import React, { useState, useEffect, useContext } from 'react';
import { TextField, Box, Button, Typography, styled, Container, Tab, Tabs } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';

const Component = styled(Box)`
    display: flex;
    height: 100vh;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #edf2f7;
`;

const LoginContainer = styled(Box)`
    width: 400px;
    margin: auto;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
    padding: 20px;
    background: #fff;
    border-radius: 10px;
`;

const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`;

const LoginButton = styled(Button)`
    text-transform: none;
    background: #FB641B;
    color: #fff;
    height: 48px;
    border-radius: 2px;
    margin-top: 20px;
`;

const SignupButton = styled(Button)`
    text-transform: none;
    background: #fff;
    color: #2874f0;
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
    margin-top: 20px;
`;

const Text = styled(Typography)`
    color: #878787;
    font-size: 12px;
`;

const CreateAccount = styled(Typography)`
    margin: auto 0 5px 0;
    text-align: center;
    color: #2874f0;
    font-weight: 600;
    cursor: pointer;
`;

const loginInitialValues = {
    username: '',
    password: ''
};

const signupInitialValues = {
    name: '',
    username: '',
    password: '',
};

const Login = ({ isUserAuthenticated }) => {
    const [login, setLogin] = useState(loginInitialValues);
    const [signup, setSignup] = useState(signupInitialValues);
    const [error, showError] = useState('');
    const [account, toggleAccount] = useState('login');

    const navigate = useNavigate();
    const { setAccount } = useContext(DataContext);

    useEffect(() => {
        showError(false);
    }, [login])

    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    }

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    }

    const loginUser = async () => {
        let response = await API.userLogin(login);
        if (response.isSuccess) {
            showError('');
            
            sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
            sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
            setAccount({ name: response.data.name, username: response.data.username });
            
            isUserAuthenticated(true);
            setLogin(loginInitialValues);
            navigate('/');
        } else {
            showError('Something went wrong! please try again later');
        }
    }

    const signupUser = async () => {
        let response = await API.userSignup(signup);
        if (response.isSuccess) {
            showError('');
            setSignup(signupInitialValues);
            toggleAccount('login');
        } else {
            showError('Something went wrong! please try again later');
        }
    }

    const toggleSignup = () => {
        account === 'signup' ? toggleAccount('login') : toggleAccount('signup');
    }

    return (
        <Component>
            <Container>
                <LoginContainer>
                    <Box display="flex" flex={1} flexDirection="column">
                        <Tabs value={account} onChange={(event, newValue) => toggleAccount(newValue)} variant="fullWidth">
                            <Tab label="LOGIN" value="login" />
                            <Tab label="SIGNUP" value="signup" />
                        </Tabs>
                        {
                            account === 'login' &&
                            <Box display="flex" flex={1} flexDirection="column">
                                <TextField variant="standard" value={login.username} onChange={(e) => onValueChange(e)} name="username" label="Enter Username" />
                                <TextField variant="standard" value={login.password} onChange={(e) => onValueChange(e)} name="password" label="Enter Password" />

                                {error && <Error>{error}</Error>}

                                <LoginButton variant="contained" onClick={() => loginUser()} >Login</LoginButton>
                                <Text style={{ textAlign: 'center' }}>OR</Text>
                                <CreateAccount onClick={() => toggleSignup()}>Create an account</CreateAccount>
                            </Box>
                        }
                        {
                            account === 'signup' &&
                            <Box display="flex" flex={1} flexDirection="column">
                                <TextField variant="standard" name="name" label="Enter Name" value={signup.name} onChange={(e) => onInputChange(e)} />
                                <TextField variant="standard" name="username" label="Enter Username" value={signup.username} onChange={(e) => onInputChange(e)} />
                                <TextField variant="standard" name="password" label="Enter Password" value={signup.password} onChange={(e) => onInputChange(e)} />

                                {error && <Error>{error}</Error>}

                                <SignupButton onClick={() => signupUser()} >Signup</SignupButton>
                            </Box>
                        }
                    </Box>
                </LoginContainer>
            </Container>
        </Component>
    )
}

export default Login;
