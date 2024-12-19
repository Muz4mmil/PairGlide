import { auth } from "@/configs/firebase-config";
import { logOut, resetPassword, signIn, signUp } from "@/libs/firebase";
import { User } from "@firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";

interface GlobalContextType {
  user: User | null;
  loading: boolean;
  signup: (name: string, email: string, password: string) => Promise<User | void>;
  signin: (email: string, password: string) => Promise<User | void>;
  logout: () => Promise<void>;
  resetpassword: (email: string) => Promise<void>;
}

const GlobalContext = createContext<GlobalContextType>({
  user: null,
  loading: false,
  signup: async () => { },
  signin: async () => { },
  logout: async () => { },
  resetpassword: async () => { },
})

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuthState = async () => {
      try {
        const token = await AsyncStorage.getItem('token')

        const unsubscribe = auth.onAuthStateChanged(async (user) => {
          if (user) {
            setUser(user)
            setLoading(false)
          } else {
            setUser(null)
            setLoading(false)
          }
        })

        return () => unsubscribe()
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    checkAuthState()
  }, [])

  const signin = async (email: string, password: string) => {
    try {
      const newuser = await signIn(email, password)
      setUser(newuser)
      return newuser
      
    } catch (error) {
      console.log(error)
    }
  }

  const signup = async (name: string, email: string, password: string) => {
    try {
      const newuser = await signUp(name, email, password)
      setUser(newuser)
      return newuser
      
    } catch (error) {
      console.log(error)
    }
  }

  const logout = async () => {
    try {
      await logOut()
      setUser(null)
    } catch (error) {
      console.log(error)
    }
  }

  const resetpassword = async (email: string) => {
    try {
      await resetPassword(email);
    } catch (error) {
      throw error;
    }
  };

  return (
    <GlobalContext.Provider value={{
      user,
      loading,
      signin,
      signup,
      logout,
      resetpassword
    }}>
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider;