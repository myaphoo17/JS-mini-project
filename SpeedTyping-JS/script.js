const RANDOM_QUOTE_API_URL = 'https://type.fit/api/quotes';

const quoteDisplayElement = document.getElementById('quoteDisplay');
const quoteInputElement = document.getElementById('quoteInput');

async function getRandomQuotes() {
  return fetch(RANDOM_QUOTE_API_URL)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      return response.json();
    })
    .then(data => data[Math.floor(Math.random() * data.length)].text)
    .catch(error => {
      console.error('Error fetching random quote:', error);
      return 'An error occurred while fetching the quote.';
    });
}

async function renderNextQuotes() {
  const quote = await getRandomQuotes();

  if (!quote) {
    console.error('Error fetching random quote: Quote data is undefined or null.');
    return;
  }

  quoteDisplayElement.innerHTML = '';
  quote.split(' ').forEach(word => {
    const characterSpan = document.createElement('span');
    characterSpan.innerText = word + ' ';
    quoteDisplayElement.appendChild(characterSpan);
  });

  quoteInputElement.value = null;
  startTimer();

 
  quoteInputElement.addEventListener('input', () => {
    const arrayQuote = quoteDisplayElement.querySelectorAll('span');
    const arrayValue = quoteInputElement.value.split(' ');

    let correct = true;
    arrayQuote.forEach((characterSpan, index) => {
      const word = arrayValue[index];
      if (!word) {
        characterSpan.classList.remove('correct');
        characterSpan.classList.remove('incorrect');
        correct = false;
      } else if (word === characterSpan.innerText.trim()) {
        characterSpan.classList.add('correct');
        characterSpan.classList.remove('incorrect');
      } else {
        characterSpan.classList.remove('correct');
        characterSpan.classList.add('incorrect');
        correct = false;
      }
    });

    if (correct) renderNextQuotes();
  });
}

let startTime;
function startTimer() {
  const timerElement = document.getElementById('timer');
  timerElement.innerText = 0;
  startTime = new Date();
  setInterval(() => {
    timerElement.innerText = getTimerTime();
  }, 1000);
}

function getTimerTime() {
  return Math.floor((new Date() - startTime) / 1000);
}

renderNextQuotes();