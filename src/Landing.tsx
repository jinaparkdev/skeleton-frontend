import * as React from 'react';
import {
    AppBar,
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Grid,
    Toolbar,
    Typography,
} from '@mui/material';
import {styled} from '@mui/material/styles';
import {useNavigate} from 'react-router';
import {useRecoilValue} from 'recoil';
import {currentCompanyState} from "./state/companyState";
import {useEffect} from 'react';

const HeroSection = styled(Box)(() => ({
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    color: 'white',
    backgroundImage: 'url(assets/image/landing_sub.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
}));

const FeatureCard = styled(Card)(() => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.2s',
    '&:hover': {
        transform: 'translateY(-5px)',
    },
}));

const Landing = () => {

    const navigate = useNavigate();
    const currentCompany = useRecoilValue(currentCompanyState);

    useEffect(() => {
        if (currentCompany) {
            navigate('/mode');
        }
    }, [currentCompany, navigate]);

    return (
        <>
            {/* Header */}
            <AppBar position="fixed">
                <Toolbar>
                    <Button sx={{marginLeft: 'auto'}} color="inherit"
                            onClick={() => navigate('/login')}
                    >로그인</Button>
                </Toolbar>
            </AppBar>

            {/* Hero Section */}
            <HeroSection>
                <Container>
                    <Grid container spacing={4} alignItems="center">
                        <Grid size={{xs: 12, md: 12}}>
                            <Typography variant="h2" gutterBottom>
                                Hub-T:<br/>한 잔의 차처럼 편안하게
                            </Typography>
                            <Typography variant="h5">
                                체육관 관리의 모든 것<br/>Hub-T에서
                            </Typography>
                            <Box sx={{mt: 4}}>
                                <Button
                                    variant="contained"
                                    size="large"
                                    sx={{mr: 2}}
                                    onClick={() => navigate('/login')}
                                >
                                    시작하기
                                </Button>
                                <Button variant="outlined" size="large"
                                        sx={{color: 'white', borderColor: 'white'}}
                                        onClick={() => {
                                            const featureSection = document.getElementById('features');
                                            if (featureSection) {
                                                featureSection.scrollIntoView({behavior: 'smooth'});
                                            }
                                        }}
                                >
                                    더 알아보기
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </HeroSection>

            {/* Features Section */}
            <Box sx={{py: 8, bgcolor: 'grey.50'}} id="features">
                <Container maxWidth="lg">
                    <Typography variant="h3" component="h2" align="center" gutterBottom>
                        주요 기능
                    </Typography>
                    <Typography variant="h6" align="center" color="text.secondary">
                        무료로 제공하는 핵심 서비스들을 확인해보세요
                    </Typography>

                    <Grid container spacing={4} sx={{mt: 4}} justifyContent="center"
                          alignItems="center">
                        {[
                            {
                                title: '회원 관리',
                                description: '회원 정보를 쉽게 관리하고 분석할 수 있습니다.',
                            },
                            {
                                title: '멤버십 관리',
                                description: '다양한 멤버십 옵션을 제공하고 관리할 수 있습니다.',
                            },
                        ].map((feature, index) => (
                            <Grid size={{xs: 12, md: 4}} key={index}> <FeatureCard>
                                <CardContent>
                                    <Typography variant="h5" component="h3" gutterBottom>
                                        {feature.title}
                                    </Typography>
                                    <Typography color="text.secondary">
                                        {feature.description}
                                    </Typography>
                                </CardContent>
                            </FeatureCard>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* Footer */}
            <Box sx={{py: 4, bgcolor: 'grey.900', color: 'white'}}>
                <Container maxWidth="lg">
                    <Typography variant="body2" align="center">
                        © 2024 Hub-T. All rights reserved.
                    </Typography>
                </Container>
            </Box>
        </>
    );
};

export default Landing;
