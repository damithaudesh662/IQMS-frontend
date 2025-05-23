import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import { Institute } from "@/interfaces/Institute";
import { QueueItem, UserQueueViewScreenProps } from "@/interfaces/QueueItem";
import { UserProvider } from "@/utils/UserProvider";
import AdminCreateQueueScreen from "../screens/AdminCreateQueue";
import AdminDashboard from "../screens/AdminDashboard"; // Import your AdminDashboard screen
import AdminManageQueueScreen from "../screens/AdminManageQueueScreen";
import AdminProfileScreen from "../screens/AdminProfile"; // Import your AdminProfile screen
import CreateAdminScreen from "../screens/CreateAdmin";
import CreateAdminAccount from "../screens/CreateAdminAccount"; // Import your CreateAdminAccount screen
import CreateUserAccount from "../screens/CreateUserAccount"; // Import your CreateUserAccount screen
import HomeScreen from "../screens/HomeScreen";
import InstituteMarketPlace from "../screens/InstituteMarketPlace";
import InstituteScreen from "../screens/InstituteScreen";
import JoinedQueuesScreen from "../screens/JoinedQueuesScreen";
import QueueCardsScreen from "../screens/QueueCardsScreen";
import QueueDetailsScreen from "../screens/QueueDetailsScreen";
import QueueSlotsScreen from "../screens/QueueSlotsScreen";
import SignInScreen from "../screens/SignInScreen";
import UserDashboard from "../screens/UserDashboard"; // Import your UserDashboard screen
import UserProfile from "../screens/UserProfile";
import UserQueueViewScreen from "../screens/UserQueueViewScreen";
import CustomizePlatformScreen from "../screens/CustomizePlatformScreen";
export type RootStackParamList = {
  Home: undefined;
  SignIn: undefined;
  CreateUserAccount: undefined;
  CreateAdminAccount: undefined;
  UserDashboard: undefined; // Add the UserDashboard screen type
  AdminDashboard: { userID: string }; // Add the AdminDashboard screen type
  AdminProfileScreen: undefined; // Add the AdminProfile screen type
  AdminCreateQueueScreen: undefined;
  AdminManageQueueScreen: { id: string };
  QueueCardsScreen: { queues: QueueItem[]; isManage: boolean };
  QueueDetailsScreen: undefined;
  InstituteMarketPlace: undefined;
  CustomizePlatformScreen: undefined;
  InstituteScreen: { institute: Institute };
  JoinedQueuesScreen: { queues: QueueItem[] };
  UserQueueViewScreen: UserQueueViewScreenProps;
  QueueSlotsScreen: {
    id: string;
    totalSlots: number;
    unavailableSlots: number[];
  };
  UserProfile: undefined;
  CreateAdminScreen: undefined;
  // Add other screens here as needed
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = ({ session, role }: { session: any; role: any }) => {
  const isSignedIn = !!session;

  if (!isSignedIn) {
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
        <Stack.Screen
          name="CreateAdminAccount"
          component={CreateAdminAccount}
        />
      </Stack.Navigator>
    );
  }

  if (role === "admin") {
    return (
      <UserProvider>
        <Stack.Navigator
          initialRouteName="AdminDashboard"
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: "#f7f7f7" },
          }}
        >
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
            name="AdminManageQueueScreen"
            component={AdminManageQueueScreen}
          />
          <Stack.Screen name="CustomizePlatformScreen" component={CustomizePlatformScreen} />
          <Stack.Screen name="QueueCardsScreen" component={QueueCardsScreen} />
          <Stack.Screen
            name="QueueDetailsScreen"
            component={QueueDetailsScreen}
          />
          <Stack.Screen
            name="CreateAdminScreen"
            component={CreateAdminScreen}
          />
        </Stack.Navigator>
      </UserProvider>
    );
  }

  return (
    <Stack.Navigator
      initialRouteName="UserDashboard"
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#f7f7f7" },
      }}
    >
      <Stack.Screen name="UserDashboard" component={UserDashboard} />
      <Stack.Screen name="QueueSlotsScreen" component={QueueSlotsScreen} />
      <Stack.Screen name="JoinedQueuesScreen" component={JoinedQueuesScreen} />
      <Stack.Screen
        name="UserQueueViewScreen"
        component={UserQueueViewScreen}
      />
      <Stack.Screen name="InstituteScreen" component={InstituteScreen} />
      <Stack.Screen
        name="InstituteMarketPlace"
        component={InstituteMarketPlace}
      />
      <Stack.Screen name="UserProfile" component={UserProfile} />
      <Stack.Screen name="CustomizePlatformScreen" component={CustomizePlatformScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
