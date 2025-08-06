import React from "react";
import {Controller, useForm} from "react-hook-form";
import {Box, Button, Paper, TextField, Typography} from "@mui/material";
import {toast, ToastContainer} from "react-toastify";
import {CompanyService} from "../service/company";
import {useNavigate, useParams} from "react-router";
import NotFound from "./NotFond";

const PasswordSetter = () => {
    const {token} = useParams<{ token: string }>();

    if (!token) {
        return <NotFound/>;
    }

    const navigate = useNavigate();

    const {control, handleSubmit, formState: {errors, isValid, isSubmitting}, getValues} = useForm({
        mode: "onChange",
        defaultValues: {password: "", passwordConfirm: ""}
    });

    const onSubmit = async (data: { password: string; passwordConfirm: string }) => {
        try {
            await CompanyService.resetPassword(token, data.password);
        } catch (error: any) {
            toast.error(error.message || "비밀번호 재설정에 실패했습니다.");
            return;
        }
        toast.success("비밀번호가 성공적으로 재설정되었습니다.로그인 페이지로 이동합니다.", {
            onClose: () => navigate("/login"),
            autoClose: 2000
        });
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
            <Paper elevation={3} sx={{p: 4, maxWidth: 400}}>
                <Typography variant="h5" gutterBottom>
                    비밀번호 재설정
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name="password"
                        control={control}
                        rules={{
                            required: "새 비밀번호를 입력해주세요",
                            minLength: {value: 6, message: "비밀번호는 최소 6자 이상이어야 합니다"}
                        }}
                        render={({field}) => (
                            <TextField
                                {...field}
                                label="새 비밀번호"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                required
                                type="password"
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />
                        )}
                    />
                    <Controller
                        name="passwordConfirm"
                        control={control}
                        rules={{
                            required: "비밀번호 확인을 입력해주세요",
                            validate: (value: string) => value === getValues().password || "비밀번호가 일치하지 않습니다"
                        }}
                        render={({field}) => (
                            <TextField
                                {...field}
                                label="비밀번호 확인"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                required
                                type="password"
                                error={!!errors.passwordConfirm}
                                helperText={errors.passwordConfirm?.message}
                            />
                        )}
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{mt: 2}}
                            disabled={!isValid || isSubmitting}>
                        비밀번호 재설정
                    </Button>
                    <ToastContainer position="bottom-center" hideProgressBar theme="dark"/>
                </form>
            </Paper>
        </Box>
    );
}

export default PasswordSetter;
