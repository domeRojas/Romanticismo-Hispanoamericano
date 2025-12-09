// Función para desplegar/ocultar información del autor al hacer click
function toggleAutorInfo(element) {
  const autorCard = element.closest(".autor-card")
  const autorInfo = autorCard.querySelector(".autor-info")

  if (autorInfo) {
    console.log("[v0] Toggling author info visibility")
    autorInfo.classList.toggle("visible")
  }
}

// Transición suave al iniciar experiencia
function iniciarExperiencia() {
  document.getElementById("entradaPage").style.animation = "fadeOut 0.8s ease forwards"
  setTimeout(() => {
    document.getElementById("entradaPage").style.display = "none"
    document.getElementById("mainPage").classList.add("active")
  }, 800)
}

// Navegación del menú
function mostrarSeccion(seccionId) {
  const secciones = document.querySelectorAll(".content-section")
  const menuItems = document.querySelectorAll(".menu-item")

  secciones.forEach((seccion) => seccion.classList.remove("active"))
  menuItems.forEach((item) => item.classList.remove("active"))

  document.getElementById(seccionId).classList.add("active")
  event.target.closest(".menu-item").classList.add("active")
}

// Quiz - Verificar respuestas
function verificarRespuesta(preguntaId) {
  const pregunta = document.getElementById(preguntaId)
  const opcionesSeleccionadas = pregunta.querySelectorAll(".option:checked")

  if (opcionesSeleccionadas.length === 0) {
    alert("Por favor selecciona una respuesta")
    return
  }

  opcionesSeleccionadas.forEach((opcion) => {
    const esCorrecta = opcion.getAttribute("data-correct") === "true"
    opcion.parentElement.classList.add(esCorrecta ? "correct" : "incorrect")
  })
}

// Juego de Memoria
const memoriaCartas = [
  { id: 1, pareja: "A", contenido: "Amalia" },
  { id: 2, pareja: "A", contenido: "Mármol" },
  { id: 3, pareja: "B", contenido: "María" },
  { id: 4, pareja: "B", contenido: "Isaacs" },
  { id: 5, pareja: "C", contenido: "El Matadero" },
  { id: 6, pareja: "C", contenido: "Echeverría" },
  { id: 7, pareja: "D", contenido: "Martín Fierro" },
  { id: 8, pareja: "D", contenido: "Hernández" },
]

let cartasFlipped = []
let parejasCumplidas = 0

function iniciarMemoria() {
  const gameContainer = document.querySelector(".memory-game")
  const cartasBarajadas = [...memoriaCartas].sort(() => Math.random() - 0.5)

  gameContainer.innerHTML = ""
  parejasCumplidas = 0
  cartasFlipped = []

  cartasBarajadas.forEach((carta) => {
    const cartaDiv = document.createElement("div")
    cartaDiv.className = "memory-card"
    cartaDiv.textContent = "?"
    cartaDiv.onclick = () => voltearCarta(cartaDiv, carta)
    gameContainer.appendChild(cartaDiv)
  })
}

function voltearCarta(element, carta) {
  if (element.classList.contains("flipped") || element.classList.contains("matched")) {
    return
  }

  element.classList.add("flipped")
  element.textContent = carta.contenido
  cartasFlipped.push({ element, carta })

  if (cartasFlipped.length === 2) {
    setTimeout(() => verificarPareja(), 600)
  }
}

function verificarPareja() {
  const [carta1, carta2] = cartasFlipped

  if (carta1.carta.pareja === carta2.carta.pareja) {
    carta1.element.classList.add("matched")
    carta2.element.classList.add("matched")
    parejasCumplidas++

    if (parejasCumplidas === 4) {
      setTimeout(() => {
        alert("¡Felicidades! ¡Ganaste el juego de memoria!")
      }, 500)
    }
  } else {
    carta1.element.classList.remove("flipped")
    carta2.element.classList.remove("flipped")
    carta1.element.textContent = "?"
    carta2.element.textContent = "?"
  }

  cartasFlipped = []
}

function reiniciarMemoria() {
  iniciarMemoria()
  document.getElementById("memoryScore").innerHTML = ""
}

