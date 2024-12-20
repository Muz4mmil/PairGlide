import { auth, db } from "@/configs/firebase-config";
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateProfile } from "@firebase/auth";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import cloudinary from "@/configs/cloudinary-config";
import { upload } from 'cloudinary-react-native'
import { fill } from "@cloudinary/url-gen/actions/resize";


export const signUp = async (name: string, email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    if (name && user) {
      await updateProfile(user, {
        displayName: name,
      })
    }

    const token = await user.getIdToken();
    await AsyncStorage.setItem('token', token);

    await setDoc(doc(db, "users", user.uid), {
      name,
      email,
      location: {
        long: 0,
        lat: 0,
      },
      skills: [],
      photoUrl: user.photoURL || '',
    });

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const token = await user.getIdToken();
    await AsyncStorage.setItem('token', token);

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const logOut = async () => {
  try {
    await signOut(auth);
    await AsyncStorage.removeItem('token');
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

const getCurrentUser = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      const user = auth.currentUser;
      if (user) {
        return user;
      }
    }
    return null;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const updateProfilePicture = async (file: any, user: any) => {
  try {
    const options = {
      upload_preset: 'native',
      unsigned: true,
    }

    await upload(cloudinary, {
      file: file.uri, options: options, callback: async (error: any, response: any) => {
        console.log('Uploaded : ', response)
        await updateProfile(user, {
          photoURL: response.secure_url,
        })

        await updateDoc(doc(db, "users", user.uid), {
          photoUrl: response.secure_url,
        });
      }
    })

    return true;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const updateSkills = async (skills: string[], user: any) => {
  try {
    await updateDoc(doc(db, "users", user.uid), {
      skills: skills,
    });

    return true;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const updateLocation = async (long: string, lat: string, user: any) => {
  try {
    await updateDoc(doc(db, "users", user.uid), {
      location: {
        long,
        lat,
      },
    });

    return true;
  } catch (error) {
    console.log(error);
    throw error;
  }
}