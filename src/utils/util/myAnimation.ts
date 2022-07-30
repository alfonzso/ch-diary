function floatAnimation(follower: HTMLDivElement, food: HTMLDivElement, chDiaryMain: HTMLDivElement) {
  let i: number = 0
  let step = 10

  // let foodLeftPartials = food.offsetLeft / step
  // let foodTopPartials = (follower.offsetTop - (food.offsetTop - follower.offsetHeight)) / step

  let foodTopPartials = (follower.offsetTop - (food.offsetTop - chDiaryMain!.scrollTop - follower.offsetHeight)) / step
  // let foodLeftPartials = food.offsetLeft - chDiaryMain!.scrollLeft / step
  // let foodTopPartials = (food.offsetTop - chDiaryMain!.scrollTop - follower.offsetHeight) / step
  const looper = (left: number, top: number) => {
    // setTimeout(function () {
    follower.style.top = top - foodTopPartials + 'px';
    i++;
    if (i < step) {
      looper(0, top - foodTopPartials);
    }
    // }, 24)
  }
  looper(0, follower.offsetTop)
}

const initFollowerToFood = () => {
  const moveToTopABit: number = -15;
  ([...document.querySelectorAll('.follower')] as HTMLDivElement[]).forEach(follower => {
    const food = follower.closest(".food") as HTMLDivElement

    if (follower.id === "foodProp") {
      follower.style.left = food.offsetLeft - document.querySelector('.chDiaryMain')!.scrollLeft + 'px';
    } else {
      follower.style.left = food.offsetLeft - document.querySelector('.chDiaryMain')!.scrollLeft + 200 + 'px';
    }

    follower.style.top = food.offsetTop - document.querySelector('.chDiaryMain')!.scrollTop - follower.offsetHeight + moveToTopABit + 'px';
  })
}

const floatAnimationOnScrollEvent = () => {
  const chDiaryMain = document.querySelector('.chDiaryMain') as HTMLDivElement;
  [...document.querySelectorAll('.food')].forEach((food) => {
    const follower = food.querySelector('.follower') as HTMLDivElement;
    setTimeout(() => { floatAnimation(follower, food as HTMLDivElement, chDiaryMain) }, 100);
  })
}

export {
  floatAnimation,
  floatAnimationOnScrollEvent,
  initFollowerToFood
}