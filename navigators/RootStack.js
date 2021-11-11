import React from 'react';
// react navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//screens
import Login from './../screens/Login'
import Signup from './../screens/Signup';
import Welcome from './../screens/Welcome';
//colors
import {Colors} from './../components/styles';


const Stack = createStackNavigator();

const RootStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Login"
                screenOptions={{
                    cardStyle: {backgroundColor: Colors.primary},
                    headerStyle: {
                        backgroundColor: 'trasnparent'
                    },
                    headerTintColor: Colors.tertiary,
                    headerTransparent: true,
                    headerTitle: '',
                    headerLeftContainerStyle: {
                        paddingLeft: 20
                    }
                }}
            >
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Signup" component={Signup} />
                <Stack.Screen name="Welcome" component={Welcome} />
            </Stack.Navigator>
        </NavigationContainer>
    )
} 

export default RootStack;