// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getVertexAI, getGenerativeModel } from "firebase/vertexai";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAIsIvfCYH4lFSq8EjDRNGzqFDd2Qg_vng",
  authDomain: "gym2buddy.firebaseapp.com",
  databaseURL: "https://gym2buddy-default-rtdb.firebaseio.com",
  projectId: "gym2buddy",
  storageBucket: "gym2buddy.firebasestorage.app",
  messagingSenderId: "1043054509099",
  appId: "1:1043054509099:web:a739c4fac5158643773e6e",
  measurementId: "G-TWNJ5ESZNS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Initialize the Vertex AI service
const vertexAI = getVertexAI(app);

// Initialize the generative model with a model that supports your use case
// Gemini 1.5 models are versatile and can be used with all API capabilities
const model = getGenerativeModel(vertexAI, { model: "gemini-1.5-flash" });

export default app;
export { db, vertexAI, model };
