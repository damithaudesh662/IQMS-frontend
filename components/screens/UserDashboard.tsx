import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from '@react-navigation/native';

type RootStackParamList = {
  
    UserDashboard: undefined; // Add the CreateUserAccount screen type
};

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "UserDashboard"
>;
const UserDashboard = () => {
    const navigation = useNavigation<HomeScreenNavigationProp>();
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>User Dashboard</Text>
      <Text style={styles.subtitle}>Welcome, User!</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#efe',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#555',
  },
});

export default UserDashboard;
