// Importando Firebase via módulos
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, fetchSignInMethodsForEmail } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';
import { getFirestore, doc, setDoc } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';