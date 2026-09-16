import fs from 'node:fs'

const stats = fs.statSync('./file.txt')
console.log(fs)

console.log(
  stats.isFile(),
  stats.isDirectory(),
  stats.isSymbolicLink(),
  stats.size,
)

console.log('leyendo el primer archivo')
fs.readFile('./file.txt', 'utf-8', (err, text) => {
  console.log(text)
})

console.log('Hacer cosas mientras lee el archivo')

console.log('leyendo el segungo archivo')
fs.readFile('./file_second.txt', 'utf-8', (err, text) => {
  console.log(text)
})
