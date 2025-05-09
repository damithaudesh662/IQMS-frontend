import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Institute = {
  id: string;
  name: string;
  field: string;
};

type RootStackParamList = {
  InstituteMarketPlace: undefined;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "InstituteMarketPlace"
>;

const institutes: Institute[] = [
  {
    id: "1",
    name: "Sunrise General Hospital",
    field: "Healthcare",
  },
  {
    id: "2",
    name: "Evergreen Medical Center",
    field: "General Medicine",
  },
  {
    id: "3",
    name: "City Heart Hospital",
    field: "Cardiology",
  },
  {
    id: "4",
    name: "Pet Wellness Clinic",
    field: "Veterinary Medicine",
  },
  {
    id: "5",
    name: "Green Paws Vet Center",
    field: "Animal Health",
  },
];

export default function InstituteMarketPlace() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const renderInstituteCard = ({ item }: { item: Institute }) => {
    return (
      <TouchableOpacity
        style={styles.card}
        // onPress={() =>
        //   navigation.navigate("QueueDetailsScreen", { queue: item })
        // }
      >
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <Text style={styles.cardDescription}>{item.field}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.pageTitle}>Institutes</Text>
        <FlatList
          data={institutes}
          renderItem={renderInstituteCard}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
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
