
#include <span>
#include <array>
#include <vector>
#include <ranges>
#include <compare>
using namespace std;

struct Team {

    static const char NO_TEAM_PRESENT = '\u0000';

    char letter = NO_TEAM_PRESENT;
    vector<int> frequencyRanking;

    Team() = default;

    explicit Team(int numberOfTeams) {
        frequencyRanking.resize(numberOfTeams);
    }
};

class Solution {

    static const int ALPHABET_SIZE = 26;
    static const char NO_TEAM_PRESENT = '\u0000';
    int numberOfTeams = 0;

    static inline auto compareRanks = [](const Team& first, const Team& second) {
        strong_ordering ranking{ first.frequencyRanking <=> second.frequencyRanking };

        return ranking == strong_ordering::equal
                ? first.letter < second.letter
                : ranking == strong_ordering::greater;
        };

public:
    string rankTeams(const vector<string>& votes) {
        numberOfTeams = votes[0].length();
        array <Team, ALPHABET_SIZE> teams{};

        fillArrayTeams(votes, teams);
        ranges::sort(teams, compareRanks);

        return createTeamsRanking(teams);
    }

private:
    void fillArrayTeams(span<const string> votes, span<Team> teams) const {
        for (size_t i = 0; i < ALPHABET_SIZE; ++i) {
            teams[i] = Team(numberOfTeams);
        }

        for (const auto& vote : votes[0]) {
            teams[vote - 'A'].letter = vote;
        }

        for (const auto& ranking : votes) {
            for (size_t i = 0; i < ranking.length(); ++i) {
                ++teams[ranking[i] - 'A'].frequencyRanking[i];
            }
        }
    }

    string createTeamsRanking(span<const Team> teams) const {
        string rankings;
        for (const auto& team : teams) {
            if (team.letter != NO_TEAM_PRESENT) {
                rankings.push_back(team.letter);
            }
        }
        return rankings;
    }
};
