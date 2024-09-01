let rankings = {
    Red: null,
    Blue: null,
    Green: null,
    Yellow: null
};

let totalScores = {
    Red: 0,
    Blue: 0,
    Green: 0,
    Yellow: 0
};

function selectRanking(color) {
    const currentRanking = Object.values(rankings).filter(rank => rank !== null).length + 1;
    if (rankings[color] === null) {
        rankings[color] = currentRanking;
    } else {
        rankings[color] = null;
        for (let key in rankings) {
            if (rankings[key] && rankings[key] > rankings[color]) {
                rankings[key] -= 1;
            }
        }
    }
    updateRankings();
}

function updateRankings() {
    for (let color in rankings) {
        const rankElement = document.getElementById(`${color}-points`);
        if (rankings[color]) {
            rankElement.textContent = `${color}: ${rankings[color]} place`;
        } else {
            rankElement.textContent = `${color}: ${totalScores[color]}`;
        }
    }
}

function adjustPoints(color, points) {
    totalScores[color] += points;
    document.getElementById(`${color}-points`).textContent = `${color}: ${totalScores[color]}`;
}

function scoreTeams() {
    const pointsMap = {1: 100, 2: 75, 3: 50, 4: 25};
    for (let color in rankings) {
        if (rankings[color]) {
            totalScores[color] += pointsMap[rankings[color]];
            rankings[color] = null;
        }
    }
    updateRankings();
}

function clearScores() {
    if (confirm("Are you sure you want to clear all scores?")) {
        for (let color in totalScores) {
            totalScores[color] = 0;
            rankings[color] = null;
        }
        updateRankings();
    }
}

