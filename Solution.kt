
class Solution {

    companion object {
        const val ALPHABET_SIZE = 26;
        const val NO_TEAM_PRESENT = '\u0000';
    }

    private var numberOfTeams = 0;

    fun rankTeams(votes: Array<String>): String {
        numberOfTeams = votes[0].length;
        val teams = ArrayList<Team>(ALPHABET_SIZE);

        fillArrayTeams(votes, teams);
        teams.sortWith { x, y -> compareRanks(x, y) }

        return createTeamsRanking(teams);
    }

    private fun fillArrayTeams(votes: Array<String>, teams: ArrayList<Team>) {
        for (i in 0..<ALPHABET_SIZE) {
            teams.add(Team(numberOfTeams));
        }

        for (vote in votes[0]) {
            teams[vote - 'A'].letter = vote;
        }

        for (ranking in votes) {
            for (i in ranking.indices) {
                ++teams[ranking[i] - 'A'].frequencyRanking[i];
            }
        }
    }

    private fun compareRanks(first: Team, second: Team): Int {
        for (i in 0..<numberOfTeams) {
            if (first.frequencyRanking[i] > second.frequencyRanking[i]) {
                return -1;
            }
            if (first.frequencyRanking[i] < second.frequencyRanking[i]) {
                return 1;
            }
        }
        return first.letter - second.letter;
    }

    private fun createTeamsRanking(teams: ArrayList<Team>): String {
        val rankings = StringBuilder();
        for (team in teams) {
            if (team.letter != NO_TEAM_PRESENT) {
                rankings.append(team.letter);
            }
        }
        return rankings.toString();
    }
}

data class Team(val numberOfTeams: Int) {
    var letter: Char = Solution.NO_TEAM_PRESENT;
    val frequencyRanking: IntArray = IntArray(numberOfTeams);
}
