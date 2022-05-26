import { DragEvent } from 'react';
import { floatAnimation } from './util';



function allowDrop(ev: DragEvent<HTMLDivElement>) {
  ev.preventDefault();
}

function drag(ev: DragEvent<HTMLDivElement>) {
  ev.dataTransfer.setData("text", ev.currentTarget.id);
}

function drop(ev: DragEvent<HTMLDivElement>) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  [...document.querySelectorAll('.emptyRowFiller')].forEach((row) => (row as HTMLDivElement).hidden = false);
  (ev.currentTarget.querySelector('.emptyRowFiller') as HTMLDivElement)!.hidden = true;
  const food = document.getElementById(data)! as HTMLDivElement
  ev.currentTarget.appendChild(food);
  // setTimeout(() => { followMe(food) }, 100);
  const popup =  document.querySelector('.popup') as HTMLDivElement;
  const follower = food.querySelector('.follower') as HTMLDivElement;
  setTimeout(() => { floatAnimation(follower, food, popup) }, 100);
}

export {
  allowDrop,
  drag,
  drop,
}