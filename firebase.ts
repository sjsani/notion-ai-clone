import {initializeApp,getApps,getApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyDdC4y58WB2ZFoNrTUXsGn8acSKdOOTp8k",
    authDomain: "notion-ai-clone-f0fa4.firebaseapp.com",
    projectId: "notion-ai-clone-f0fa4",
    storageBucket: "notion-ai-clone-f0fa4.firebasestorage.app",
    messagingSenderId: "1000403931842",
    appId: "1:1000403931842:web:5e88821939cc028c0f615b"
  };

  const app = getApps().length === 0 ?  initializeApp(firebaseConfig) : getApp();
  const db = getFirestore(app);

  export {db};