const retrieveUsers = async () => {
    const output = document.querySelector('#displayUsers');
    const URL = 'http://localhost:8000/users';

    output.innerHTML = null;

    await axios.get(URL)
        .then(res => {
            for (const e of res.data) {
                const anchor = document.createElement('a');
                const br = document.createElement('br');
                const span = document.createElement('span');

                anchor.innerText = 'Details';
                anchor.setAttribute('href', `${URL}/${e.id}`);
                anchor.setAttribute('target', '_blank');
                span.innerText = `${String(e.id).padStart(3, 0)} \u2013 ${e.first_name} ${e.last_name}`;

                output.append(span, anchor, br);
            }
        })
        .catch(err => { throw Error(err); });
};
