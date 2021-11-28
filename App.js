import { StatusBar } from 'expo-status-bar';
import React from 'react';
//import * as React from 'react';

//react navigation stack
//import RootStack from './navigators/RootStack';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from './screens/Welcome';
import Signup from './screens/Signup';
import Gameplay from './screens/Gameplay';
import Login from './screens/Login'
import gameMusic from './music/gameMusic.mp3';
import RootStack from './navigators/RootStack';
import './app.css'
const Stack = createNativeStackNavigator();

/*const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
         name ="Gameplay"
         component={Login} 
         />
         <Stack.Screen name = "Sign" component={Signup}/>
      </Stack.Navigator>
    
    </NavigationContainer>
  );
};*/
   

//export default App;
export default function App() {
  return <RootStack />
}

///I did a few chnages to the application 