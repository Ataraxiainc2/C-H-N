# -*- coding: latin-1 -*-
from flask import Flask, render_template, request

app = Flask(__name__)

def calculate_quality(F1, F2, F3, F4, w1, w2, w3, w4):
    # Función para calcular la calidad del software utilizando la fórmula dada
    Q = w1 * F1 + w2 * F2 + w3 * F3 + w4 * F4
    return Q

@app.route('/')
def home():
    # Ruta para la página de inicio
    return render_template('index.html')

@app.route('/calculate', methods=['POST'])
def calculate():
    # Ruta para procesar el formulario y calcular la calidad del software
    F1 = float(request.form.get('F1'))
    F2 = float(request.form.get('F2'))
    F3 = float(request.form.get('F3'))
    F4 = float(request.form.get('F4'))
    w1 = float(request.form.get('w1'))
    w2 = float(request.form.get('w2'))
    w3 = float(request.form.get('w3'))
    w4 = float(request.form.get('w4'))

    calidad = calculate_quality(F1, F2, F3, F4, w1, w2, w3, w4)

    return render_template('index.html', calidad=calidad)

if __name__ == '__main__':
    # Iniciar la aplicación Flask
    app.run(debug=True)