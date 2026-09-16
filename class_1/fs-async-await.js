import { readFile } from 'node:fs/promises'

console.log('Leyendo el primer archivo...')
const text = await readFile('./file.txt', 'utf-8')
console.log('primer texto:', text)
console.log('--> Hacer cosas mientras lee el archivo...')

console.log('Leyendo el segundo archivo...')
const secondText = await readFile('./file_second.txt', 'utf-8')
console.log('segundo texto:', secondText)
