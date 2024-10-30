import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const enterDelay = document.querySelector('input[name="delay"]');
const btnCreateNotification = document.querySelector('.btn-snackbar');
const fiedestOptions = document.querySelector('.fiedest-radio');

let fulfilledBtn = false;
let rejectedBtn = false;

btnCreateNotification.addEventListener('click', handleCreateMessage);
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

  // Створення промісу з виконанням або відхиленням залежно від обраного значення
  const notificationPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (fulfilledBtn) {
        resolve(`Fulfilled promise in ${delay} ms`);
      } else if (rejectedBtn) {
        reject(new Error('Rejected promise due to invalid operation'));
      }
    }, delay);
  });

  // Обробка успішного виконання або відхилення промісу
  notificationPromise
    .then(message => {
      iziToast.success({
        timeout: 5000,
        position: 'topRight',
        title: 'Success',
        titleColor: '#fff',
        titleSize: '16px',
        message: message,
        messageColor: '#fff',
        backgroundColor: '#59a10d',
      });
    })
    .catch(error => {
      iziToast.error({
        timeout: 5000,
        position: 'topRight',
        title: 'Error',
        titleColor: '#fff',
        titleSize: '16px',
        message: error.message,
        messageColor: '#fff',
        backgroundColor: '#ef4040',
      });
    })
    .finally(() => {
      enterDelay.value = ''; // Очищення поля введення після виконання або відхилення
    });
}
