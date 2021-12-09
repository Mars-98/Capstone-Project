import styled from 'styled-components/native';
import Constants from 'expo-constants';
const statusBarHeight = Constants.statusBarHeight;
//colors 
export const Colors = {
    primary: "#ffffff",
    secondary: "#E5E7EB",
    tertiary: "#1F2937",
    darkLight: "#9CA3AF",
    brand: "#041f41",
    green: "#10B981",
    red: "#EF4444"
};

const {primary, secondary, tertiary, darkLight, brand, green, red} = Colors;

export const StyledContainer = styled.View`
    flex: 1;
    padding: 25px;
    padding-top; ${statusBarHeight + 30}px;
    background-color: ${primary};
`;

export const InnerContainer = styled.View`
    flex: 1;
    width: 100%;
    align-items: center;
`;

export const WelcomeContainer = styled(InnerContainer)`
    padding: 25px;
    padding-top: 10px;
    justify-content: center;
`;

export const PageTitle = styled.Text`
    font-size: 30px;
    text-align: center;
    font-weight: bold;
    color: ${brand};
    padding-bottom: 15px;
    padding; 10px;

    ${(props) => props.welcome &&`
        font-size: 35px;
    `}
`;

export const SubTitle = styled.Text`
    font-size: 15px;
    margin-bottom: 10px;
    letter-spacing: 1px;
    font-weight: bold;
    color: ${tertiary};
`;

export const StyledFormArea = styled.View`
    width: 90%;
`;

export const StyledTextInput = styled.TextInput`
    background-color: ${secondary};
    padding: 15px;
    padding-left: 55px;
    padding-right: 55px;
    border-radius: 5px;
    font-size: 16px;
    height: 60px;
    margin-vertical: 3px;
    margin-bottom: 10px;
    color: ${tertiary};
`;

export const StyledInputLabel = styled.Text`
    color: ${tertiary};
    font-size: 13px;
    text-align: left;
`;

export const LeftIcon = styled.View`
    left: 15px;
    top: 34px;
    position: absolute;
    z-index: 1;
`;

export const RightIcon = styled.TouchableOpacity`
    right: 15px;
    top: 38px;
    position: absolute;
    z-index: 1;
`;

export const StyledButton = styled.TouchableOpacity`
    padding: 15px;
    background-color: ${brand};
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    margin-vertical: 5px;
    height: 60px;
`;
export const StyledLogoutButton = styled.TouchableOpacity`
    background-color: ${primary};
    border-radius: 5px;
    position: absolute;
    top: 10px;
    right: 5px;
    padding: 15px;
    justify-content: center;
`;
export const ButtonTextLogout = styled.Text`
    color: ${brand};
    font-size: 16px;
`;

export const ButtonText = styled.Text`
    color: ${primary};
    font-size: 16px;
`;

export const MessageBox = styled.Text`
    text-align: center;
    margin-top: 5px;
    padding-bottom: 10px;
    font-size: 13px;
    color: ${props => props.type == 'SUCCESS' ? green : red};
`;

export const Line = styled.View`
    height: 1px;
    width: 100%;
    background-color: ${darkLight};
    margin-vertical: 10px;
`;

export const ExtraView = styled.View`
    justify-content: center;
    flex-direction: row;
    align-items: center;
    padding: 10px;
`;

export const ExtraText = styled.Text`
    justify-content: center;
    align-content: center;
    color: ${tertiary};
    font-size: 15px;
`;

export const TextLink = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
`;

export const TextLinkContent = styled.Text`
    color: ${brand};
    font-size: 15px;
`;