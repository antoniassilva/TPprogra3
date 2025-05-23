import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Crear from '../screens/Crear';
import Perfil from '../screens/Perfil';
import { FontAwesome } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen 
        name='Home' 
        component={Home}
        options={{
          tabBarIcon: () => <FontAwesome name='home' size={24} color={'black'} />
        }}
      />
      <Tab.Screen 
        name='Crear' 
        component={Crear}
        options={{
          tabBarIcon: () => <FontAwesome name='plus-circle' size={24} color={'black'} />
        }}
      />

      <Tab.Screen 
        name='Perfil' 
        component={Perfil}
        options={{
          tabBarIcon: () => <FontAwesome name='user' size={24} color={'black'} />
        }}
      />
      
    </Tab.Navigator>
  );
}