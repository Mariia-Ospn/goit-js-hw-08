import throttle from 'lodash.throttle';
// import '../css/common.css';
// import '../css/03-feedback.css';

const STORAGE_KEY = 'feedback-form-state';
let formData = {};

const refs = {
  form: document.querySelector('.feedback-form'),
};

function onFormSubmit(evt) {
  evt.preventDefault();
  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
  // console.log('отправляем форму');
}

function onFormInput(evt) {
  formData[evt.target.name] = evt.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

// console.log(formData);

function populateForm() {
  const savedInput = localStorage.getItem(STORAGE_KEY);
  if (savedInput) {
    formData = JSON.parse(savedInput);
    for (let key in formData) {
      refs.form[key].value = formData[key];
    }
  }
}

populateForm();
refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput), 500);
