import React from 'react';
import { StatusBar } from 'expo-status-bar';

import {
    InnerContainer,
    PageTitle,
    SubTitle,
    StyledFormArea,
    StyledButton,
    ButtonText,
    Line,
    WelcomeContainer
} from './../components/styles';

const Welcome = () => {

    return (
        <>
            <StatusBar style="dark"/>
            <InnerContainer>
                <WelcomeContainer>
                    <PageTitle welcome={true}>Welcome to Sport Smash!</PageTitle>
                    <SubTitle welcome={true}>Caspian Barnes</SubTitle>
                    <SubTitle welcome={true}>caspian21@gmail.com</SubTitle>
                    <StyledFormArea>
                        <Line />
                        <StyledButton onPress={() => {}}>
                            <ButtonText>Logout</ButtonText>
                        </StyledButton>
                    </StyledFormArea>
                </WelcomeContainer>
            </InnerContainer>
        </>
    );
}

export default Welcome;