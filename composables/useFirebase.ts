// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, child, push, update } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBKMrOfxsfftHsZnXBhP3NT4_oUONjoTn4",
    authDomain: "linear-listener-156603.firebaseapp.com",
    projectId: "linear-listener-156603",
    storageBucket: "linear-listener-156603.appspot.com",
    messagingSenderId: "886556245160",
    appId: "1:886556245160:web:ae1641185de3c69712d69d",
    measurementId: "G-L4JSS9QD0R",
    databaseURL: "https://linear-listener-156603-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export const useFirebase = () => {
    const addPatientToProcedure = (formData: Tech.PatientFormData) => {
        const formDataKey = push(child(database, 'records'), formData).key;

        const updates = {
            [`/records/${formDataKey}`]: formData
        }

        return update(ref(database), updates);
    }

    return {
        addPatientToProcedure,
    }
}
