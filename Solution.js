
/**
 * @param {string[]} votes
 * @return {string}
 */
var rankTeams = function (votes) {
    this.ALPHABET_SIZE = 26;
    this.NO_TEAM_PRESENT = '\u0000';
    this.numberOfTeams = votes[0].length;

    const teams = new Array(this.ALPHABET_SIZE);
    fillArrayTeams(votes, teams);
    teams.sort((x, y) => compareRanks(x, y));

    return createTeamsRanking(teams);
};

/**
 * @param {string[]} votes
 * @param {Team[]} teams
 * @return {void}
 */
function fillArrayTeams(votes, teams) {
    for (let i = 0; i < this.ALPHABET_SIZE; ++i) {
        teams[i] = new Team(this.numberOfTeams);
    }

    for (let vote of votes[0]) {
        teams[codePoint(vote) - codePoint('A')].letter = vote;
    }

    for (let ranking of votes) {
        for (let i = 0; i < ranking.length; ++i) {
            ++teams[codePoint(ranking.charAt(i)) - codePoint('A')].frequencyRanking[i];
        }
    }
}

/**
 * @param {Team} first
 * @param {Team} second
 * @return {number}
 */
function compareRanks(first, second) {
    for (let i = 0; i < this.numberOfTeams; ++i) {
        if (first.frequencyRanking[i] > second.frequencyRanking[i]) {
            return -1;
        }
        if (first.frequencyRanking[i] < second.frequencyRanking[i]) {
            return 1;
        }
    }
    return codePoint(first.letter) - codePoint(second.letter);
}

/**
 * @param {Team[]} teams
 * @return {string}
 */
function createTeamsRanking(teams) {
    const rankings = new Array();
    for (let team of teams) {
        if (team.letter !== this.NO_TEAM_PRESENT) {
            rankings.push(team.letter);
        }
    }
    return rankings.join('');
}

/**
 * @param {string} character
 * @return {number}
 */
function codePoint(character) {
    return character.codePointAt(0);
}

class Team {

    static NO_TEAM_PRESENT = '\u0000';
    letter = Team.NO_TEAM_PRESENT;

    /**
     * @param {number} numberOfTeams
     */
    constructor(numberOfTeams) {
        this.frequencyRanking = new Array(numberOfTeams).fill(0);
    }
}
