// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';
import '../css/1-timer.css';

const startButton = document.querySelector('button[data-start]');
const dateTimePicker = document.getElementById('datetime-picker');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

startButton.disabled = true;
let userSelectedDate = null;
let countdownInterval;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (!selectedDates || !selectedDates[0]) return;
    const selectedDate = selectedDates[0];
    console.log(selectedDate);

    if (selectedDate < new Date()) {
      iziToast.error({
        // class: 'eror-modal',
        timeout: 10000,
        position: 'topRight',

        class: 'eror-modal',
        title: 'Error',
        titleColor: '#fff',
        titleSize: '16px',
        titleLineHeight: '1.5',
        message: 'Please choose a date in the future',
        messageColor: '#fff',
        messageSize: '16px',
        messageLineHeight: '1.5',
        backgroundColor: '#ef4040',
        theme: 'light', // dark
        iconColor: '#fff',
      });
      startButton.disabled = true;
    } else {
      userSelectedDate = selectedDates[0];
      startButton.disabled = false;
    }
  },
};

flatpickr(dateTimePicker, options);

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function startCountdown() {
  countdownInterval = setInterval(() => {
    const now = new Date();
    const timeLeft = userSelectedDate - now;

    if (timeLeft <= 0) {
      clearInterval(countdownInterval);
      updateTimerDisplay(0, 0, 0, 0);
      iziToast.info({ title: 'Info', message: "Time's up!" });
      startButton.disabled = true;
      dateTimePicker.disabled = false;
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeLeft);
    updateTimerDisplay(days, hours, minutes, seconds);
  }, 1000);

  startButton.disabled = true;
  dateTimePicker.disabled = true;
}

function updateTimerDisplay(days, hours, minutes, seconds) {
  daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
}

startButton.addEventListener('click', startCountdown);

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
