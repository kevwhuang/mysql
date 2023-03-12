const formUsers = document.querySelector('#formUsers input[type="submit"]');
const inputsUsers = document.querySelectorAll('#formUsers input[type="text"]');
const URL = 'http://localhost:8000';

formUsers.addEventListener('click', form => {
    const data = Object.fromEntries(new FormData(document.forms[0]));

    if (!document.forms[0].checkValidity()) return;
    for (const e in data) if (!data[e]) delete data[e];
    for (const e of inputsUsers) e.value = null;

    form.preventDefault();
    axios.post(`${URL}/users`, data).then(retrieveUsers);
});
