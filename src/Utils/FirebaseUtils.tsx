import auth from '@react-native-firebase/auth';

export default class FirebaseUtils {
    public static signIn=(email:string,password:string)=>{
      return  auth().signInWithEmailAndPassword(email,password)
    }
    public static signUp=(email:string,password:string)=>{
        return auth().createUserWithEmailAndPassword(email,password)
    }
    public static signout=()=>{
        return auth().signOut()
    }
    
}

