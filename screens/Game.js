import React from 'react';
import { StatusBar } from 'expo-status-bar';
import Welcome from './../screens/Welcome';
import SwappableGrid from "../components/SwappableGrid";
import { Dimensions } from 'react-native';
import { ImageBackground, StyleSheet, Text, View } from "react-native";

let playButton = require("../assets/PlayButton.png");
let justClouds = require("../assets/CloudsBackground.png");

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
            <View style={styles.backGroundImage}>
                <ImageBackground source={justClouds} style={styles.backGroundImage}>
                    <SwappableGrid/>
                </ImageBackground>
            </View>
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

let Window = Dimensions.get("window");
let windowSpan = Math.min(Window.width, Window.height);
let colored = true;
let TILE_WIDTH = windowSpan / 6;

let windowWidth = Window.width;
let windowHeight = Window.height;

let blue = colored ? "#3c44d8" : "#ffffff";
let red = colored ? "#f24646" : "#ffffff";
let yellow = colored ? "#faff7f" : "#ffffff";
let green = colored ? "#168e3a" : "#ffffff";
let orange = colored ? "#ea0e62" : "#ffffff";
let pink = colored ? "#ff51f3" : "#ffffff";
let white = "#ffffff";

let styles = StyleSheet.create({
  backGroundImage: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

});

export default Game;