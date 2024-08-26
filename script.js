let teamScores = {
    Red: 0,
    Blue: 0,
    Green: 0,
    Yellow: 0
};

let rankings = [];
const rankingPoints = [100, 75, 50, 25]; // Points for 1st, 2nd, 3rd, and 4th places

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

function selectRanking(team) {
    // Remove team from rankings if already present
    if (rankings.includes(team)) {
        rankings = rankings.filter(r => r !== team);
        rankings.forEach((rankedTeam, index) => {
            document.getElementById(`${rankedTeam}-rank`).textContent = `${index + 1}${getOrdinal(index + 1)}`;
        });
        updateBoxColors();
        return;
    }

    if (rankings.length < 4) {
        rankings.push(team);
        updateRankings();
    }
    updateBoxColors();
}

function updateRankings() {
    const teams = ['Red', 'Blue', 'Green', 'Yellow'];
    teams.forEach((team, index) => {
        const rankLabel = document.getElementById(`${team}-rank`);
        if (rankings.indexOf(team) !== -1) {
            rankLabel.textContent = `${rankings.indexOf(team) + 1}${getOrdinal(rankings.indexOf(team) + 1)}`;
        } else {
            rankLabel.textContent = '';
        }
    });
}

function getOrdinal(n) {
    const j = n % 10;
    const k = n % 100;
    if (j === 1 && k !== 11) {
        return 'st';
    }
    if (j === 2 && k !== 12) {
        return 'nd';
    }
    if (j === 3 && k !== 13) {
        return 'rd';
    }
    return 'th';
}

function updateBoxColors() {
    const teams = ['Red', 'Blue', 'Green', 'Yellow'];
    teams.forEach((team) => {
        const box = document.getElementById(team);
        if (rankings.indexOf(team) === -1) {
            box.style.border = '1px solid black'; // Default border
        } else {
            box.style.border = '2px solid gold'; // Highlight selected
        }
    });
}

function scoreTeams() {
    // Assign points based on rankings
    rankings.forEach((team, index) => {
        if (teamScores[team] !== undefined) {
            teamScores[team] += rankingPoints[index];
            document.getElementById(`${team}-points`).textContent = teamScores[team];
        }
    });

    // Clear rankings
    rankings = [];
    updateRankings();
    updateBoxColors();
}

function clearScores() {
    document.getElementById('confirm-dialog').style.display = 'block';
}

function confirmClear(confirm) {
    if (confirm) {
        // Reset total scores
        Object.keys(teamScores).forEach(team => {
            teamScores[team] = 0;
            document.getElementById(`${team}-points`).textContent = teamScores[team];
        });
        // Clear rankings
        rankings = [];
        updateRankings();
        updateBoxColors();
    }
    document.getElementById('confirm-dialog').style.display = 'none';
}