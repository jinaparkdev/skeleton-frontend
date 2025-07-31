import {SvgIcon, SvgIconProps} from '@mui/material';
import React from 'react';

const LogoIcon = (props: SvgIconProps) => {

    // assets/image/test.svg 이걸 불러와서 SvgIcon으로 렌더링하는 컴포넌트

    return (<SvgIcon {...props} viewBox="0 0 438 540">
        <image href={require('../../assets/image/test.svg').default} width="438" height="540"/>
    </SvgIcon>)
};

export default LogoIcon;
