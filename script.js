document.addEventListener('DOMContentLoaded', async function() {
    const filterDropdown = document.getElementById('filterDropdown');
    const filterInput = document.getElementById('filterInput');
    const userTableBody = document.querySelector('#userTable tbody');

    const getUsers = async () => {
        const response = await fetch('http://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        return data;
    };

    const renderUsers = async () => {
        const users = await getUsers();
        userTableBody.innerHTML = '';

        users.forEach(user => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${user.name}</td>
                <td>${user.username}</td>
                <td>${user.email}</td>
            `;
            userTableBody.appendChild(tr);
        });
    };

    const filterUsers = async () => {
        const users = await getUsers();
        const filterOption = filterDropdown.value;
        const searchText = filterInput.value.toLowerCase();

        const filteredUsers = users.filter(user => user[filterOption].toLowerCase().includes(searchText));
        userTableBody.innerHTML = '';

        filteredUsers.forEach(user => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${user.name}</td>
                <td>${user.username}</td>
                <td>${user.email}</td>
            `;
            userTableBody.appendChild(tr);
        });
    };

    filterDropdown.addEventListener('change', filterUsers);
    filterInput.addEventListener('input', filterUsers);

    await renderUsers();
});