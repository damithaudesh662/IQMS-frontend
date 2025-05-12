import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import { Institute } from "@/interfaces/Institute";
import AdminCreateQueueScreen from "../screens/AdminCreateQueue";
import AdminDashboard from "../screens/AdminDashboard"; // Import your AdminDashboard screen
import AdminProfileScreen from "../screens/AdminProfile"; // Import your AdminProfile screen
import CreateAdminAccount from "../screens/CreateAdminAccount"; // Import your CreateAdminAccount screen
import CreateUserAccount from "../screens/CreateUserAccount"; // Import your CreateUserAccount screen
import HomeScreen from "../screens/HomeScreen";
import InstituteMarketPlace from "../screens/InstituteMarketPlace";
import InstituteScreen from "../screens/InstituteScreen";
import QueueCardsScreen from "../screens/QueueCardsScreen";
import QueueDetailsScreen from "../screens/QueueDetailsScreen";
import QueueSlotsScreen from "../screens/QueueSlotsScreen";
import SignInScreen from "../screens/SignInScreen";
import UserDashboard from "../screens/UserDashboard"; // Import your UserDashboard screen
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
  InstituteScreen: { institute: Institute };
  QueueSlotsScreen: {
    id: string;
    totalSlots: number;
    unavailableSlots: number[];
  };
  // Add other screens here as needed
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = ({ session, role }: { session: any; role: any }) => {
  const isSignedIn = !!session;
  return (
    <Stack.Navigator
      initialRouteName={
        !isSignedIn
          ? "Home"
          : role === "admin"
          ? "AdminDashboard"
          : "UserDashboard"
      }
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#f7f7f7" },
      }}
    >
      {!isSignedIn ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen
            name="CreateUserAccount"
            component={CreateUserAccount}
          />
          <Stack.Screen
            name="CreateAdminAccount"
            component={CreateAdminAccount}
          />
        </>
      ) : role === "admin" ? (
        <>
          <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
          <Stack.Screen
            name="AdminProfileScreen"
            component={AdminProfileScreen}
          />
          <Stack.Screen
            name="AdminCreateQueueScreen"
            component={AdminCreateQueueScreen}
          />
          <Stack.Screen
            name="CustomizePlatformScreen"
            component={AdminDashboard}
          />
          <Stack.Screen name="QueueCardsScreen" component={QueueCardsScreen} />
          <Stack.Screen
            name="QueueDetailsScreen"
            component={QueueDetailsScreen}
          />
        </>
      ) : (
        <>
          <Stack.Screen name="UserDashboard" component={UserDashboard} />
          <Stack.Screen name="QueueSlotsScreen" component={QueueSlotsScreen} />
          <Stack.Screen name="InstituteScreen" component={InstituteScreen} />
          <Stack.Screen
            name="InstituteMarketPlace"
            component={InstituteMarketPlace}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
