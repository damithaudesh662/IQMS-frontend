import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Image, SafeAreaView, Text, View } from "react-native";
import QueueTable from "../institute/QueueTable";

type RootStackParamList = {
  InstituteScreen: undefined; // Add the CreateUserAccount screen type
};

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "InstituteScreen"
>;
const InstituteScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  return (
    <SafeAreaView>
      <View className="flex-row items-center space-x-4">
        <Image
          source={require("../../assets/AIESEC-Human-Blue.png")}
          className="w-20 h-20 rounded-full m-10"
        />

        {/* Text Details */}
        <View className="flex-1">
          <Text className="text-xl font-semibold text-gray-800">
            AIESEC in University of Moratuwa
          </Text>
          <Text className="text-base text-gray-600">Moratuwa, Sri Lanka</Text>
        </View>
      </View>
      <QueueTable />
    </SafeAreaView>
  );
};

export default InstituteScreen;
