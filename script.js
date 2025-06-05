// Importar funciones desde Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

// Configuración de Firebase
const firebaseConfig1 = {
  apiKey: "AIzaSyAJk2apWk07lpTJ4h0ZXZDj2_QENbjrxZo",
  authDomain: "datosformulario-eb033.firebaseapp.com",
  projectId: "datosformulario-eb033",
  storageBucket: "datosformulario-eb033.firebasestorage.app",
  messagingSenderId: "831954292582",
  appId: "1:831954292582:web:b79e30312ee9fd748582a7",
  measurementId: "G-S5DTZML4WX"
};

// Inicializar Firebase y Firestore
const app = initializeApp(firebaseConfig1);
const db = getFirestore(app);

// Manejar envío del formulario
document.getElementById('formulario').addEventListener('submit', async (event) => {
  event.preventDefault();

  // Obtener elementos
  let entradaNombre = document.getElementById('name');
  let errorNombre = document.getElementById('nameError');

  let emailEntrada = document.getElementById('email');
  let emailError = document.getElementById('emailError');

  let contrasenaEntrada = document.getElementById('password');
  let contrasenaError = document.getElementById('passwordError');

  // Validar nombre
  if (entradaNombre.value.trim() === '') {
    errorNombre.textContent = 'Por favor, introducí tu nombre';
    errorNombre.classList.add('error-message');
  } else {
    errorNombre.textContent = '';
    errorNombre.classList.remove('error-message');
  }

  // Validar email
  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(emailEntrada.value)) {
    emailError.textContent = 'Por favor, introducí un mail válido';
    emailError.classList.add('error-message');
  } else {
    emailError.textContent = '';
    emailError.classList.remove('error-message');
  }

  // Validar contraseña
  let contrasenaPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/;
  if (!contrasenaPattern.test(contrasenaEntrada.value)) {
    contrasenaError.textContent = 'La contraseña debe tener al menos 8 caracteres, incluir números, mayúsculas, minúsculas y caracteres especiales';
    contrasenaError.classList.add('error-message');
  } else {
    contrasenaError.textContent = '';
    contrasenaError.classList.remove('error-message');
  }

  // Si todo está válido, enviar a Firebase
  if (!errorNombre.textContent && !emailError.textContent && !contrasenaError.textContent) {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        nombre: entradaNombre.value,
        email: emailEntrada.value,
        password: contrasenaEntrada.value
      });
      alert(`Formulario enviado con éxito. ID: ${docRef.id}`);
      document.getElementById('formulario').reset();
    } catch (error) {
      alert('Error al enviar: ' + error.message);
    }
  }
});
