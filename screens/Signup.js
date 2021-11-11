import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';

//formik
import {Formik} from 'formik';

//icons
import {Octicons, Ionicons} from '@expo/vector-icons';

//DateTimePicker
import DateTimePicker from '@react-native-community/datetimepicker';

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
import {View, TouchableOpacity, ActivityIndicator} from 'react-native';


const Signup = ({navigation}) => {
    const[hidePassword, setHidePassword] = useState(true);
    const[show, setShow] = useState(false);
    const[date, setDate] = useState(new Date(2000, 0, 1));
    const[message, setMessage] = useState();
    const[messageType, setMessageType] = useState();

    //user date of birth
    const[dob, setDob] = useState();

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
        setDob(currentDate);
    }
    const showDatePicker = () => {
        setShow(true);
    }

    //form handling
    const handleSignup = (credentials, setSubmitting) => {
        handleMessage(null);
         const url = 'https://damp-badlands-46459.herokuapp.com/https://pacific-mountain-43409.herokuapp.com/user/signup';

         axios
         .post(url, credentials)
         .then((response) => {
            const result = response.data;
            console.log("this is the response",response);
            const {status, message, data} = result;

            if(status != 'SUCCESS') {
                handleMessage(message, status);
            } else {
                navigation.navigate('Welcome', {...data});
            }
            setSubmitting(false);
         }).catch(error => {
            //  console.log(error.JSON());
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
                    {show && (
                        <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode='date'
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                        />
                    )}
                    <Formik
                    initialValues={{name: '', email: '', dateOfBirth: '', password: '', confirmPassword: ''}}
                    onSubmit={(values, {setSubmitting}) => {
                        values = {...values, dateOfBirth: dob};
                        if(values.name == '' || values.email == '' || values.dateOfBirth == '' || values.password == '' || values.confirmPassword == ''){
                            handleMessage('Please fill all the fields');
                            setSubmitting(false);
                        } else if(values.password !== values.confirmPassword) {
                            handleMessage('Passwords do not match');
                            setSubmitting(false);
                        }else {
                            handleSignup(values, setSubmitting);
                        }
                    }}
                    >{({handleChange, handleBlur, handleSubmit, values, isSubmitting}) => (
                    <StyledFormArea>
                        <MyTextInput 
                        label="Full Name"
                        icon="person"
                        placeholder="Caspian Barnes"
                        placeholderTextColor={Colors.darkLight}
                        onChangeText={handleChange('name')}
                        onBlur={handleBlur('name')}
                        value={values.name}
                        />
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
                        label="Date of Birth"
                        icon="calendar"
                        placeholder="MM/DD/YYYY"
                        placeholderTextColor={Colors.darkLight}
                        onChangeText={handleChange('dateOfBirth')}
                        onBlur={handleBlur('dateOfBirth')}
                        value={dob ? dob.toDateString() : ''}
                        isDate={true}
                        editable={false}
                        showDatePicker={showDatePicker}
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
                        <MyTextInput 
                        label="Confirm Password"
                        icon="lock"
                        placeholder="* * * * * * * * * *"
                        placeholderTextColor={Colors.darkLight}
                        onChangeText={handleChange('confirmPassword')}
                        onBlur={handleBlur('confirmPassword')}
                        value={values.confirmPassword}
                        secureTextEntry={hidePassword}
                        isPassword={true}
                        hidePassword={hidePassword}
                        setHidePassword={setHidePassword}
                        />
                        <MessageBox type={messageType}>{message}</MessageBox>
                        

                        {!isSubmitting && (
                        <StyledButton onPress={handleSubmit}>
                        <ButtonText>Signup</ButtonText>
                        </StyledButton>)}

                        {isSubmitting && (
                        <StyledButton disabled={true}>
                            <ActivityIndicator size="large" color={Colors.primary} />
                        </StyledButton>)}
                        <Line />
                        <ExtraView>
                            <ExtraText>Already have an account? </ExtraText>
                            <TextLink onPress={() => navigation.navigate('Login')}>
                                <TextLinkContent>Login</TextLinkContent>
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

const MyTextInput = ({label, icon, isPassword, hidePassword, setHidePassword, isDate, showDatePicker, ...props}) => {
    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={Colors.brand}/>
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            {!isDate && <StyledTextInput {...props} />}
            {isDate && (
                <TouchableOpacity onPress={showDatePicker}>
                    <StyledTextInput {...props} />
                </TouchableOpacity>
            )}
            {isPassword && (
                <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={Colors.darkLight}/>
                </RightIcon>
            )}
        </View>
    )
}

export default Signup;