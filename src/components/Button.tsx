import React from "react";
import { Pressable, Text } from "react-native";

interface ButtonProps {
  title: string;
  onPress: () => void;
}

const Button = ({ title, onPress }: ButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={{
        height: 36,
      }}
    >
      <Text style={{ color: "#007aff", fontSize: 16 }}>{title}</Text>
    </Pressable>
  );
};

export default Button;
