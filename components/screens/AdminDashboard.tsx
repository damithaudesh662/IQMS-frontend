import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from '@react-navigation/native';


type RootStackParamList = {
  
  AdminDashboard: undefined; // Add the CreateUserAccount screen type
};

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "AdminDashboard"
>;
const AdminDashboard = () => {
    const navigation = useNavigation<HomeScreenNavigationProp>();
    
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>
      <Text style={styles.subtitle}>Welcome, Admin!</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eef',
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

export default AdminDashboard;
