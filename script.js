// Get DOM elements
const form = document.getElementById('userForm');
const leaderboardTable = document.getElementById('leaderboard');

// Load leaderboard from localStorage
function loadLeaderboard() {
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    leaderboardTable.innerHTML = `
        <tr>
            <th>Name</th>
            <th>Wallet Address</th>
            <th>Streak</th>
        </tr>
    `;
    leaderboard.forEach(user => {
        const row = leaderboardTable.insertRow();
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.wallet}</td>
            <td>${user.streak}</td>
        `;
    });
}

// Register new user
form.addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const wallet = document.getElementById('wallet').value;

    // Create user object
    const newUser = {
        name: name,
        wallet: wallet,
        streak: 1
    };

    // Get existing leaderboard data from localStorage
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];

    // Add the new user to the leaderboard
    leaderboard.push(newUser);

    // Save the updated leaderboard to localStorage
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));

    // Reload leaderboard
    loadLeaderboard();

    // Clear the form
    form.reset();
});

// Increase streak every 24 hours
setInterval(() => {
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    const updatedLeaderboard = leaderboard.map(user => {
        user.streak += 1;
        return user;
    });
    localStorage.setItem('leaderboard', JSON.stringify(updatedLeaderboard));
    loadLeaderboard();
}, 24 * 60 * 60 * 1000); // 24 hours interval

// Initial load of leaderboard
loadLeaderboard();
