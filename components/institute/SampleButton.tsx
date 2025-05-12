import { Text, TouchableOpacity } from "react-native";

interface BtnProps {
  title: String;
  onPress: () => void;
}

function SampleButton({ title, onPress }: BtnProps) {
  return (
    <TouchableOpacity
      className="bg-foreground px-4 py-2 rounded-md"
      onPress={onPress}
    >
      <Text className="text-background font-semibold">{title}</Text>
    </TouchableOpacity>
  );
}

export default SampleButton;
