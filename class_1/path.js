import path from 'node:path'

console.log(path.sep)

const filePath = path.join('content', 'subfolder', 'test.txt')
console.log(filePath)

const base = path.basename('./tmp/node/password.txt')
console.log(base)

const filename = path.basename('./tmp/node/password.txt', '.txt')

const extension = path.extname('my.super.image.jpg')
console.log(filename, '\n', extension)
