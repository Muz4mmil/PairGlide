import { Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

interface ButtonProps {
  containerStyles?: string;
  textStyles?: string;
  title: string;
  handlePress?: () => void;
}

const Button = ({ containerStyles, textStyles, title, handlePress }: ButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className={`border-2 shadow-lg shadow-black/60 border-black rounded-3xl py-5 ${containerStyles}`}
      onPress={handlePress}
    >
      <Text className={`text-center font-pmedium text-xl ${textStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

export default Button
