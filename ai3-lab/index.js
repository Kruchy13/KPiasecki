let map = L.map('map').setView([40.7128, -74.0060], 18);
L.tileLayer.provider('Esri.WorldImagery').addTo(map);

let piecesArray = [];
window.onload = function () {
  Notification.requestPermission();
};

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

function validatePuzzles() {
  let table2 = document.getElementById('table2');
  let childelements = table2.querySelectorAll('.grid-item');
  let cnt = 0;
  for (const div of childelements) {
    let child = div.firstChild;
    if (child) {
      if (child.id !== `piece${cnt++}`) {
        return false;
      }
    } else {
      return false;
    }
  }
  return true;
}

document.getElementById('checkButton').addEventListener('click', function () {
  if (validatePuzzles()) {
    alert('Puzzle są poprawnie ułożone!');
  } else {
    alert('Puzzle nie są jeszcze poprawnie ułożone.');
  }
});

document.getElementById('saveButton').addEventListener('click', function () {
  leafletImage(map, function (err, canvas) {
    piecesArray = [];
    document.getElementById('table1').innerHTML = '';
    document.getElementById('table2').innerHTML = '';

    let rasterMap = document.createElement('canvas');
    let rasterContext = rasterMap.getContext('2d');

    const originalWidth = 600;
    const originalHeight = 300;
    rasterMap.width = originalWidth;
    rasterMap.height = originalHeight;
    rasterContext.drawImage(canvas, 0, 0, originalWidth, originalHeight);
    let savedMap = document.getElementById('savedMap');
    let savedMapContext = savedMap.getContext('2d');
    savedMapContext.drawImage(
      canvas,
      0,
      0,
      originalWidth,
      originalHeight,
      0,
      0,
      savedMap.width,
      savedMap.height
    );

    const numRows = 4;
    const numCols = 4;

    const pieceWidth = originalWidth / numCols;
    const pieceHeight = originalHeight / numRows;

    const table1 = document.getElementById('table1');
    table1.style.display = 'grid';
    table1.style.gridTemplateColumns = `repeat(${numCols}, 1fr)`;
    table1.style.gridTemplateRows = `repeat(${numRows}, 1fr)`;

    const table2 = document.getElementById('table2');
    table2.style.display = 'grid';
    table2.style.gridTemplateColumns = `repeat(${numCols}, 1fr)`;
    table2.style.gridTemplateRows = `repeat(${numRows}, 1fr)`;

    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        const div = document.createElement('div');
        const div2 = document.createElement('div');
        div.classList = 'grid-item drag-target';
        div2.classList = 'grid-item drag-target';
        table1.appendChild(div);
        table2.appendChild(div2);
      }
    }

    let cnt = 0;
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        const pieceCanvas = document.createElement('canvas');
        pieceCanvas.id = `piece${cnt++}`;
        pieceCanvas.width = pieceWidth;
        pieceCanvas.height = pieceHeight;
        pieceCanvas.setAttribute('draggable', 'true');
        pieceCanvas.addEventListener('dragstart', function (event) {
          event.dataTransfer.setData('text', this.id);
        });

        const pieceContext = pieceCanvas.getContext('2d');
        pieceContext.drawImage(
          rasterMap,
          col * pieceWidth,
          row * pieceHeight,
          pieceWidth,
          pieceHeight,
          0,
          0,
          pieceWidth,
          pieceHeight
        );

        piecesArray.push(pieceCanvas);
      }
    }

    let targets = document.querySelectorAll('.drag-target');
    for (let target of targets) {
      target.addEventListener('dragenter', function (event) {
        this.style.border = '1px solid #7FE9D9';
      });
      target.addEventListener('dragleave', function (event) {
        this.style.border = 'none';
      });
      target.addEventListener('dragover', function (event) {
        event.preventDefault();
      });
      target.addEventListener(
        'drop',

        function (event) {
          let myElement = document.getElementById(
            event.dataTransfer.getData('text')
          );
          this.style.border = 'none';
          if (!this.firstChild) {
            this.appendChild(myElement);
          }
        },
        false
      );

      target.addEventListener('dragend', function (event) {
        new Notification('You won!');
        if (validatePuzzles()) {
          console.log('Puzzle solved.');
          let permission = Notification.permission;
          new Notification('You won!');
          if (permission === 'granted') {
            new Notification('You won!');
          }
        }
      });
    }

    piecesArray = shuffle(piecesArray);
    let ch = table1.querySelectorAll('.grid-item');
    for (let index = 0; index < piecesArray.length; index++) {
      ch[index].appendChild(piecesArray[index]);
    }
  });
});

document
  .getElementById('getLocation')
  .addEventListener('click', function (event) {
    if (!navigator.geolocation) {
      console.log('No geolocation.');
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          let lat = position.coords.latitude;
          let lon = position.coords.longitude;
           // Ustawia tekst w elemencie o id "pageHeader" na aktualne współrzędne
        document.getElementById('pageHeader').textContent = `Współrzędne: ${lat.toFixed(4)}° N, ${lon.toFixed(4)}° E`;

          // L.marker([lat, lon]).addTo(map);
          map.setView([lat, lon]);
        },
        (positionError) => {
          console.error(positionError);
        }
      );
    }
  });
