import { readFile } from 'node:fs/promises'

Promise.all([
  readFile('./file.txt', 'utf-8'),
  readFile('./file_second.txt', 'utf-8'),
]).then(([text, secondText]) => {
  console.log('first text: ', text)
  console.log('second text: ', secondText)
})
