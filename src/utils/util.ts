function floatAnimation(follower: HTMLDivElement, food: HTMLDivElement) {
  let i: number = 0
  let step = 10

  let foodLeftPartials = food.offsetLeft / step
  let foodTopPartials = (follower.offsetTop - (food.offsetTop - follower.offsetHeight)) / step
  const looper = (left: number, top: number) => {
    setTimeout(function () {
      follower.style.top = top - foodTopPartials + 'px';
      i++;
      if (i < step) {
        looper(left + foodLeftPartials, top - foodTopPartials);
      }
    }, 24)
  }
  looper(0, follower.offsetTop)
}

const getYYYYMMDD = () => {
  return new Date(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 00:00:00`)
}

const generateTimeHHMMSS = (offset: number, date: number) => {
  let theDay = new Date(date)
  theDay.setHours(0)
  theDay.setMinutes(offset)
  theDay.setSeconds(0)
  return theDay
}


export {
  floatAnimation,
  getYYYYMMDD,
  generateTimeHHMMSS
}
