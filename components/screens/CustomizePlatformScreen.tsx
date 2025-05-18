import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Checkbox } from "react-native-paper";
import ColorPicker from 'react-native-wheel-color-picker';
import { SafeAreaView } from "react-native-safe-area-context";

const allQueueTypes = ["General", "Priority", "Express", "VIP"];

const CustomizePlatformScreen = () => {
  const [logoUri, setLogoUri] = useState<string | null>(null);
  const [themeColor, setThemeColor] = useState("#4A90E2");
  const [tempColor, setTempColor] = useState("#4A90E2");
  const [selectedQueueTypes, setSelectedQueueTypes] = useState<string[]>(["General"]);
  const [slotSize, setSlotSize] = useState("15");
  const [colorModalVisible, setColorModalVisible] = useState(false);

  const isValidHex = (hex: string) =>
    /^#([0-9A-F]{3}){1,2}$/i.test(hex.trim());

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission denied", "We need access to your media library.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      base64: true,
    });

    if (!result.canceled && result.assets.length > 0) {
      const asset = result.assets[0];
      if (asset.uri.endsWith(".png")) {
        setLogoUri(asset.uri);
      } else {
        Alert.alert("Only PNG files are allowed.");
      }
    }
  };

  const toggleQueueType = (type: string) => {
    setSelectedQueueTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
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
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
    <ScrollView
        className="flex-1 bg-white p-5"
        contentContainerStyle={{ paddingBottom: 40 }}
        keyboardShouldPersistTaps="handled"
    >
      <Text className="text-2xl font-bold mb-6 text-center text-gray-800">
        Customize Your Platform
      </Text>

      {/* Logo Upload Section */}
      <View className="bg-white rounded-xl p-5 mb-5 shadow">
        <Text className="text-base font-semibold text-gray-700 mb-3">
          Platform Logo
        </Text>
        {logoUri ? (
          <Image source={{ uri: logoUri }} className="w-24 h-24 mb-3 rounded-xl" />
        ) : (
          <Text className="text-sm text-gray-500 mb-3">No logo selected</Text>
        )}
        <TouchableOpacity
          onPress={pickImage}
          className="bg-[#4A90E2] px-4 py-3 rounded-xl"
        >
          <Text className="text-white text-center font-medium">Upload PNG Logo</Text>
        </TouchableOpacity>
      </View>

      {/* Theme Color Section */}
      <View className="bg-white rounded-xl p-5 mb-5 shadow">
        <Text className="text-base font-semibold text-gray-700 mb-3">
          Theme Color
        </Text>
        <TouchableOpacity
          onPress={() => setColorModalVisible(true)}
          className="flex-row items-center justify-between p-3 border border-gray-300 rounded-xl"
        >
          <Text className="text-gray-700 font-medium">{themeColor}</Text>
          <View
            style={{ backgroundColor: themeColor }}
            className="w-6 h-6 rounded-full border border-gray-400"
          />
        </TouchableOpacity>
      </View>

      {/* Queue Types Section */}
      <View className="bg-white rounded-xl p-5 mb-5 shadow">
        <Text className="text-base font-semibold text-gray-700 mb-3">
          Queue Types
        </Text>
        {allQueueTypes.map((type) => (
          <TouchableOpacity
            key={type}
            className="flex-row items-center mb-2"
            onPress={() => toggleQueueType(type)}
          >
            <Checkbox
              status={selectedQueueTypes.includes(type) ? "checked" : "unchecked"}
              color="#4A90E2"
            />
            <Text className="ml-2 text-gray-800">{type}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Slot Size Section */}
      <View className="bg-white rounded-xl p-5 mb-5 shadow">
        <Text className="text-base font-semibold text-gray-700 mb-3">
          Default Slot Size (minutes)
        </Text>
        <TextInput
          value={slotSize}
          onChangeText={setSlotSize}
          keyboardType="numeric"
          placeholder="15"
          className="border border-gray-300 rounded-xl p-3"
        />
      </View>

      {/* Save Button */}
      <TouchableOpacity
        onPress={handleSave}
        className="bg-[#4A90E2] py-4 rounded-xl mt-4 shadow-md"
      >
        <Text className="text-white text-center font-semibold text-lg">
          Save Changes
        </Text>
      </TouchableOpacity>

      {/* Modal for Color Picker */}
      <Modal visible={colorModalVisible} animationType="slide">
        <View className="flex-1 justify-center items-center bg-white p-4">
          <Text className="text-lg font-bold mb-4">Pick a Theme Color</Text>

          {/* Color Picker */}
          <ColorPicker
            color={tempColor}
            onColorChange={(color) => setTempColor(color)}
            thumbSize={20}
            sliderSize={30}
            noSnap={true}
            row={false}
          />

          {/* Hex Input */}
          <TextInput
            value={tempColor}
            onChangeText={(text) =>
              setTempColor(text.startsWith("#") ? text : `#${text}`)
            }
            placeholder="#4A90E2"
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={7}
            className="border border-gray-300 rounded-md px-4 py-2 mt-4 w-full"
          />

          {/* Buttons */}
          <View className="flex-row gap-10 mt-6">
            <TouchableOpacity
              onPress={() => {
                if (isValidHex(tempColor)) {
                  setThemeColor(tempColor);
                  setColorModalVisible(false);
                } else {
                  Alert.alert("Invalid", "Enter a valid hex code like #4A90E2.");
                }
              }}
              className="bg-green-600 px-4 py-2 rounded"
            >
              <Text className="text-white">Confirm</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setTempColor(themeColor);
                setColorModalVisible(false);
              }}
              className="bg-red-600 px-4 py-2 rounded"
            >
              <Text className="text-white">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
    </SafeAreaView>
  );
};

export default CustomizePlatformScreen;
