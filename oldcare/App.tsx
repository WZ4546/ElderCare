import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from './components/SignIn'; // 引入 SignIn 页面
import HomePageElder from './components/HomePageElder'; // 引入 HomePage 页面
import HomePageChild from './components/HomePageChild';
import SignUp from './components/SignUp';
import Welcome from './components/Welcome';
import LinkPage from './components/LinkPage';
import VolunteerRegister from './components/VolunteerRegister';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        {/* SignIn 页面 */}
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{ headerShown: false }}  // 隐藏导航栏
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ title: 'SignUp' }}
        />
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{ title: 'SignIn' }}
        />
        {/* HomePage 页面 */}
        <Stack.Screen
          name="HomePageElder"
          component={HomePageElder}
          options={{ title: 'Elder Home' }}
        />
        <Stack.Screen
          name="HomePageChild"
          component={HomePageChild}
          options={{ title: 'Child Home' }}
        />
        <Stack.Screen
          name="LinkPage"
          component={LinkPage}
          options={{ title: 'Link Accounts' }}
        />
        <Stack.Screen
          name="VolunteerRegister"
          component={VolunteerRegister}
          options={{ title: 'Volunteer Register' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
