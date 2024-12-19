import { SplashScreen, Stack } from "expo-router";
import { EncodeSansSC_700Bold, useFonts } from "@expo-google-fonts/encode-sans-sc";
import { Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from "@expo-google-fonts/poppins";
import "../global.css";
import { useEffect } from "react";
import GlobalProvider from "@/context/GlobalProvider";

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {

  const [loadFonts, error] = useFonts({
    EncodeSansSC_700Bold,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  useEffect(() => {
    if (loadFonts) {
      SplashScreen.hideAsync();
    }
  }, [loadFonts, error])

  if (!loadFonts && !error) {
    return null;
  }

  return (
    <GlobalProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="onboard" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </GlobalProvider>
  );
}
