import React from 'react';
import { StatusBar } from 'expo-status-bar';
import Game from './Gameplay';
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


const Welcome = ({navigation, route}) => {
    const {name, email} = route.params;

    return (
        <>
            <StatusBar style="dark"/>
            <InnerContainer>
                <WelcomeContainer>
                    <PageTitle welcome={true}>Welcome to Sport Smash!</PageTitle>
                    <SubTitle welcome={true}>{name}</SubTitle>
                    <SubTitle welcome={true}>{email}</SubTitle>
                    <StyledFormArea>
                        <Line />
                        <StyledButton onPress={() => {navigation.navigate('Game')}}>
                            <ButtonText>Play Game</ButtonText>
                        </StyledButton>
                        <StyledButton onPress={() => {navigation.navigate('Login')}}>
                            <ButtonText>Logout</ButtonText>
                        </StyledButton>
                    </StyledFormArea>
                </WelcomeContainer>
            </InnerContainer>
        </>
    );
}

export default Welcome;