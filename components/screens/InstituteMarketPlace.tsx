import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as instituteService from "../../services/instituteService";

type Institute = {
  id: string;
  institute_name: string;
  field: string;
  address: string;
};

type RootStackParamList = {
  InstituteMarketPlace: undefined;
  InstituteScreen: { institute: Institute };
};

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "InstituteMarketPlace"
>;

// const institutes: Institute[] = [
//   {
//     id: "1",
//     name: "Sunrise General Hospital",
//     field: "Healthcare",
//   },
//   {
//     id: "2",
//     name: "Evergreen Medical Center",
//     field: "General Medicine",
//   },
//   {
//     id: "3",
//     name: "City Heart Hospital",
//     field: "Cardiology",
//   },
//   {
//     id: "4",
//     name: "Pet Wellness Clinic",
//     field: "Veterinary Medicine",
//   },
//   {
//     id: "5",
//     name: "Green Paws Vet Center",
//     field: "Animal Health",
//   },
// ];

export default function InstituteMarketPlace() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [institutes, setInstitutes] = useState<Institute[]>([]);

  useEffect(() => {
    const fetchInstitutes = async () => {
      const institutes = await instituteService.getAllInstitutes();
      setInstitutes(institutes);
    };

    fetchInstitutes();
  }, []);

  const renderInstituteCard = ({ item }: { item: Institute }) => {
    return (
      <TouchableOpacity
        style={styles.card}
        // onPress={() =>
        //   navigation.navigate("InstitueScreen", { queue: item })
        // }
        onPress={() =>
          navigation.navigate("InstituteScreen", { institute: item })
        }
      >
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{item.institute_name}</Text>
          <Text style={styles.cardDescription}>{item.field}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Institutes</Text>
      <FlatList
        data={institutes}
        renderItem={renderInstituteCard}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  pageTitle: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  card: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
  },
  cardHeader: { flexDirection: "row", justifyContent: "space-between" },
  cardTitle: { fontSize: 18, fontWeight: "600" },
  cardDescription: { fontSize: 12, fontWeight: "200" },
});
