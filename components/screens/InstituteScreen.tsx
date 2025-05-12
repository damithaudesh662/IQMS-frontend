import { QueueGroups } from "@/interfaces/QueueItem";
import { formatQueues } from "@/utils/QueueUtil";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, Text, View } from "react-native";
import * as instituteService from "../../services/instituteService";
import QueueTable from "../institute/QueueTable";

type RootStackParamList = {
  InstituteScreen: { institute: Institute }; // Add the CreateUserAccount screen type
};

type Institute = {
  id: string;
  institute_name: string;
  field: string;
  address: string;
};

type Props = {
  route: RouteProp<RootStackParamList, "InstituteScreen">;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "InstituteScreen"
>;
const InstituteScreen: React.FC<Props> = ({ route }) => {
  const { institute } = route.params;
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [queues, setQueues] = useState<QueueGroups>({
    upcoming: [],
    ongoing: [],
  });

  useEffect(() => {
    const fetchQueues = async () => {
      const queuesList = await instituteService.getQueuesByInstituteID(
        Number(institute.id)
      );
      setQueues(formatQueues(queuesList));
    };
    fetchQueues();
  }, []);

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
            {institute.institute_name}
          </Text>
          <Text className="text-base text-gray-600">{institute.address}</Text>
        </View>
      </View>
      <QueueTable queues={queues} />
    </SafeAreaView>
  );
};

export default InstituteScreen;
