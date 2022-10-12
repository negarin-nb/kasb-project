import React from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native';

export default function Cell(
  onClick,
  children,
  isActive = false,) {
  return (
    <TouchableOpacity onPress={!isActive ? onClick : undefined}>
      {children}
    </TouchableOpacity>
  );
}
