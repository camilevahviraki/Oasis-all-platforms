// screens/TabsNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export default function AdminRoutes() {
  return (
    <Tab.Navigator initialRouteName="Dashboard">
      {/* <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} /> */}
    </Tab.Navigator>
  );
}
