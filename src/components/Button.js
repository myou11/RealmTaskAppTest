import React from 'react';
import {Pressable, Text} from 'react-native';

const Button = ({title, onPress}) => {
  return (
    <Pressable
      onPress={onPress}
      style={{
        height: 36,
      }}>
      <Text style={{color: '#007aff', fontSize: 16}}>{title}</Text>
    </Pressable>
  );
};

export default Button;
