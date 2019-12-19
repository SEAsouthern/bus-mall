'use strict';

var imageElements = document.getElementsByTagName('img');
var busMallIndex1 = 0;
var busMallIndex2 = 1;
var busMallIndex3 = 2;

var allBusMall = [];

function BusMall(name, imageUrl, timesClicked, timesViewed) {
  this.name = name;
  this.imageUrl = imageUrl;
  if (timesClicked) {
    this.timesClicked = timesClicked;
  }
  else {
    this.timesClicked = 0;
  }
  if (timesViewed) {
    this.timesViewed = timesViewed;
  }
  else {
    this.timesViewed = 0;
  }
  this.percClicked = 0;
  allBusMall.push(this);
}

function getBusMallArray(property) {
  var answer = [];
  for (var j = 0; j < allBusMall.length; j++) {
    answer[j] = allBusMall[j][property];
  }
  return answer;
}

getBusMallArray();

// Not haveing to repeat names over and over
// this.imageUrl= `img/${name}.jpg`

var savedBusMallString = localStorage.getItem('savedBusMall');
if (savedBusMallString) {
  var arrayOfNotBusMall = JSON.parse(savedBusMallString);
  for (var k = 0; k < arrayOfNotBusMall.length; k++) {
    new BusMall(arrayOfNotBusMall[k].name, arrayOfNotBusMall[k].imageUrl, arrayOfNotBusMall[k].timesClicked, arrayOfNotBusMall[k].timesViewed);
  }

} else {

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
}

// for (var i =0; i <3; i++) {
//   allBusMall[i].timesViewed++;
// }


var totalClicks = -1;
function imageWasClicked(event) {
  totalClicks++;
  if(event) {
    if(event.srcElement.id === '1') {
      allBusMall[busMallIndex1].timesClicked++;
    } else if (event.srcElement.id === '2') {
      allBusMall[busMallIndex2].timesClicked++;
    } else if (event.srcElement.id === '3') {
      allBusMall[busMallIndex3].timesClicked++;
    }
    // Add somehow to count views.
    // allBusMall[busMallIndex1].timesViewed++; ?

    var nextBusMallIndex1 = Math.floor(Math.random() * allBusMall.length);
    while((nextBusMallIndex1 === busMallIndex1) || (nextBusMallIndex1 === busMallIndex2) || (nextBusMallIndex1 === busMallIndex3)) {
      nextBusMallIndex1 = Math.floor(Math.random() * allBusMall.length);
    }
    var nextBusMallIndex2 = Math.floor(Math.random() * allBusMall.length);
    while((nextBusMallIndex2 === busMallIndex1) || (nextBusMallIndex2 === busMallIndex2) || (nextBusMallIndex2 === nextBusMallIndex1) || (nextBusMallIndex2 === nextBusMallIndex3)) {
      nextBusMallIndex2 = Math.floor(Math.random() * allBusMall.length);
    }
    var nextBusMallIndex3 = Math.floor(Math.random() * allBusMall.length);
    while((nextBusMallIndex3 === busMallIndex1) || (nextBusMallIndex3 === busMallIndex2) || (nextBusMallIndex3 === busMallIndex3) || (nextBusMallIndex3 === nextBusMallIndex1) || (nextBusMallIndex3 === nextBusMallIndex2)) {
      nextBusMallIndex3 = Math.floor(Math.random() * allBusMall.length);
    }


    busMallIndex1 = nextBusMallIndex1;
    busMallIndex2 = nextBusMallIndex2;
    busMallIndex3 = nextBusMallIndex3;

    imageElements[0].src = allBusMall[busMallIndex1].imageUrl;
    allBusMall[busMallIndex1].timesViewed++;
    imageElements[1].src = allBusMall[busMallIndex2].imageUrl;
    allBusMall[busMallIndex2].timesViewed++;
    imageElements[2].src = allBusMall[busMallIndex3].imageUrl;
    allBusMall[busMallIndex3].timesViewed++;

    // Move random display here as an else if.

    // move the display random images to an else if under < 25 clicks
    if(totalClicks >= 25) {
      localStorage.setItem('savedBusMall', JSON.stringify(allBusMall));
      for (var i = 0; i <imageElements.length; i++) {
        imageElements[i].removeEventListener('click', imageWasClicked);}
      renderChart();
      // var footerEl = document.getElementsByTagName('footer')[0];
      // footerEl.textContent = 'Thanks for picking!';
      // BusMall.displayResults();
    }
  }
}

