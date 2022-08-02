const getYYYYMMDD = () => {
  return new Date(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 00:00:00`)
}

const removeOneDay = (date: Date) => {
  date.setDate(date.getDate() - 1)
  return date
}
const addOneDay = (date: Date) => {
  date.setDate(date.getDate() + 1)
  return date
}

const generateTimeHHMMSS = (offset: number, date: number) => {
  let theDay = new Date(date)
  theDay.setHours(0)
  theDay.setMinutes(offset)
  theDay.setSeconds(0)
  return theDay
}

export {
  getYYYYMMDD,
  removeOneDay,
  addOneDay,
  generateTimeHHMMSS
}