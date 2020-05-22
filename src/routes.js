import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import SelectProvider from './pages/New/SelectProvider';
import SelectDateTime from './pages/New/SelectDateTime';
import Confirm from './pages/New/Confirm';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function New({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTransparent: true,
        headerTintColor: '#fff',
        headerLeftContainerStyle: {
          marginLeft: 20,
        },
      }}
    >
      <Stack.Screen
        options={{
          title: 'Selecione o prestador',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Dashboard');
              }}
            >
              <Icon name="chevron-left" size={25} color="#fff" />
            </TouchableOpacity>
          ),
        }}
        name="SelectProvider"
        component={SelectProvider}
      />

      <Stack.Screen
        options={{
          title: 'Selecione o horário',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('SelectProvider');
              }}
            >
              <Icon name="chevron-left" size={25} color="#fff" />
            </TouchableOpacity>
          ),
        }}
        name="SelectDateTime"
        component={SelectDateTime}
      />

      <Stack.Screen
        options={{
          title: 'Confirmar agendamento',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('SelectDateTime');
              }}
            >
              <Icon name="chevron-left" size={25} color="#fff" />
            </TouchableOpacity>
          ),
        }}
        name="Confirm"
        component={Confirm}
      />
    </Stack.Navigator>
  );
}

export default function Routes() {
  const signed = useSelector((state) => state.auth.signed);

  return (
    <NavigationContainer>
      {!signed ? (
        <Stack.Navigator
          initialRouteName="SignIn"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
      ) : (
        <Tab.Navigator
          initialRouteName="Dashboard"
          tabBarOptions={{
            activeTintColor: '#fff',
            activeBackgroundColor: '#8d41a8',
            inactiveBackgroundColor: '#8d41a8',
            inactiveTintColor: 'rgba(255,255,255,0.6)',
            keyboardHidesTabBar: true,
          }}
        >
          <Tab.Screen
            name="Dashboard"
            options={{
              tabBarLabel: 'Agendamentos',
              tabBarIcon: ({ color }) => (
                <Icon name="event" size={20} color={color} />
              ),
            }}
            component={Dashboard}
          />
          <Tab.Screen
            name="New"
            options={{
              tabBarLabel: 'Agendar',
              tabBarIcon: ({ color }) => (
                <Icon name="add-circle-outline" size={20} color={color} />
              ),
              tabBarVisible: false,
              unmountOnBlur: true,
            }}
            component={New}
          />
          <Tab.Screen
            name="Profile"
            options={{
              tabBarLabel: 'Meu perfil',
              tabBarIcon: ({ color }) => (
                <Icon name="person" size={20} color={color} />
              ),
            }}
            component={Profile}
          />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
}
