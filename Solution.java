
import java.util.Arrays;

public class Solution {

    private static final int ALPHABET_SIZE = 26;
    private static final char NO_TEAM_PRESENT = '\u0000';
    private int numberOfTeams;

    public String rankTeams(String[] votes) {
        numberOfTeams = votes[0].length();
        Team[] teams = new Team[ALPHABET_SIZE];

        fillArrayTeams(votes, teams);
        Arrays.sort(teams, (x, y) -> compareRanks(x, y));

        return createTeamsRanking(teams);
    }

    private void fillArrayTeams(String[] votes, Team[] teams) {
        for (int i = 0; i < ALPHABET_SIZE; ++i) {
            teams[i] = new Team(numberOfTeams);
        }

        for (char vote : votes[0].toCharArray()) {
            teams[vote - 'A'].letter = vote;
        }

        for (String ranking : votes) {
            for (int i = 0; i < ranking.length(); ++i) {
                ++teams[ranking.charAt(i) - 'A'].frequencyRanking[i];
            }
        }
    }

    private int compareRanks(Team first, Team second) {
        int compareRankings = Arrays.compare(second.frequencyRanking, first.frequencyRanking);
        return compareRankings == 0
                ? first.letter - second.letter
                : compareRankings;

    }

    private String createTeamsRanking(Team[] teams) {
        StringBuilder rankings = new StringBuilder();
        for (Team team : teams) {
            if (team.letter != NO_TEAM_PRESENT) {
                rankings.append(team.letter);
            }
        }
        return rankings.toString();
    }
}

class Team {

    char letter;
    int[] frequencyRanking;

    Team(int numberOfTeams) {
        frequencyRanking = new int[numberOfTeams];
    }
}
