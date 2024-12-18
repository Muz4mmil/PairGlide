import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useGlobalContext } from '@/context/GlobalProvider'

const Profile = () => {
  const {logout} = useGlobalContext()
  return (
    <View className='bg-white flex-1 items-center justify-center'>
      <Text>Profile</Text>
      <TouchableOpacity onPress={logout} className='bg-black p-2 rounded-lg'><Text className='text-white'>Logout</Text></TouchableOpacity>
    </View>
  )
}

export default Profile