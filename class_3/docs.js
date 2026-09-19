/**
 * Calcula el precio total incluyendo el impuesto.
 *
 * @param {number} precio - El costo base del producto.
 * @param {number} impuesto - El porcentaje de impuesto (ej. 0.16).
 * @returns {number} El valor total facturado.
 */
function calcularTotal(precio, impuesto) {
  return precio + precio * impuesto
}

// calcularTotal()

// ------------------>

/**
 * Calcula el factorial de un número.
 * @param {number} numero - Número entero no negativo.
 * @returns {number} El factorial del número.
 */

function calcularFactorial(numero) {
  if (numero < 0) {
    throw new Error('El número debe ser positivo o cero')
  }

  if (numero <= 1) {
    return 1
  }

  return numero * calcularFactorial(numero - 1)
}

const result = calcularFactorial(5)
console.log(result)