imageWasClicked();

for (var i = 0; i < imageElements.length; i++) {
  imageElements[i].addEventListener('click', imageWasClicked);
}

// create table after 25 clicks
// function makeTable() {

// }

BusMall.prototype.displayResults = function() {
  if(this.selected === true) {
    var newLi = document.createElement('li');
    newLi.textContent = `${this.name} had ${this.timesClicked} clicks and was viewed ${this.timesViewed} times.`;
    var getResults= document.getElementById('results');
    getResults.appendChild(newLi);
  }
};

// BusMall.prototype.percClicked = function() {
//   (BusMall.timesViewed/BusMall.timesClicked);
// };

function renderChart() {
  var ctx = document.getElementById('resultsChart').getContext('2d');
  var resultsChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: getBusMallArray('name'),
      datasets: [{
        label: '# of Votes',
        data: getBusMallArray('timesClicked'),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

// if(totalClicks >= 5) {
//   var ctx = document.getElementById('resultsChart').getContext('2d');
//   // eslint-disable-next-line no-undef
//   var resultsChart = new Chart(ctx, {
//     type: 'bar',
//     data: {
//       labels: getBusMallArray('name'),
//       datasets: [{
//         label: '# of Votes',
//         data: getBusMallArray('timesClicked'),
//         backgroundColor: [
//           'rgba(255, 99, 132, 0.2)',
//           'rgba(54, 162, 235, 0.2)',
//           'rgba(255, 206, 86, 0.2)',
//           'rgba(75, 192, 192, 0.2)',
//           'rgba(153, 102, 255, 0.2)',
//           'rgba(255, 159, 64, 0.2)',
//           'rgba(255, 99, 132, 0.2)',
//           'rgba(54, 162, 235, 0.2)',
//           'rgba(255, 206, 86, 0.2)',
//           'rgba(75, 192, 192, 0.2)',
//           'rgba(153, 102, 255, 0.2)',
//           'rgba(255, 159, 64, 0.2)',
//           'rgba(255, 99, 132, 0.2)',
//           'rgba(54, 162, 235, 0.2)',
//           'rgba(255, 206, 86, 0.2)',
//           'rgba(75, 192, 192, 0.2)',
//           'rgba(153, 102, 255, 0.2)',
//           'rgba(255, 159, 64, 0.2)',
//           'rgba(255, 99, 132, 0.2)',
//           'rgba(54, 162, 235, 0.2)',
//           'rgba(255, 206, 86, 0.2)',
//           'rgba(75, 192, 192, 0.2)',
//           'rgba(153, 102, 255, 0.2)',
//           'rgba(255, 159, 64, 0.2)'
//         ],
//         borderColor: [
//           'rgba(255, 99, 132, 1)',
//           'rgba(54, 162, 235, 1)',
//           'rgba(255, 206, 86, 1)',
//           'rgba(75, 192, 192, 1)',
//           'rgba(153, 102, 255, 1)',
//           'rgba(255, 159, 64, 1)',
//           'rgba(255, 99, 132, 1)',
//           'rgba(54, 162, 235, 1)',
//           'rgba(255, 206, 86, 1)',
//           'rgba(75, 192, 192, 1)',
//           'rgba(153, 102, 255, 1)',
//           'rgba(255, 159, 64, 1)',
//           'rgba(255, 99, 132, 1)',
//           'rgba(54, 162, 235, 1)',
//           'rgba(255, 206, 86, 1)',
//           'rgba(75, 192, 192, 1)',
//           'rgba(153, 102, 255, 1)',
//           'rgba(255, 159, 64, 1)',
//           'rgba(255, 99, 132, 1)',
//           'rgba(54, 162, 235, 1)',
//           'rgba(255, 206, 86, 1)',
//           'rgba(75, 192, 192, 1)',
//           'rgba(153, 102, 255, 1)',
//           'rgba(255, 159, 64, 1)'
//         ],
//         borderWidth: 1
//       }]
//     },
//     options: {
//       scales: {
//         yAxes: [{
//           ticks: {
//             beginAtZero: true,
//             stepSize: 1
//           }
//         }]
//       }
//     }
//   });
// }
