import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.notification-form'); // Заміна кнопки на форму
const enterDelay = document.querySelector('input[name="delay"]');
const fiedestOptions = document.querySelector('.fiedest-radio');

let fulfilledBtn = false;
let rejectedBtn = false;

form.addEventListener('submit', handleCreateMessage); // Зміна обробника події з кнопки на форму
fiedestOptions.addEventListener('change', changeOptions);

function changeOptions(event) {
  if (event.target.value === 'fulfilled') {
    fulfilledBtn = true;
    rejectedBtn = false;
  } else if (event.target.value === 'rejected') {
    rejectedBtn = true;
    fulfilledBtn = false;
  }
}

function handleCreateMessage(evt) {
  evt.preventDefault();

  const delay = parseInt(enterDelay.value) || 0;

  // Створення промісу
  const notificationPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (fulfilledBtn) {
        resolve(delay); // Відправляємо саме значення затримки
      } else if (rejectedBtn) {
        reject(delay); // Відправляємо значення затримки при відхиленні
      }
    }, delay);
  });

  // Обробка промісу
  notificationPromise
    .then(delay => {
      iziToast.success({
        timeout: 5000,
        position: 'topRight',
        title: 'Success',
        titleColor: '#fff',
        titleSize: '16px',
        message: `Fulfilled promise in ${delay} ms`,
        messageColor: '#fff',
        backgroundColor: '#59a10d',
      });
    })
    .catch(delay => {
      iziToast.error({
        timeout: 5000,
        position: 'topRight',
        title: 'Error',
        titleColor: '#fff',
        titleSize: '16px',
        message: `Rejected promise in ${delay} ms`,
        messageColor: '#fff',
        backgroundColor: '#ef4040',
      });
    })
    .finally(() => {
      enterDelay.value = ''; // Очищення поля введення
    });
}

// Додатковий запит POST
const postToAdd = {
  title: 'CRUD',
  body: 'CRUD is awesome!',
};

const options = {
  method: 'POST',
  body: JSON.stringify(postToAdd),
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
};

fetch('https://jsonplaceholder.typicode.com/posts', options)
  .then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  })
  .then(post => console.log(post))
  .catch(error => console.log(error));
