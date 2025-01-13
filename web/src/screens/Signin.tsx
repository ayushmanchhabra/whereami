import { Box, Button, Card, CardActions, CardContent, CardHeader, TextField, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { signin } from 'providers/api';

import content from './Signin.content.ts';
import style from './Signin.module.css';
import { AxiosResponse } from 'axios';
import { useUser } from 'providers/hooks';

function Signin(): JSX.Element {

    const [username, setUsername] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [errorMsg, setErrorMsg] = React.useState<string>('');

    const { user, setUser } = useUser();

    const navigate = useNavigate();

    React.useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, [navigate, user]);

    const handleUsernameChange = React.useCallback((event: any) => {
        setUsername(event.target.value);
    }, [setUsername]);

    const handlePasswordChange = React.useCallback((event: any) => {
        setPassword(event.target.value);
    }, [setPassword]);

    const handleButtonClick = React.useCallback(async (event: any) => {
        event.preventDefault();
        let response: AxiosResponse<any, any> | null = null;
        try {
            response = await signin(username, password);
            if (response.status === 200) {
                setUser({ isAuthenticated: true, isAdmin: true });
            }
        } catch (error: any) {
            setErrorMsg(error.response.data.message);
        }
    }, [username, password]);

    return (
        <Box className={style.Box}>
            <Card className={style.Card} variant='outlined'>
                <CardHeader title={content.TITLE} />
                <CardContent>
                    <TextField
                        className={style.TextField}
                        onChange={handleUsernameChange}
                        placeholder={content.USERNAME}
                        type='text'
                        value={username}
                    />
                    <TextField
                        className={style.TextField}
                        onChange={handlePasswordChange}
                        placeholder={content.PASSWORD}
                        type='password'
                        value={password}
                    />
                    <br />
                    {errorMsg !== '' && <Typography className={style.Error}>{errorMsg}</Typography>}
                    <br />
                    <Button
                        children={content.BUTTON}
                        onClick={handleButtonClick}
                        sx={{
                            width: 300,
                            border: '1px solid grey',
                            backgroundColor: 'white',
                            color: 'grey',
                        }}
                        variant='contained'
                    />
                </CardContent>
            </Card>
        </Box>
    );
}

export default Signin;
