import { View, Text } from 'react-native'
import React from 'react'
import Button from '@/components/Button'
import { router } from 'expo-router'

type LocationScreenProps = {
  handleScreenChange: (screen: number) => void
}

export const LocationScreen = ({ handleScreenChange }: LocationScreenProps) => {
  return (
    <View className='flex-1 px-4'>
      <View className='mt-20 justify-center items-center'>
        <Text className='font-psemibold text-xl'>Set Your Location</Text>
      </View>

      <View className='px-4 pb-6 pt-4 border-t border-gray-200 mt-auto'>
        <View className='flex-row gap-4'>
          <Button
            title="Back"
            containerStyles='flex-1 bg-white'
            handlePress={() => handleScreenChange(2)}
          />
          <Button
            title="Finish"
            containerStyles='flex-1 bg-sky-200'
            handlePress={() => router.push('/home')}
          />
        </View>
      </View>
    </View>
  )
}