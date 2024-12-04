const db = {
    users: JSON.parse(localStorage.getItem('users')) || [],
    issues: JSON.parse(localStorage.getItem('issues')) || []
};

// Toggle between Login and Register
document.getElementById('show-register').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('login-section').classList.add('hidden');
    document.getElementById('register-section').classList.remove('hidden');
});

document.getElementById('show-login').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('register-section').classList.add('hidden');
    document.getElementById('login-section').classList.remove('hidden');
});

// Register User
document.getElementById('register-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
    const role = document.getElementById('register-role').value;

    db.users.push({ username, password, role });
    localStorage.setItem('users', JSON.stringify(db.users));
    alert('Registration Successful! Please Login.');
    document.getElementById('register-form').reset();
    document.getElementById('register-section').classList.add('hidden');
    document.getElementById('login-section').classList.remove('hidden');
});

// Login User
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    const role = document.getElementById('login-role').value;

    const user = db.users.find((u) => u.username === username && u.password === password && u.role === role);
    if (user) {
        alert(`Welcome, ${username}!`);
        document.getElementById('login-section').classList.add('hidden');
        role === 'student' ? document.getElementById('issue-section').classList.remove('hidden') : document.getElementById('admin-section').classList.remove('hidden');
    } else {
        alert('Invalid Credentials');
    }
});

// Submit Issue
document.getElementById('issue-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const studentName = document.getElementById('student-name').value;
    const studentId = document.getElementById('student-id').value;
    const category = document.getElementById('category').value;
    const comment = document.getElementById('comment').value;

    const issue = { studentName, studentId, category, comment };
    db.issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(db.issues));

    // Update UI
    const li = document.createElement('li');
    li.textContent = `${studentName} (ID: ${studentId}) reported an issue in ${category}: ${comment}`;
    document.getElementById('issue-list').appendChild(li);
    document.getElementById('issue-form').reset();
});
