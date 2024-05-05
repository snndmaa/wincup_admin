import React, { useState } from 'react'
import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Fetcher } from '../../utils'
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';


const Login=({ setIsAuthenticated })=>{
    const [ userName, setUserName ]   = useState('')
    const [ password, setPassword ]   = useState('')

    const handleLogin = async () => {
        const response = await new Fetcher().login({
            userName,
            password
        })
        
        if (response.status === 'success') {
            localStorage.setItem('token', response.token)
            window.location.href = '/admin'
        }
        else toast.error('Incorrect Login Credentials!')
    }

    const paperStyle={padding :20,height:'70vh',width:280, margin:"20px auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'8px 0'}
    return(
        <div style={{
            backgroundColor: '#141b2d',
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <ToastContainer />
            <Grid container>
                <Paper elevation={10} style={paperStyle}>
                    <Grid align='center'>
                        <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                        <h2>Admin Login</h2>
                    </Grid>
                    <TextField value={userName} onChange={(e) => setUserName(e.target.value)} label='Username' placeholder='Enter username' variant="standard" fullWidth required/>
                    <TextField value={password} onChange={(e) => setPassword(e.target.value)} label='Password' placeholder='Enter password' type='password' variant="standard" fullWidth required/>
                    <FormControlLabel
                        control={
                        <Checkbox
                            name="checkedB"
                            color="primary"
                        />
                        }
                        label="Remember me"
                    />
                    <Button onClick={handleLogin} type='button' color='primary' variant="contained" style={btnstyle} fullWidth>Sign in</Button>
                </Paper>
            </Grid>
        </div>
    )
}

export default Login