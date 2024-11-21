const popUpHolder = document.querySelector(".popUp");
const openFormBtn = document.querySelector(".popUpBtn");
const closeFormBtn = document.querySelector(".closeBtn");
const form = document.querySelector(".holder");
const formPopup = document.getElementById('formPopup');
const feedbackForm = document.getElementById('feedbackForm');
const fullNameInput = document.getElementById('fullName');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const organizationInput = document.getElementById('organization');
const messageInput = document.getElementById('message');
const consentCheckbox = document.getElementById('consent');
const submitBtn = document.getElementById('submitBtn');
const messageText = document.getElementById('messageText');
var currentPageUrl = window.location.href;

window.onpopstate = function(event) {

  if (window.location.hash != '#popup') {
    formPopup.style.display = 'none'
  }
};

openFormBtn.addEventListener('click', () => {
  formPopup.style.display = 'block';
  window.history.pushState(null, null, currentPageUrl + '#popup');
});

closeFormBtn.addEventListener('click', () => {
  formPopup.style.display = 'none';
});

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();

const formData = {
   fullName: fullNameInput.value,
   email: emailInput.value,
   phone: phoneInput.value,
   organization: organizationInput.value,
   message: messageInput.value,
   consent: consentCheckbox.checked
 };

 const xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://formcarry.com/s/2SswL5ZmzZ-', true);
  xhr.setRequestHeader('Content-Type', 'application/json');

  xhr.onload = function() {
    if ((xhr.status >= 200 && xhr.status < 300)|| xhr.status==406) {
      messageText.textContent = 'Форма успешно отправлена!';
      fullNameInput.value = '';
      emailInput.value = '';
      phoneInput.value = '';
      organizationInput.value = '';
      messageInput.value = '';
      consentCheckbox.checked = false;
    } else {
      messageText.textContent = 'Произошла ошибка при отправке формы.';
    }
  };

  xhr.send(JSON.stringify(formData));
});
// Восстановление значений формы при загрузке страницы
window.addEventListener('load', () => {
  const storedFormData = JSON.parse(localStorage.getItem('formData'));

  if (storedFormData) {
    fullNameInput.value = storedFormData.fullName;
    emailInput.value = storedFormData.email;
    phoneInput.value = storedFormData.phone;
    organizationInput.value = storedFormData.organization;
    messageInput.value = storedFormData.message;
    consentCheckbox.checked = storedFormData.consent;
  }
});

// Сохранение значений формы при изменении
feedbackForm.addEventListener('change', () => {
  const formData = {
    fullName: fullNameInput.value,
    email: emailInput.value,
    phone: phoneInput.value,
    organization: organizationInput.value,
    message: messageInput.value,
    consent: consentCheckbox.checked
  };

  localStorage.setItem('formData', JSON.stringify(formData));
});
