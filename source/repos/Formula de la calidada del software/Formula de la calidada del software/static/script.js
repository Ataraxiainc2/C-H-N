window.onload = function () {
    var canvas = document.getElementById("backgroundCanvas");
    var context = canvas.getContext("2d");

    // Función para ajustar el tamaño del lienzo
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    // Función para dibujar la matriz en el fondo
    function drawMatrix() {
        // Dibujar un fondo transparente para crear un efecto de desvanecimiento
        context.fillStyle = 'rgba(0, 0, 0, 0.04)';
        context.fillRect(0, 0, canvas.width, canvas.height);

        // Configuración de los caracteres y su tamaño
        var matrixCode = '.*';
        var font_size = 6;

        // Calcular la cantidad de columnas y las posiciones iniciales de los caracteres
        var columns = Math.ceil(canvas.width / font_size);
        var drops = [];

        // Generar posiciones iniciales aleatorias para cada columna
        for (var x = 0; x < columns; x++) {
            drops[x] = Math.floor(Math.random() * canvas.height / font_size) + 1;
        }

        // Iterar sobre todas las columnas y dibujar los caracteres en las posiciones correspondientes
        for (var i = 0; i < drops.length; i++) {
            var text = matrixCode[Math.floor(Math.random() * matrixCode.length)];

            // Crear un gradiente de color para el texto
            var gradient = context.createLinearGradient(i * font_size, drops[i] * font_size - font_size, i * font_size, drops[i] * font_size);
            gradient.addColorStop(0, '#00FF00');
            gradient.addColorStop(0.4, '#4DE686');
            gradient.addColorStop(0.6, '#00CC00');
            gradient.addColorStop(0.8, '#FF00FF');
            gradient.addColorStop(1, '#B400FF');

            // Aplicar el gradiente y dibujar el texto
            context.fillStyle = gradient;
            context.font = font_size + 'px monospace';
            context.fillText(text, i * font_size, drops[i] * font_size);

            // Reiniciar la posición si el carácter ha caído más allá del límite de la pantalla y con una probabilidad baja
            if (drops[i] * font_size > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }

            // Incrementar la posición del carácter
            drops[i]++;
        }
    }

    // Llamar a la función para ajustar el tamaño del lienzo
    resizeCanvas();

    // Ejecutar la función de dibujo de la matriz a intervalos regulares
    setInterval(drawMatrix, 99);

    // Obtener los elementos de los controles deslizantes y el resultado
    var sliders = document.querySelectorAll('input[type="range"]');
    var output = document.getElementById('result-output');

    // Asignar la función de manejo de eventos a cada control deslizante
    sliders.forEach(function (slider) {
        slider.oninput = function () {
            // Obtener los valores de los pesos y características del software
            var wF = parseFloat(document.getElementById('wF').value);
            var wR = parseFloat(document.getElementById('wR').value);
            var wU = parseFloat(document.getElementById('wU').value);
            var wM = parseFloat(document.getElementById('wM').value);
            var F = parseFloat(document.getElementById('F').value);
            var R = parseFloat(document.getElementById('R').value);
            var U = parseFloat(document.getElementById('U').value);
            var M = parseFloat(document.getElementById('M').value);

            // Validar que la suma de los pesos sea menor o igual a 1
            var sumOfWeights = wF + wR + wU + wM;
            if (sumOfWeights > 1) {
                // Si la suma de los pesos es mayor a 1, ajustar los valores proporcionales
                wF = wF / sumOfWeights;
                wR = wR / sumOfWeights;
                wU = wU / sumOfWeights;
                wM = wM / sumOfWeights;
            }

            // Calcular la calidad del software según la fórmula
            var calidadSoftware = (wF * F + wR * R + wU * U + wM * M) / (wF + wR + wU + wM);
            var calidadSoftwareScaled = calidadSoftware.toFixed(2);

            // Mostrar el resultado en el elemento de salida
            output.textContent = calidadSoftwareScaled;

            // Actualizar los valores de salida en la interfaz
            document.getElementById('wF-output').textContent = wF.toFixed(2);
            document.getElementById('wR-output').textContent = wR.toFixed(2);
            document.getElementById('wU-output').textContent = wU.toFixed(2);
            document.getElementById('wM-output').textContent = wM.toFixed(2);
            document.getElementById('F-output').textContent = F.toFixed(2);
            document.getElementById('R-output').textContent = R.toFixed(2);
            document.getElementById('U-output').textContent = U.toFixed(2);
            document.getElementById('M-output').textContent = M.toFixed(2);
        };
    });

    // Asignar la función de ajuste de tamaño del lienzo al evento de cambio de tamaño de la ventana
    window.addEventListener("resize", function () {
        resizeCanvas();
    });
};
