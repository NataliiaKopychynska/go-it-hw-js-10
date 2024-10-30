// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const enterDelay = document.querySelector('input[name="delay"]');
const btnCreateNotification = document.querySelector('.btn-snackbar');
const fiedestOptions = document.querySelector('.fiedest-radio');

let fulfilledBtn = false;
let rejectedBtn = false;
btnCreateNotification.addEventListener('click', handlCriateMassenge);
fiedestOptions.addEventListener('change', changeOptions);

function changeOptions(event) {
  if (event.target.value === 'fulfilled') {
    fulfilledBtn = true;
    rejectedBtn = false;
    console.log('fulfilledBtn', fulfilledBtn, 'rejectedBtn', rejectedBtn);
  }
  if (event.target.value === 'rejected') {
    rejectedBtn = true;
    fulfilledBtn = false;
    console.log('fulfilledBtn', fulfilledBtn, 'rejectedBtn', rejectedBtn);
  }
}

function handlCriateMassenge(evt) {
  evt.preventDefault();
  enterDelay.value = '';

  const delay = parseInt(enterDelay.value) || 0;
  if (fulfilledBtn) {
    return setTimeout(
      () =>
        iziToast.success({
          timeout: 10000,
          position: 'topRight',

          class: 'eror-modal',
          title: 'OK',
          titleColor: '#fff',
          titleSize: '16px',
          titleLineHeight: '1.5',
          message: `Fulfilled promise in ${delay}`,
          messageColor: '#fff',
          messageSize: '16px',
          messageLineHeight: '1.5',
          backgroundColor: '#59a10d',
          theme: 'light',
          iconColor: '#fff',
        }),
      delay
    );
  } else if (rejectedBtn) {
    return setTimeout(
      () =>
        iziToast.error({
          timeout: 10000,
          position: 'topRight',

          class: 'eror-modal',
          title: 'Error',
          titleColor: '#fff',
          titleSize: '16px',
          titleLineHeight: '1.5',
          message: 'Illegal operation',
          messageColor: '#fff',
          messageSize: '16px',
          messageLineHeight: '1.5',
          backgroundColor: '#ef4040',
          theme: 'light',
          iconColor: '#fff',
        }),
      delay
    );
  } else {
    return setTimeout(
      () =>
        iziToast.warning({
          timeout: 10000,
          position: 'topRight',

          class: 'eror-modal',
          title: 'Caution',
          titleColor: '#fff',
          titleSize: '16px',
          titleLineHeight: '1.5',
          message: 'You forgot important data',
          messageColor: '#fff',
          messageSize: '16px',
          messageLineHeight: '1.5',
          backgroundColor: ' #ffa000',
          theme: 'light',
          iconColor: '#fff',
        }),
      delay
    );
  }
}
