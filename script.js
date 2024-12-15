// DOM Elements
const form = document.getElementById('userForm');
const leaderboardTable = document.getElementById('leaderboard');

// Load Leaderboard Data
function loadLeaderboard() {
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    
    // Clear the existing table rows
    leaderboardTable.innerHTML = `
        <tr>
            <th>Name</th>
            <th>Wallet Address</th>
            <th>Streak</th>
        </tr>
    `;

    // Populate leaderboard table
    leaderboard.forEach(user => {
        const row = leaderboardTable.insertRow();
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.wallet}</td>
            <td>${user.streak}</td>
        `;
    });
}

// Add New User to Leaderboard
form.addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const wallet = document.getElementById('wallet').value;

    const newUser = {
        name: name,
        wallet: wallet,
        streak: 1 // Start streak at 1
    };

    // Get leaderboard data from localStorage
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];

    // Add new user and save back to localStorage
    leaderboard.push(newUser);
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));

    // Reload leaderboard
    loadLeaderboard();

    // Clear form
    form.reset();
});

// Automatically increment streak every 24 hours
setInterval(() => {
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    const updatedLeaderboard = leaderboard.map(user => {
        user.streak += 1; // Increment streak
        return user;
    });
    localStorage.setItem('leaderboard', JSON.stringify(updatedLeaderboard));
    loadLeaderboard();
}, 24 * 60 * 60 * 1000); // 24 hours interval

// Load leaderboard on page load
loadLeaderboard();
