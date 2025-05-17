import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { Checkbox } from "react-native-paper";

const allQueueTypes = ["General", "Priority", "Express", "VIP"];

const CustomizePlatformScreen = () => {
  const [logoUri, setLogoUri] = useState<string | null>(null);
  const [themeColor, setThemeColor] = useState("#4A90E2");
  const [selectedQueueTypes, setSelectedQueueTypes] = useState<string[]>(["General"]);
  const [slotSize, setSlotSize] = useState("15");

  const pickImage = async () => {
    const result = await launchImageLibrary({
      mediaType: "photo",
      includeBase64: true,
      quality: 1,
    });

    if (result.assets && result.assets.length > 0) {
      const asset = result.assets[0];
      if (asset.type === "image/png" && asset.uri) {
        setLogoUri(asset.uri);
        // Save base64 or file to DB here
      } else {
        Alert.alert("Only PNG files are allowed.");
      }
    }
  };

  const toggleQueueType = (type: string) => {
    setSelectedQueueTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  };

  const handleSave = () => {
    const payload = {
      logoUri,
      themeColor,
      queueTypes: selectedQueueTypes,
      slotSize,
    };

    console.log("Saving customization:", payload);
    Alert.alert("Saved", "Your platform settings have been saved.");
    // Send to backend here
  };

  return (
    <ScrollView className="flex-1 bg-white p-5">
      <Text className="text-2xl font-bold mb-6 text-center text-gray-800">
        Customize Platform
      </Text>

      {/* Logo Upload */}
      <View className="mb-6">
        <Text className="text-base font-semibold text-gray-700 mb-2">Platform Logo</Text>
        {logoUri ? (
          <Image source={{ uri: logoUri }} className="w-24 h-24 mb-2 rounded" />
        ) : (
          <Text className="text-sm text-gray-500 mb-2">No logo selected</Text>
        )}
        <TouchableOpacity onPress={pickImage} className="bg-blue-600 px-4 py-2 rounded">
          <Text className="text-white text-center font-medium">Upload PNG Logo</Text>
        </TouchableOpacity>
      </View>

      {/* Theme Color */}
      <View className="mb-6">
        <Text className="text-base font-semibold text-gray-700 mb-2">Theme Color</Text>
        <TextInput
          value={themeColor}
          onChangeText={setThemeColor}
          placeholder="#4A90E2"
          className="border border-gray-300 rounded p-3"
        />
      </View>

      {/* Queue Types */}
      <View className="mb-6">
        <Text className="text-base font-semibold text-gray-700 mb-2">Queue Types</Text>
        {allQueueTypes.map((type) => (
          <TouchableOpacity
            key={type}
            className="flex-row items-center mb-2"
            onPress={() => toggleQueueType(type)}
          >
            <Checkbox
              status={selectedQueueTypes.includes(type) ? "checked" : "unchecked"}
            />
            <Text className="ml-2 text-gray-800">{type}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Slot Size */}
      <View className="mb-6">
        <Text className="text-base font-semibold text-gray-700 mb-2">
          Default Slot Size (minutes)
        </Text>
        <TextInput
          value={slotSize}
          onChangeText={setSlotSize}
          keyboardType="numeric"
          placeholder="15"
          className="border border-gray-300 rounded p-3"
        />
      </View>

      {/* Save Button */}
      <TouchableOpacity
        onPress={handleSave}
        className="bg-green-600 py-4 rounded-xl mt-4 shadow-md"
      >
        <Text className="text-white text-center font-semibold text-lg">Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CustomizePlatformScreen;
