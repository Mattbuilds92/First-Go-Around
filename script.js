let teamScores = {
    Red: 0,
    Blue: 0,
    Green: 0,
    Yellow: 0
};

function addPoints(team, points) {
    if (teamScores[team] !== undefined) {
        teamScores[team] += points;
        document.getElementById(`${team}-points`).textContent = teamScores[team];
    }
}

function subtractPoints(team, points) {
    if (teamScores[team] !== undefined && teamScores[team] >= points) {
        teamScores[team] -= points;
        document.getElementById(`${team}-points`).textContent = teamScores[team];
    }
}

function updateRanking() {
    // Optionally handle any changes when the ranking selections are updated
}

function scoreTeams() {
    let first = document.getElementById('first-place').value;
    let second = document.getElementById('second-place').value;
    let third = document.getElementById('third-place').value;

    // Reset scores first (optional, or you might want to keep previous scores)
    Object.keys(teamScores).forEach(team => {
        teamScores[team] = 0;
        document.getElementById(`${team}-points`).textContent = teamScores[team];
    });

    // Assign points based on ranking
    if (teamScores[first] !== undefined) {
        teamScores[first] += 100;
        document.getElementById(`${first}-points`).textContent = teamScores[first];
    }
    if (teamScores[second] !== undefined) {
        teamScores[second] += 75;
        document.getElementById(`${second}-points`).textContent = teamScores[second];
    }
    if (teamScores[third] !== undefined) {
        teamScores[third] += 50;
        document.getElementById(`${third}-points`).textContent = teamScores[third];
    }
}
