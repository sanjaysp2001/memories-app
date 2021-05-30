import {React, useState} from 'react'
import { useDispatch } from 'react-redux';
import { Avatar, Button, Paper, Grid, Typography, Container,} from '@material-ui/core';
import {useHistory} from 'react-router-dom'
import { GoogleLogin } from 'react-google-login';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import useStyles from "./styles";
import Input from './input';
import Icon from './icon';
import {signin, signup} from '../../actions/auth';
import { AUTH } from '../../constants/actionTypes';


const initialState = {firstName:'',lastName:'',email:'',password:'',confirmPassword:''}
export const Auth = () => {
    
    const [form, setForm] = useState(initialState);
    const [isSignup, setIsSignup] = useState(false);
    const dispatch = useDispatch();  
    const history = useHistory();
    const classes = useStyles();

    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = ()=>{
        setShowPassword(!showPassword);
    }

    const switchMode=()=>{
        setForm(initialState);
        setIsSignup((prevIsSignup)=> !prevIsSignup);
        handleShowPassword(false);
    }
    const handleSubmit = (e)=>{
        e.preventDefault();

        if(isSignup){
            dispatch(signup(form, history));
        }
        else{
            dispatch(signin(form, history));
        
        }
        console.log(form);
    };
    const handleChange=(e)=>{
        setForm({...form, [e.target.name]:e.target.value})
    };


    const googleSuccess = async (res)=>{
        const result = res?.profileObj;
        const token = res?.tokenId;
        try {
            dispatch({type:AUTH, data:{result, token}})

            history.push('/')
        } catch (error) {
            console.log(error);
        }
        //console.log(res);
    };
    const googleFailure = ()=>{
        console.log('Google Sign In Failed :(');
    };
    return (
        <Container components='main' maxWidth='xs'>
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant='h5'>
                    {isSignup ? 'Sign Up': 'Sign in'}
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignup && 
                        (<>
                            <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half />
                            <Input name='lastName' label='Last Name' handleChange={handleChange} half />
                        </>)
                        }
                        <Input name='email' label='Email Address' handleChange={handleChange} type='email'/>
                        <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? 'text':'password'} handleShowPassword={handleShowPassword}/>
                        { isSignup && <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange} type='password'/>}
                    </Grid>
                    <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
                        {isSignup ?'Sign Up':'Sign In'}
                    </Button>
                    <GoogleLogin
                        clientId="1092146378450-5e20ab18dl3svjdpo031mj7j8bpp4nb1.apps.googleusercontent.com"
                        render={(renderProps)=>(
                            <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant='contained'>
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy='single_host_origin'
                    />
                    <Grid container justify='flex-end'>
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignup ? 'Already have an account? Sign In':"Don't have an account? Sign Up" }
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth;