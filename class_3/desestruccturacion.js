const user = {
  name: 'montero',
  age: 28,
  email: 'f1verstappen@redbull.com',
}

/**
 * Muestra la informacion
 * @param {object} usuario el objeto del usuario completo
 * @returns {void} informacion del usuario
 */
function viewInfo({ name, age }) {
  console.log(`El usuario ${name} tiene ${age} años de edad.`)
}

viewInfo(user)

/**
 * conteo de cleintes
 * @param {object} numero_customer cantidad de clientes
 * @return {void} cantidad de clientes
 */
function countCustomer({ customer }) {
  console.log(customer)
}

countCustomer({ customer: 24 })
