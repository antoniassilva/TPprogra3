import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import Register from "../screens/Register";
import BottomTabs from './BottomTabs'

const Stack = createNativeStackNavigator();

function StackNavigation() {
    return(
        <Stack.Navigator>
                        
             <Stack.Screen
                name='Login'
                component={Login}
                options={{
                    headerShown:false
                }}
            />
            <Stack.Screen 
            name="Register" 
            component={Register} 
            options={
                { headerShown: false

            }} 
            />
            
            <Stack.Screen
                name='Tab'
                component={BottomTabs}
                options={{
                    headerShown:false
                }}
            />
        </Stack.Navigator>
    )
}

export default StackNavigation