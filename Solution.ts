
function rankTeams(votes: string[]): string {
    this.ALPHABET_SIZE = 26;
    this.NO_TEAM_PRESENT = '\u0000';
    this.numberOfTeams = votes[0].length;

    const teams: Team[] = new Array(this.ALPHABET_SIZE);
    fillArrayTeams(votes, teams);
    teams.sort((x, y) => compareRanks(x, y));

    return createTeamsRanking(teams);
};

function fillArrayTeams(votes: string[], teams: Team[]): void {
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


function compareRanks(first: Team, second: Team): number {
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

function createTeamsRanking(teams: Team[]): string {
    const rankings: string[] = new Array();
    for (let team of teams) {
        if (team.letter !== this.NO_TEAM_PRESENT) {
            rankings.push(team.letter);
        }
    }
    return rankings.join('');
}

function codePoint(character: string): number {
    return character.codePointAt(0);
}

class Team {

    static NO_TEAM_PRESENT = '\u0000';
    letter = Team.NO_TEAM_PRESENT;
    frequencyRanking: number[];

    constructor(numberOfTeams: number) {
        this.frequencyRanking = new Array(numberOfTeams).fill(0);
    }
}
