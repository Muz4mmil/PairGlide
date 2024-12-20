import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import images from '@/constants/images'
import Button from "@/components/Button";
import { useState } from "react";
import InputField from "@/components/InputField";
import { StatusBar } from "expo-status-bar";
import * as Animatable from 'react-native-animatable';
import { useGlobalContext } from "@/context/GlobalProvider";
import { Redirect, router } from "expo-router";

export default function Index() {

  const { loading, user, signup, signin } = useGlobalContext()

  if (!loading && user) return <Redirect href="/onboard" />

  const [currentScreen, setCurrentScreen] = useState('welcome')
  const [form, setform] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    if (currentScreen === 'signup') {
      if (form.password !== form.confirmPassword) {
        setError('Passwords do not match')
        return
      }
      try {
        const user = await signup(form.name, form.email, form.password)
        if (user) {
          router.push('/onboard')
        } else {
          setError('Failed to create user')
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message)
        } else {
          setError('An unknown error occurred')
        }
      }
    } else {
      try {
        await signin(form.email, form.password)
        if (user) {
          router.push('/onboard')
        } else {
          setError('Invalid email or password')
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message)
        } else {
          setError('An unknown error occurred')
        }
      }
    }
  }

  return (
    <SafeAreaView className="h-full bg-white justify-center items-center">
      <ScrollView className="w-full px-4">
        <Animatable.View className={`mb-10 mt-20 items-center justify-center`}
          style={{ transform: [{ scale: currentScreen === 'welcome' ? 1.5 : 1 }, { translateY: currentScreen === 'welcome' ? 40 : 0 }] }}
          transition={['scale', 'translateY']}
          duration={500}>
          <Text className="text-2xl font-encode">Welcome To</Text>
          <Text className="text-4xl font-encode">PairGlide</Text>
        </Animatable.View>

        {currentScreen === 'welcome' ?
          <Animatable.View
            animation='fadeIn'
            duration={1000}
            className="mt-12"
          >
            <Image source={images.welcome} className="w-full h-80" resizeMode="cover" />

            <Text className="w-4/5 text-xl font-pregular mx-auto text-center mt-5">Find your perfect project partner or like-minded talent near you & bring your ideas to life.</Text>

            <Button
              title="Get Started"
              containerStyles="mt-10 w-full bg-white"
              handlePress={() => setCurrentScreen('signup')}
            />
          </Animatable.View> :

          <View>
            <Text className="text-3xl font-encode mb-8">{currentScreen === 'signup' ? 'Create a new Account' : 'Log in your Account'}</Text>

            <View className="gap-4">
              {currentScreen === 'signup' && <InputField
                title="Name"
                value={form.name}
                handleChange={(e) => setform({ ...form, name: e })}
                placeholder="Enter your name"
              />}
              <InputField
                title="Email"
                value={form.email}
                handleChange={(e) => setform({ ...form, email: e })}
                placeholder="Enter your Email"
              />
              <InputField
                title="Password"
                value={form.password}
                handleChange={(e) => setform({ ...form, password: e })}
                placeholder="Enter a strong Password"
              />
              {currentScreen === 'signup' && <InputField
                title="Confirm Password"
                value={form.confirmPassword}
                handleChange={(e) => setform({ ...form, confirmPassword: e })}
                placeholder="Enter the Password again"
              />}
            </View>

            {error && <Text className="text-red-500 mt-4">{error}</Text>}

            <Button
              title={currentScreen === 'signup' ? 'Sign Up' : 'Log In'}
              containerStyles="mt-10 w-full bg-sky-200"
              handlePress={handleSubmit}
            />

            <View className="flex-row justify-center gap-5 mt-4">
              <Text className="text-center mt-4 font-pregular border border-white">
                {currentScreen === 'signup' ? 'Already have an account?' : 'Don\'t have an account?'}
              </Text>
              <Text
                className="text-center mt-4 font-psemibold underline text-sky-600"
                onPress={() => {
                  setCurrentScreen(currentScreen === 'signup' ? 'login' : 'signup')
                  setError('')
                }}
              >
                {currentScreen === 'signup' ? 'Login' : 'Signup'}
              </Text>
            </View>
          </View>
        }
      </ScrollView>

      <StatusBar style="dark" />
    </SafeAreaView>
  );
}