// Generar preguntas del Quiz
function generarQuiz() {
  const preguntas = [
    {
      id: "q1",
      pregunta: "¿Cuál es la obra maestra de Jorge Isaacs?",
      opciones: [
        { texto: "María", correcta: true },
        { texto: "Amalia", correcta: false },
        { texto: "El Matadero", correcta: false },
        { texto: "Martín Fierro", correcta: false },
      ],
    },
    {
      id: "q2",
      pregunta: "¿Cuál fue el período principal del Romanticismo Hispanoamericano?",
      opciones: [
        { texto: "1800-1820", correcta: false },
        { texto: "1830-1880", correcta: true },
        { texto: "1850-1900", correcta: false },
        { texto: "1900-1950", correcta: false },
      ],
    },
    {
      id: "q3",
      pregunta: "¿Quién escribió 'El Matadero'?",
      opciones: [
        { texto: "José Mármol", correcta: false },
        { texto: "Esteban Echeverría", correcta: true },
        { texto: "D.F. Sarmiento", correcta: false },
        { texto: "José Hernández", correcta: false },
      ],
    },
    {
      id: "q4",
      pregunta: "¿De dónde era Gertrudis Gómez de Avellaneda originalmente?",
      opciones: [
        { texto: "Argentina", correcta: false },
        { texto: "Colombia", correcta: false },
        { texto: "Cuba", correcta: true },
        { texto: "México", correcta: false },
      ],
    },
    {
      id: "q5",
      pregunta: "¿Cuál es el poema nacional argentino?",
      opciones: [
        { texto: "Facundo", correcta: false },
        { texto: "Amalia", correcta: false },
        { texto: "Martín Fierro", correcta: true },
        { texto: "Sab", correcta: false },
      ],
    },
  ]

  const quizContainer = document.getElementById("quiz")
  quizContainer.innerHTML = ""

  preguntas.forEach((pregunta, index) => {
    const questionDiv = document.createElement("div")
    questionDiv.className = "question"
    questionDiv.id = pregunta.id

    let html = `<strong>${index + 1}. ${pregunta.pregunta}</strong><br>`

    pregunta.opciones.forEach((opcion) => {
      html += `
        <label class="option">
          <input type="radio" name="${pregunta.id}" data-correct="${opcion.correcta}">
          ${opcion.texto}
        </label>
      `
    })

    questionDiv.innerHTML = html
    quizContainer.appendChild(questionDiv)
  })
}

// Verificar respuestas del quiz
function verificarQuiz() {
  const preguntas = document.querySelectorAll(".question")
  let correctas = 0
  const total = preguntas.length

  preguntas.forEach((pregunta) => {
    const opcionSeleccionada = pregunta.querySelector("input:checked")

    if (!opcionSeleccionada) {
      alert("Por favor responde todas las preguntas")
      return
    }

    const esCorrecta = opcionSeleccionada.getAttribute("data-correct") === "true"
    const label = opcionSeleccionada.parentElement

    if (esCorrecta) {
      correctas++
      label.classList.add("correct")
    } else {
      label.classList.add("incorrect")
    }

    // Desactivar opciones después de verificar
    pregunta.querySelectorAll("input").forEach((input) => {
      input.disabled = true
    })
  })

  const scoreDiv = document.getElementById("score")
  const porcentaje = Math.round((correctas / total) * 100)
  scoreDiv.innerHTML = `
    <p>¡Resultado: ${correctas}/${total} respuestas correctas (${porcentaje}%)</p>
    ${porcentaje >= 80 ? "🎉 ¡Excelente! Eres un experto en Romanticismo." : ""}
    ${porcentaje >= 60 && porcentaje < 80 ? "👍 ¡Muy bien! Tienes buen conocimiento." : ""}
    ${porcentaje < 60 ? "📚 Sigue estudiando para mejorar." : ""}
  `
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("Romanticismo Hispanoamericano cargado correctamente")
  generarQuiz()
  iniciarMemoria()
})

function reiniciarQuiz() {
  generarQuiz()
  document.getElementById("score").innerHTML = ""
}