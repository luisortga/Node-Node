import { error } from 'node:console'
import fs from 'node:fs/promises'

console.log('leyendo el primer archivo')
fs.readFile('./file.txt', 'utf-8')
  .then((text) => {
    console.log('first text:', text)
  })
  .catch((error) => {
    console.error(error)
  })

console.log('----> Hacer cosas mientras lee el archivo')

console.log('leyendo el segungo archivo')
fs.readFile('./file_second.txt', 'utf-8')
  .then((text) => {
    console.log('second text: ', text)
  })
  .catch((error) => {
    console.error(error)
  })
