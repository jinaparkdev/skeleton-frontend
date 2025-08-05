import React, {useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {Box, Button, Container, Paper, TextField, Typography} from "@mui/material";
import {CompanyService, CreateCompanyRequest} from "../service/company";
import {toast, ToastContainer} from "react-toastify";
import {useNavigate} from "react-router";

type FormFieldName = "name" | "phone" | "email" | "password" | "passwordConfirm";

const SignUp = () => {
    const navigate = useNavigate();

    const {control, handleSubmit, formState: {errors, isValid, isSubmitting}, getValues} = useForm({
        mode: "onChange",
        defaultValues: {name: "", phone: "", email: "", password: "", passwordConfirm: ""}
    });

    const [signupStep, setSignupStep] = useState(0);

    const handleValidationAndFocus = async (
        e: React.KeyboardEvent | React.FocusEvent,
        field: any,
        step: number,
        nextFieldName: string,
        asyncValidator?: (value: string) => Promise<boolean>
    ) => {
        const proceedToNextStep = () => {
            setSignupStep(step);
            if (nextFieldName) {
                setTimeout(() => {
                    const nextInput = document.querySelector(`input[name="${nextFieldName}"]`) as HTMLInputElement;
                    if (nextInput) {
                        nextInput.focus();
                        nextInput.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start',
                            inline: 'nearest'
                        });
                    }
                }, 100);
            }
        };

        const shouldProceed =
            (e.type === 'blur' || e.type === "focusout") ||
            ((e as React.KeyboardEvent).key === 'Enter' || (e as React.KeyboardEvent).key === 'Tab');

        if (shouldProceed) {
            if (e.type !== 'blur') {
                e.preventDefault();
            }

            if (!errors[field.name as FormFieldName] && field.value.trim()) {
                if (asyncValidator) {
                    try {
                        const isValid = await asyncValidator(field.value);
                        if (!isValid) {
                            toast.error(`다른 회원이 이미 사용 중입니다.`);
                            return;
                        }
                        proceedToNextStep();
                    } catch (error) {
                        console.error("비동기 검증 실패:", error);
                        toast.error(error.message || "유효성 검사에 실패했습니다.");
                    }
                } else {
                    proceedToNextStep();
                }
            }
        }
    };

    const renderField = (
        name: FormFieldName,
        label: string,
        type: string,
        step: number,
        nextFieldName: string,
        rules: any,
        asyncValidator?: (value: string) => Promise<boolean>
    ) => (
        signupStep >= step && (
            <Controller
                key={name}
                name={name}
                control={control}
                rules={rules}
                render={({field}) => (
                    <TextField
                        {...field}
                        margin="normal"
                        fullWidth
                        label={label}
                        type={type}
                        error={!!errors[name]}
                        helperText={errors[name]?.message}
                        onKeyDown={(e) => handleValidationAndFocus(e, field, step + 1, nextFieldName, asyncValidator)}
                        onBlur={(e) => handleValidationAndFocus(e, field, step + 1, nextFieldName, asyncValidator)}
                    />
                )}
            />
        )
    );

    const onSubmit = async (data: CreateCompanyRequest) => {
        await CompanyService.create(data).then(() => {
            toast.success("회원가입이 완료되었습니다.");
            navigate("/login", {replace: true});
        }).catch(error => {
            toast.error(error.message || "회원가입에 실패했습니다.");
        })
    }

    return (
        <Container component="main" maxWidth="xs" sx={{py: 2}}>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: 'flex-start',
                py: 2
            }}>
                <Typography component="h1" variant="h4" align="center">
                    회원가입
                </Typography>
                <Paper elevation={3} sx={{padding: 4, width: "100%", mt: 4}}>
                    <Box component="form"
                         onSubmit={handleSubmit(onSubmit)}
                         sx={{mt: 1}}>
                        {renderField("name", "이름", "text", 0, "phone", {required: "이름을 입력해주세요"})}
                        {renderField("phone", "전화번호", "text", 1, "email",
                            {
                                required: "전화번호를 입력해주세요",
                                pattern: {
                                    value: /^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/,
                                    message: "올바른 전화번호 형식을 입력해주세요"
                                }
                            }, (value) => CompanyService.isAvailablePhone(value))
                        }
                        {renderField("email", "이메일", "email", 2, "password", {
                            required: "이메일을 입력해주세요",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "올바른 이메일 형식을 입력해주세요"
                            }
                        }, (value) => CompanyService.isAvailableEmail(value))}
                        {renderField("password", "비밀번호", "password", 3, "passwordConfirm", {
                            required: "비밀번호를 입력해주세요",
                            minLength: {value: 6, message: "비밀번호는 최소 6자 이상이어야 합니다"}
                        })}
                        {renderField("passwordConfirm", "비밀번호 확인", "password", 4, "", {
                            required: "비밀번호 확인을 입력해주세요",
                            validate: (value: string) => value === getValues().password || "비밀번호가 일치하지 않습니다"
                        })}
                        {signupStep > 3 && (
                            <Button type="submit" fullWidth variant="contained" sx={{mt: 3, mb: 2}}
                                    disabled={!isValid || isSubmitting}>
                                회원가입
                            </Button>
                        )}
                        <ToastContainer position={"bottom-center"} hideProgressBar theme={"dark"}/>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
};

export default SignUp;
