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
import {View, TouchableOpacity} from 'react-native';

const Signup = () => {
    const[hidePassword, setHidePassword] = useState(true);
    const[show, setShow] = useState(false);
    const[date, setDate] = useState(new Date(2000, 0, 1));

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
                    initialValues={{fullName: '', email: '', dateOfBirth: '', password: '', confirmPassword: ''}}
                    onSubmit={(values) => {
                        console.log(values);
                    }}
                    >{({handleChange, handleBlur, handleSubmit, values}) => (
                    <StyledFormArea>
                        <MyTextInput 
                        label="Full Name"
                        icon="person"
                        placeholder="Caspian Barnes"
                        placeholderTextColor={Colors.darkLight}
                        onChangeText={handleChange('fullName')}
                        onBlur={handleBlur('fullName')}
                        value={values.fullName}
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
                        <MessageBox>. . . </MessageBox>
                        <StyledButton onPress={handleSubmit}>
                            <ButtonText>Login</ButtonText>
                        </StyledButton>
                        <Line />
                        <ExtraView>
                            <ExtraText>Already have an account? </ExtraText>
                            <TextLink>
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