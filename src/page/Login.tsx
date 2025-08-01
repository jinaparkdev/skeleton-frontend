import * as React from "react";
import {Box, Button, Container, Divider, Paper, TextField, Typography} from "@mui/material";
import {Controller, useForm} from "react-hook-form";
import {AuthenticateCompanyRequest, CompanyService} from "../service/company";
import {toast, ToastContainer} from "react-toastify";
import {HttpError} from "../util/http";
import {useSetRecoilState} from "recoil";
import {currentCompanyState} from "../state/companyState";
import {useNavigate} from "react-router";

const Login = () => {

    const {
        control,
        handleSubmit,
        formState: {errors, isValid, isSubmitting}
    } = useForm<AuthenticateCompanyRequest>({
        mode: "onChange",
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const setRecoilValue = useSetRecoilState(currentCompanyState);
    const navigate = useNavigate();

    const onSubmit = async (data: AuthenticateCompanyRequest) => {
        await CompanyService.authenticate(data).then(response => {
            localStorage.setItem("token", response.token);
            setRecoilValue(response.company);
            navigate("/mode");
        }).catch(error => {
            console.error("로그인 실패:", error.message);

            if (error instanceof HttpError) {
                toast.error(error.message, {
                    position: "bottom-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    theme: "dark",
                });
                return;
            }
        });
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Paper elevation={3} sx={{padding: 4, width: "100%"}}>
                    <Typography component="h1" variant="h4" align="center" gutterBottom>
                        로그인
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{mt: 1}}>

                        <Controller
                            name="email"
                            control={control}
                            rules={{
                                required: "이메일을 입력해주세요",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "올바른 이메일 형식을 입력해주세요"
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
                                required: "비밀번호를 입력해주세요",
                                minLength: {
                                    value: 6,
                                    message: "비밀번호는 최소 6자 이상이어야 합니다"
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
                        <Box sx={{display: "flex", gap: 1, mt: 1, alignItems: "center", justifyContent: "center"}}>
                            <Button
                                fullWidth
                                variant="text"
                                sx={{color: "primary.dark"}}
                                onClick={() => navigate("/signup")}
                            >
                                회원가입하기
                            </Button>
                            <Divider
                                orientation="vertical"
                                sx={{borderColor: "grey.400", height: "24px"}}
                            />
                            <Button
                                fullWidth
                                variant="text"
                                sx={{color: "primary.dark"}}
                                onClick={() => navigate("/forgot-password")}
                            >
                                비밀번호 찾기
                            </Button>
                        </Box>
                    </Box>

                </Paper>

                <ToastContainer/>
            </Box>
        </Container>
    );
};

export default Login;
