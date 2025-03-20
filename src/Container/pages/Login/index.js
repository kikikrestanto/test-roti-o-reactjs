/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import styled from "styled-components";
import Backdrop from '../../../assets/images/Backdrop.png';
import { TextField } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { pathnameCONFIG } from "../../../constant/pathnameConfig";

const Body = styled('div')(() => ({
    backgroundImage : `url(${Backdrop})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflowY: 'hidden',
    overflowX: 'hidden',

    '@media (max-width: 480px)': {
        height: '100vh',
        
    }

}))

const Container = styled('div')(() => ({
    backgroundColor : 'white',
    width: '50%',
    height: '85vh',
    borderRadius: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',

    '@media (max-width: 768px)' : {
        height: '95vh',
        width: '50%',
      },
    
    '@media (max-width: 480px)': {
        height: '80%',
        width: '80%',
    }
}));

const CircleIcon = styled('div')(() => ({
    borderRadius: '100px',
    backgroundColor: '#C4C4C4',
    width:'50px',
    height: '50px',
}))

const Button = styled('div')(() => ({
    border: '1px solid #000',
    borderRadius: '40px',
    height: '60px',
    width: '70%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}));

const Space = styled('div') (({space}) => ({
    height: space  ?? '10px'
}));

const FormInput = styled(TextField)(() => ({
    width: '70%',
    marginBottom: '10px',
    borderRadius: '20px',
}))

const TextForm = styled('div')(() => ({
    color: '#666666',
    fontSize: '12px',
    alignSelf: 'flex-start',
    marginLeft: '7rem',

    '@media (max-width: 768px)' : {
        marginLeft: '3.5rem',
      },
    
    '@media (max-width: 480px)': {
        marginLeft: '3rem',
    }
}))

const TextStyle = styled('div')(() => ({
    fontSize: '1em',
}))

const Login= () => {
    const navigate = useNavigate();
    const [fullname, setFullname] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async(e) => {
        e.preventDefault();
        try{
            const response = await axios.post("http://localhost:8000/auth/login", {fullname,password});
            localStorage.setItem("token", response.data.token);
            navigate(pathnameCONFIG.DASHBOARD);
        } catch(error) {
            console.error(error);
        }
    }
    return (
        <Body>
            <Container>
                <CircleIcon/>
                <Space space="15px"/>
                <TextStyle>Login</TextStyle>
                <Space space="15px"/>
                <TextForm>
                    Your Fullname
                </TextForm>
                
                <FormInput
                    id="fullname"
                    placeholder="Fullname"
                    type="text"
                    onChange={(e) => setFullname(e.target.value)}
                />
                <Space space="15px"/>
                <TextForm>
                    Your Password
                </TextForm>
                <FormInput
                    id="password"
                    placeholder="Password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Space space="15px"/>
                <Button style={{backgroundColor: '#666666', border: 'none', color: '#fff'}} 
                onClick={handleLogin}
                >
                    Log in
                </Button>
            </Container>
        </Body>
    )
}

export default Login;