import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';

//formik
import {Formik} from 'formik';

//icons
import {Octicons, Ionicons} from '@expo/vector-icons';

//keyboard avoiding wrapper - so that keyboard doesn't block fields
import KeyboardAvoidingWrapper from './../components/keyboardAvoidingWrapper';

//API Client
import axios from 'axios';

import {
    StyledContainer,
    InnerContainer,
    PageTitle,
    SubTitle,
    StyledFormArea,
    StyledTextInput,
    LeftIcon,
    RightIcon,
    StyledInputLabel,
    StyledButton,
    ButtonText,
    Colors,
    ExtraView,
    ExtraText,
    TextLink,
    TextLinkContent,
    MessageBox,
    Line
} from './../components/styles';
import {View, ActivityIndicator} from 'react-native';

const Login = ({navigation}) => {
    const[hidePassword, setHidePassword] = useState(true);
    const[message, setMessage] = useState();
    const[messageType, setMessageType] = useState();

    const handleLogin = (credentials, setSubmitting) => {
        handleMessage(null);
         const url = 'https://damp-badlands-46459.herokuapp.com/https://pacific-mountain-43409.herokuapp.com/user/signin';

         axios
         .post(url, credentials)
         .then((response) => {
            const result = response.data;
            const {status, message, data} = result;

            if(status != 'SUCCESS') {
                handleMessage(message, status);
            } else {
                navigation.navigate('Welcome', {...data[0]});
            }
            setSubmitting(false);
         }).catch(error => {
            //console.log(error.JSON());
             setSubmitting(false);
             handleMessage("An error occured. Check your network and try again");
         })
    }

    const handleMessage = (message, type = 'FAILED') => {
        setMessage(message);
        setMessageType(type);
    }

    return (
        <KeyboardAvoidingWrapper>
            <StyledContainer>
                <StatusBar style="dark"/>
                <InnerContainer>
                    <PageTitle>Sport Smash</PageTitle>
                    <SubTitle>Account Login</SubTitle>
                    <Formik
                    initialValues={{email: '', password: ''}}
                    onSubmit={(values, {setSubmitting}) => {
                        if(values.email == '' || values.password == ''){
                            handleMessage('Please fill all the fields');
                            setSubmitting(false);
                        } else {
                            handleLogin(values, setSubmitting);
                        }
                    }}
                    >{({handleChange, handleBlur, handleSubmit, values, isSubmitting}) => (
                    <StyledFormArea>
                        <MyTextInput 
                        label="Email Address"
                        icon="mail"
                        placeholder="caspian21@gmail.com"
                        placeholderTextColor={Colors.darkLight}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                        keyboardType="email-address"
                        />
                        <MyTextInput 
                        label="Password"
                        icon="lock"
                        placeholder="* * * * * * * * * *"
                        placeholderTextColor={Colors.darkLight}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                        secureTextEntry={hidePassword}
                        isPassword={true}
                        hidePassword={hidePassword}
                        setHidePassword={setHidePassword}
                        />
                        <MessageBox type={messageType}>{message}</MessageBox>
                        {!isSubmitting && (
                        <StyledButton onPress={handleSubmit}>
                            <ButtonText>Login</ButtonText>
                        </StyledButton>)}

                        {isSubmitting && (
                        <StyledButton disabled={true}>
                            <ActivityIndicator size="large" color={Colors.primary} />
                        </StyledButton>)}

                        <Line />
                        <ExtraView>
                            <ExtraText>Don't have an account already? </ExtraText>
                            <TextLink onPress={() => navigation.navigate('Signup')}>
                                <TextLinkContent>Signup</TextLinkContent>
                            </TextLink>
                        </ExtraView>
                    </StyledFormArea>)
                    }

                    </Formik>
                </InnerContainer>
            </StyledContainer>
        </KeyboardAvoidingWrapper>
    );
}

const MyTextInput = ({label, icon, isPassword, hidePassword, setHidePassword, ...props}) => {
    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={Colors.brand}/>
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props}/>
            {isPassword && (
                <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={Colors.darkLight}/>
                </RightIcon>
            )}
        </View>
    )
}

export default Login;