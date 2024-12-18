import { View, Text, Image } from 'react-native'
import React from 'react'
import { useGlobalContext } from '@/context/GlobalProvider'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '@/components/Button'
import images from '@/constants/images'

const home = () => {
  const { user } = useGlobalContext()

  return (
    <SafeAreaView className='bg-white flex-1'>
      <Text className="mt-6 font-encode text-2xl text-center">PairGlide</Text>

      <View className="flex-1 justify-center items-center px-4">
        <View className='relative'>
          <Text className="font-encode text-center text-5xl">Team Up,</Text>
          <Text className="font-encode text-center text-5xl mt-2">Build Better!</Text>
          <Image source={images.line} className='absolute right-0 -bottom-[18px] h-10 w-40 rotate-[174deg]' resizeMode='contain' />
        </View>
        <Text className="text-gray-600 text-lg mt-10 text-center font-pregular px-4">
          Connect with skilled individuals and bring your ideas to life.
        </Text>

        <Button containerStyles='mt-10 w-full bg-sky-200 py-10' title="Find a Partner for My Project" />
        <Button containerStyles='mt-6 w-full bg-white py-10' title="Find Someone Like Me" />
      </View>
    </SafeAreaView>
  )
}

export default home