import React, {useEffect, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {Box, Button, Paper, TextField, Typography} from "@mui/material";
import {toast, ToastContainer} from "react-toastify";
import {CompanyService} from "../service/company";

const PasswordFinder: React.FC = () => {

    const [email, setEmail] = useState("");
    const [mailSent, setMailSent] = useState(false);

    const MailSent = () => {
        const [busy, setBusy] = useState(false);
        const [countdown, setCountdown] = useState(30);

        useEffect(() => {
            if (countdown > 0) {
                const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
                return () => clearTimeout(timer);
            }
        }, [countdown]);

        const resendEmail = async () => {
            setBusy(true);

            try {
                await CompanyService.sendResetPasswordEmail(email);
                setCountdown(30);
                toast.success("비밀번호 재설정 메일이 다시 전송되었습니다.");
            } catch (error: any) {
                setCountdown(0);
                toast.error(error.message || "비밀번호 재설정 메일 재전송에 실패했습니다.");
            } finally {
                setBusy(false);
            }
        };

        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
                <Paper elevation={3} sx={{p: 4, maxWidth: 400}}>
                    <Typography variant="h5" fontWeight="bold" gutterBottom textAlign="center">
                        비밀번호 재설정 메일이<br/>전송되었습니다
                    </Typography>
                    <Typography variant="body1" gutterBottom textAlign="center">
                        입력하신 이메일 주소로<br/>비밀번호 재설정 링크가 포함된 메일을 발송했습니다.
                    </Typography>
                    <Typography variant="body2" color="text.secondary" textAlign="center">
                        링크의 유효시간은 <b>30분</b>입니다.<br/>시간 내에 비밀번호를 재설정해 주세요.
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{mt: 2}}
                        disabled={countdown > 0 || busy}
                        onClick={resendEmail}
                    >
                        {countdown > 0 ? `다시 보내기 (${countdown}초)` : "다시 보내기"}
                    </Button>
                </Paper>
                <ToastContainer position="bottom-center" hideProgressBar theme="dark"/>
            </Box>
        );
    };

    const MailSender = () => {

        const {control, handleSubmit, formState: {errors, isValid, isSubmitting}} = useForm({
            mode: "onChange",
            defaultValues: {email: ""}
        });

        const onSubmit = async (data: { email: string }) => {
            try {
                await CompanyService.sendResetPasswordEmail(data.email);
                setMailSent(true);
                setEmail(data.email);
                toast.success("비밀번호 재설정 메일이 전송되었습니다.");
            } catch (error: any) {
                toast.error(error.message || "비밀번호 재설정 메일 전송에 실패했습니다.");
            }
        };
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
                <Paper elevation={3} sx={{p: 4, maxWidth: 400}}>
                    <Typography variant="h5" gutterBottom>
                        비밀번호 찾기
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
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
                                    label="이메일 주소"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    required
                                    type="email"
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                />
                            )}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{mt: 2}}
                            disabled={!isValid || isSubmitting}
                        >
                            비밀번호 재설정 메일 보내기
                        </Button>
                        <ToastContainer position="bottom-center" hideProgressBar theme="dark"/>
                    </form>
                </Paper>
            </Box>
        )
    };

    return mailSent ? <MailSent/> : <MailSender/>;
}

export default PasswordFinder;
