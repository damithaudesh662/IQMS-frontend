import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import SignInScreen from "../screens/SignInScreen";
import CreateUserAccount from "../screens/CreateUserAccount"; // Import your CreateUserAccount screen
import CreateAdminAccount from "../screens/CreateAdminAccount"; // Import your CreateAdminAccount screen
import AdminDashboard from "../screens/AdminDashboard"; // Import your AdminDashboard screen
import UserDashboard from "../screens/UserDashboard"; // Import your UserDashboard screen
import AdminProfileScreen from "../screens/AdminProfile"; // Import your AdminProfile screen
import AdminCreateQueueScreen from "../screens/AdminCreateQueue";
import QueueCardsScreen from "../screens/QueueCardsScreen";
import QueueDetailsScreen from "../screens/QueueDetailsScreen";
import InstituteMarketPlace from "../screens/InstituteMarketPlace";
export type RootStackParamList = {
  Home: undefined;
  SignIn: undefined;
  CreateUserAccount: undefined;
  CreateAdminAccount: undefined;
  UserDashboard: undefined; // Add the UserDashboard screen type
  AdminDashboard: undefined; // Add the AdminDashboard screen type
  AdminProfileScreen: undefined; // Add the AdminProfile screen type
  AdminCreateQueueScreen: undefined;
  QueueCardsScreen: undefined;
  QueueDetailsScreen: undefined;
  InstituteMarketPlace: undefined;
  CustomizePlatformScreen: undefined; 
  // Add other screens here as needed
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#f7f7f7" },
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="CreateUserAccount" component={CreateUserAccount} />
      <Stack.Screen name="CreateAdminAccount" component={CreateAdminAccount} />
      <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
      <Stack.Screen name="UserDashboard" component={UserDashboard} />
      <Stack.Screen name="AdminProfileScreen" component={AdminProfileScreen} />
      <Stack.Screen
        name="AdminCreateQueueScreen"
        component={AdminCreateQueueScreen}
      />
      <Stack.Screen name="QueueCardsScreen" component={QueueCardsScreen} />
      <Stack.Screen name="QueueDetailsScreen" component={QueueDetailsScreen} />
      <Stack.Screen
        name="InstituteMarketPlace"
        component={InstituteMarketPlace}
      />
      <Stack.Screen name="CustomizePlatformScreen" component={AdminDashboard} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
