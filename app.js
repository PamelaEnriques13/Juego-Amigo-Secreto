// --- Challenge Amigo Secreto ---

// Almacena la lista de nombres de los participantes.
let amigos = [];

// --- Validación del Input ---

const nombreInput = document.getElementById('amigo');

// Filtra la entrada en tiempo real para permitir solo letras y espacios.
nombreInput.addEventListener('input', function() {
    const regexSoloLetras = /[^a-zA-Z\s]/g;
    this.value = this.value.replace(regexSoloLetras, '');
});


// --- Funciones ---

// Añade un nuevo amigo a la lista tras validar la entrada.
function agregarAmigo() {
    const nombre = nombreInput.value.trim();

    if (nombre === '') {
        alert('Por favor, ingresa un nombre válido.');
        return;
    }
    if (amigos.includes(nombre)) {
        alert('Este nombre ya está en la lista.');
        return;
    }

    amigos.push(nombre);
    nombreInput.value = '';

    actualizarLista();
}

// Elimina un amigo específico de la lista.
function eliminarAmigo(nombreAEliminar) {
    amigos = amigos.filter(participante => participante !== nombreAEliminar);
    actualizarLista();
}

// Realiza el sorteo y muestra el resultado.
function sortearAmigo() {
    if (amigos.length < 2) {
        alert('Necesitas al menos dos amigos para poder sortear.');
        return;
    }

    const indiceAleatorio = Math.floor(Math.random() * amigos.length);
    const amigoSecreto = amigos[indiceAleatorio];

    const resultado = document.getElementById('resultado');
    resultado.innerHTML = `<li>¡El amigo secreto es: ${amigoSecreto}!</li>`; 
}

// Reinicia el juego a su estado inicial.
function reiniciarJuego() {
    amigos = [];
    nombreInput.value = '';
    document.getElementById('listaAmigos').innerHTML = '';
    document.getElementById('resultado').innerHTML = '';
}


// --- Vista ---

// Dibuja la lista de amigos en el HTML cada vez que se actualiza.
function actualizarLista() {
    const listaAmigos = document.getElementById('listaAmigos');
    // Limpia la lista anterior para evitar duplicados.
    listaAmigos.innerHTML = '';

    amigos.forEach(amigo => {
        const li = document.createElement('li');
        const nombreTexto = document.createElement('span');
        nombreTexto.textContent = amigo;

        const botonBorrar = document.createElement('button');
        botonBorrar.textContent = 'X';
        botonBorrar.className = 'button-delete';
        
        botonBorrar.onclick = function() {
            eliminarAmigo(amigo);
        };

        li.appendChild(nombreTexto);
        li.appendChild(botonBorrar);
        listaAmigos.appendChild(li);
    });
}