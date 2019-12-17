'use strict';

var imageElements = document.getElementsByTagName('img');
var busMallIndex1 = 0;
var busMallIndex2 = 1;
var busMallIndex3 = 2;

var allBusMall = [];

function BusMall(name, imageUrl) {
  this.name = name;
  this.imageUrl = imageUrl;
  this.timesClicked = 0;
  allBusMall.push(this);
}

new BusMall('bag', 'img/bag.jpg');
new BusMall('banana', 'img/banana.jpg');
new BusMall('bathroom', 'img/bathroom.jpg');
new BusMall('boots', 'img/boots.jpg');
new BusMall('breakfast', 'img/breakfast.jpg');
new BusMall('bubblegum', 'img/bubblegum.jpg');
new BusMall('chair', 'img/chair.jpg');
new BusMall('cthulhu', 'img/cthulhu.jpg');
new BusMall('dog-duck', 'img/dog-duck.jpg');
new BusMall('dragon', 'img/dragon.jpg');
new BusMall('pen', 'img/pen.jpg');
new BusMall('pet-sweep', 'img/pet-sweep.jpg');
new BusMall('scissors', 'img/scissors.jpg');
new BusMall('shark', 'img/shark.jpg');
new BusMall('sweep', 'img/sweep.png');
new BusMall('tauntaun', 'img/tauntaun.jpg');
new BusMall('unicorn', 'img/unicorn.jpg');
new BusMall('usb', 'img/usb.gif');
new BusMall('wine-glass', 'img/wine-glass.jpg');
new BusMall('water-can', 'img/water-can.jpg');


var totalClicks = 0;
function imageWasClicked(event) {
  totalClicks++;
  if(event.srcElement.id === '1') {
    allBusMall[busMallIndex1].timesClicked++;
  } else if (event.srcElement.id === '2') {
    allBusMall[busMallIndex2].timesClicked++;
  } else if (event.srcElement.id === '3') {
    allBusMall[busMallIndex3].timesClicked++;
  }

  // Add stuff for 3rd image
  var nextBusMallIndex1 = Math.floor(Math.random() * allBusMall.length);
  while((nextBusMallIndex1 === busMallIndex1) || (nextBusMallIndex1 === busMallIndex2) || (nextBusMallIndex1 === busMallIndex3)) {
    nextBusMallIndex1 = Math.floor(Math.random() * allBusMall.length);
  }
  var nextBusMallIndex2 = Math.floor(Math.random() * allBusMall.length);
  while((nextBusMallIndex2 === busMallIndex1) || (nextBusMallIndex2 === busMallIndex2) || (nextBusMallIndex2 === nextBusMallIndex1) || (nextBusMallIndex2 === nextBusMallIndex3)) {
    nextBusMallIndex2 = Math.floor(Math.random() * allBusMall.length);
  }
  var nextBusMallIndex3 = Math.floor(Math.random() * allBusMall.length);
  while((nextBusMallIndex3 === busMallIndex1) || (nextBusMallIndex3 === busMallIndex2) || (nextBusMallIndex3 === busMallIndex3) || (nextBusMallIndex2 === nextBusMallIndex1)) {
    nextBusMallIndex2 = Math.floor(Math.random() * allBusMall.length);
  }

  busMallIndex1 = nextBusMallIndex1;
  busMallIndex2 = nextBusMallIndex2;
  busMallIndex3 = nextBusMallIndex3;

  // display the goats
  imageElements[0].src = allBusMall[busMallIndex1].imageUrl;
  imageElements[1].src = allBusMall[busMallIndex2].imageUrl;
  imageElements[2].src = allBusMall[busMallIndex3].imageUrl;

  if(totalClicks >= 25) {
    var footerEl = document.getElementsByTagName('footer')[0];
    footerEl.textContent = 'Thanks for picking!';
  }
}


for (var i = 0; i < imageElements.length; i++) {
  imageElements[i].addEventListener('click', imageWasClicked);
}
