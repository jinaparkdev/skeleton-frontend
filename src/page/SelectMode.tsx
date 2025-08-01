import * as React from 'react';
import {Box, Button, Typography, Container} from '@mui/material';
import {Person, Dashboard} from '@mui/icons-material';
import {useNavigate} from 'react-router';

const SelectMode = () => {
    const navigate = useNavigate();

    return (
        <Container maxWidth="sm">
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                minHeight="100vh"
                gap={4}
            >
                <Typography variant="h4" component="h1" gutterBottom>
                    모드 선택
                </Typography>
                <Typography
                    variant="body1"
                    color="text.secondary"
                    gutterBottom
                    sx={{
                        wordBreak: 'keep-all',
                        whiteSpace: { xs: 'pre-line', sm: 'normal' },
                        textAlign: 'center',
                    }}
                >
                    회원 인증 화면 또는{'\n'}관리자 대시보드로 이동할 수 있습니다.
                </Typography>

                <Box display="flex" gap={3} flexDirection={{xs: 'column', sm: 'row'}}>
                    <Button
                        variant="contained"
                        size="large"
                        startIcon={<Person/>}
                        //TODO: 회원 인증 화면으로 이동
                        onClick={() => navigate('/')}
                        sx={{minWidth: 180, height: 60}}
                    >
                        회원코드입력
                    </Button>

                    <Button
                        variant="contained"
                        size="large"
                        startIcon={<Dashboard/>}
                        //TODO: 관리자 대시보드로 이동
                        onClick={() => navigate('/')}
                        color="secondary"
                        sx={{minWidth: 180, height: 60}}
                    >
                        관리자대시보드
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default SelectMode;
