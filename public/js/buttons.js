const toggleRoutes = () => {
    const ele = document.querySelector('table');

    if (!ele.className) ele.className = 'hidden';
    else ele.className = '';
};

const toggleUsers = () => {
    const ele = document.querySelector('#listUsers');

    if (!ele.className) ele.className = 'hidden';
    else {
        ele.className = '';
        retrieveUsers();
    }
};
