import { sum } from './sum.js'
import os from 'node:os'

console.log(`Esta bien`)
console.log('No hay window')

const online = async (params = 'default') => {
  console.log(`${params}`)
}

// console.log(globalThis)

online()
online('spefic')

// commentary : all globalThis

console.log(sum(12, 12))

console.log('Informacion del sistema operativo')
console.log(os.platform())
console.log(os.arch())
console.log(os.cpus())


console.log('is')

console.log("result")
console.log("Res")

function name(params) {

}