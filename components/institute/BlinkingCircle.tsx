import React, { useEffect, useState } from "react";
import { Animated, ViewStyle } from "react-native";

interface BlinkingCircleProps {
  ongoing: boolean;
  style?: ViewStyle;
}

const BlinkingCircle: React.FC<BlinkingCircleProps> = ({ ongoing, style }) => {
  const [opacity] = useState(new Animated.Value(1));

  useEffect(() => {
    // Start blinking when `ongoing` is true
    if (ongoing) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(opacity, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      opacity.setValue(1); // Reset to solid if not ongoing
    }
  }, [ongoing, opacity]);

  return (
    <Animated.View
      style={{
        width: 12,
        height: 12,
        borderRadius: 6,
        ...style,
        backgroundColor: ongoing ? "green" : "red",
        opacity, // Apply animated opacity
      }}
    />
  );
};

export default BlinkingCircle;
