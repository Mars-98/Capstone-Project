import React from 'react';
import { StatusBar } from 'expo-status-bar';
import Welcome from './../screens/Welcome';
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


const Game = ({navigation, route}) => {
    return (
        <>
            <StatusBar style="dark"/>
            <InnerContainer>
                <WelcomeContainer>
                    <PageTitle welcome={true}>Let's Play Sport Smash!</PageTitle>
                    <StyledFormArea>
                        <Line />
                        <StyledButton onPress={() => {navigation.navigate('Login')}}>
                            <ButtonText>Logout</ButtonText>
                        </StyledButton>
                    </StyledFormArea>
                </WelcomeContainer>
            </InnerContainer>
        </>
    );
}

export default Game;