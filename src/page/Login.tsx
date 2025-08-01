import * as React from 'react';
import {Box, Button, Container, Paper, TextField, Typography} from '@mui/material';
import {Controller, useForm} from 'react-hook-form';
import {AuthenticateCompanyRequest, CompanyService} from "../service/company";

const Login = () => {

    const {
        control,
        handleSubmit,
        formState: {errors, isValid, isSubmitting}
    } = useForm<AuthenticateCompanyRequest>({
        mode: 'onChange',
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const onSubmit = async (data: AuthenticateCompanyRequest) => {
        await CompanyService.authenticate(data).then(response => {
            // TODO 로그인 성공 후 처리
            console.log('로그인 성공:', response);
        }).catch(error => {
            // TODO 로그인 실패 처리
            console.error('로그인 실패:', error);
        }).finally(() => {

        })
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Paper elevation={3} sx={{padding: 4, width: '100%'}}>
                    <Typography component="h1" variant="h4" align="center" gutterBottom>
                        로그인
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{mt: 1}}>

                        <Controller
                            name="email"
                            control={control}
                            rules={{
                                required: '이메일을 입력해주세요',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: '올바른 이메일 형식을 입력해주세요'
                                }
                            }}
                            render={({field}) => (
                                <TextField
                                    {...field}
                                    margin="normal"
                                    fullWidth
                                    id="email"
                                    label="이메일 주소"
                                    type="email"
                                    autoComplete="email"
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                />
                            )}
                        />

                        <Controller
                            name="password"
                            control={control}
                            rules={{
                                required: '비밀번호를 입력해주세요',
                                minLength: {
                                    value: 6,
                                    message: '비밀번호는 최소 6자 이상이어야 합니다'
                                }
                            }}
                            render={({field}) => (
                                <TextField
                                    {...field}
                                    margin="normal"
                                    fullWidth
                                    id="password"
                                    label="비밀번호"
                                    type="password"
                                    autoComplete="current-password"
                                    error={!!errors.password}
                                    helperText={errors.password?.message}
                                />
                            )}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                            disabled={!isValid}
                            loading={isSubmitting}
                        >
                            로그인
                        </Button>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
};

export default Login;
