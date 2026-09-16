import fs from 'node:fs/promises'
import path from 'node:path'
import picocolors from 'picocolors'

const folder = process.argv[2] ?? '.'

async function ls(folder) {
  let files
  try {
    files = await fs.readdir(folder)
  } catch {
    console.error(picocolors.red(`Not read directory ${folder} 👻`))
    process.exit(1)
  }

  const filesPromises = files.map(async (file) => {
    const filePath = path.join(folder, file)
    let stats

    try {
      stats = await fs.stat(filePath) // ----> status : information of file
    } catch {
      console.error(`The file could not be read`)
      process.exit(1)
    }

    const isDirectory = stats.isDirectory()
    const fileType = isDirectory ? 'd' : 'f'
    const fileSize = stats.size
    const fileModified = stats.mtime.toDateString()

    return `${fileType} ${picocolors.blue(file.padEnd(20))} ${picocolors.green(fileSize.toString().padStart(10))} ${picocolors.green(fileModified)}`
  })

  const filesInfo = await Promise.all(filesPromises)

  filesInfo.forEach((fileinfo) => console.log(fileinfo))
}

ls(folder)
