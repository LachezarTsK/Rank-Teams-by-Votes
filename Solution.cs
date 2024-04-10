
using System;

public class Solution
{
    private static readonly int ALPHABET_SIZE = 26;
    private static readonly char NO_TEAM_PRESENT = '\u0000';
    private int numberOfTeams;

    public string RankTeams(string[] votes)
    {
        numberOfTeams = votes[0].Length;
        Team[] teams = new Team[ALPHABET_SIZE];

        FillArrayTeams(votes, teams);
        Array.Sort(teams, (x, y) => CompareRanks(x, y));

        return CreateTeamsRanking(teams);
    }

    private void FillArrayTeams(string[] votes, Team[] teams)
    {
        for (int i = 0; i < ALPHABET_SIZE; ++i)
        {
            teams[i] = new Team(numberOfTeams);
        }

        foreach (char vote in votes[0])
        {
            teams[vote - 'A'].letter = vote;
        }

        foreach (string ranking in votes)
        {
            for (int i = 0; i < ranking.Length; ++i)
            {
                ++teams[ranking[i] - 'A'].frequencyRanking[i];
            }
        }
    }

    private int CompareRanks(Team first, Team second)
    {
        for (int i = 0; i < numberOfTeams; ++i)
        {
            if (first.frequencyRanking[i] > second.frequencyRanking[i])
            {
                return -1;
            }
            if (first.frequencyRanking[i] < second.frequencyRanking[i])
            {
                return 1;
            }
        }
        return first.letter - second.letter;
    }

    private string CreateTeamsRanking(Team[] teams)
    {
        StringBuilder rankings = new StringBuilder();
        foreach (Team team in teams)
        {
            if (team.letter != NO_TEAM_PRESENT)
            {
                rankings.Append(team.letter);
            }
        }
        return rankings.ToString();
    }
}

class Team
{
    public char letter;
    public int[] frequencyRanking;

    public Team(int numberOfTeams)
    {
        frequencyRanking = new int[numberOfTeams];
    }
}
