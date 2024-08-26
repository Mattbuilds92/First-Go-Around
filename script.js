let rankings = [];
const points = { Red: 0, Blue: 0, Green: 0, Yellow: 0 };
const totalPoints = { Red: 0, Blue: 0, Green: 0, Yellow: 0 };

function selectRanking(color) {
    // Remove the existing ranking for the color if any
    rankings = rankings.filter(rank => rank !== color);
    
    // Add the selected color to the rankings
    if (rankings.length < 4 && !rankings.includes(color)) {
        rankings.push(color);
    }
    
    // Update ranking display
    updateRankingDisplay();
}

function updateRankingDisplay() {
    const ranks = ['1st', '2nd', '3rd', '4th'];
    const colorElements = document.querySelectorAll('.ranking');
    
    colorElements.forEach((element, index) => {
        if (index < rankings.length) {
            element.textContent = `${ranks[index]}`;
        } else {
            element.textContent = '';
        }
    });
}

function scoreTeams() {
    const scores = { '1st': 100, '2nd': 75, '3rd': 50, '4th': 25 };
    
    // Reset points
    for (const color in points) {
        points[color] = 0;
    }
    
    // Assign points based on rankings
    rankings.forEach((color, index) => {
        const rank = ['1st', '2nd', '3rd', '4th'][index];
        if (rank) {
            points[color] = scores[rank];
            totalPoints[color] += points[color];
        }
    });
    
    // Update score display
    updateScoreDisplay();
    
    // Clear rankings
    rankings = [];
    updateRankingDisplay();
}

function updateScoreDisplay() {
    for (const color in points) {
        document.getElementById(`${color}-points`).textContent = `${color}: ${totalPoints[color]}`;
    }
}

function adjustPoints(color, amount) {
    totalPoints[color] += amount;
    updateScoreDisplay();
}

function clearScores() {
    document.getElementById('confirm-dialog').style.display = 'block';
}

function confirmClear(confirm) {
    if (confirm) {
        // Reset all scores
        for (const color in totalPoints) {
            totalPoints[color] = 0;
        }
        updateScoreDisplay();
    }
    // Hide confirmation dialog
    document.getElementById('confirm-dialog').style.display = 'none';
}
