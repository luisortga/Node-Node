import time from 'node:timers'

let yesterday = 15
let day = yesterday + 1 ?? 20

try {
  console.log(day)
} catch (err) {
  console.error(err)
} finally {
  console.log('done, come back soon')
}

async function codex(custumerCounter = 24) {
  custumerCounter++
  console.log('now costumer in restaurant is : ', custumerCounter)
}

codex()
