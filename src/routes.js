import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Main from './pages/Main';
import AddPoint from './pages/AddPoint';


const Stack = createStackNavigator();

const Routes = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerTintColor: "#ffffff",
        headerStyle: {
          backgroundColor: "green",
        },
      }} initialRouteName="Main">
        <Stack.Screen
          name="Main"
          component={Main}
          options={
            {
              title: "LyfeMap",
              headerTitleAlign: "center",
            }
          } />
        <Stack.Screen
          name="AddPoint"
          component={AddPoint}
          options={
            {
              title: "New Place",
              headerTitleAlign: "center",
            }
          } />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;