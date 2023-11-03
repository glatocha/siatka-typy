import { defineStore } from "pinia";

export const usePiniaStore = defineStore("pinia", {
  state: () => ({
    players: [],
    games: [],
    teams: [],
    bets: [],
    activePlayer: null,
  }),
  getters: {
    team(state) {
      return (teamId) => {
        return state.teams.find((el) => teamId == el.id);
      };
    },
    teamId(state) {
      return (teamName) => {
        return state.teams.find((el) => teamName == el.name)?.id;
      };
    },
    betsTable(state) {
      return state.players.map((player) => {
        return {
          id: player.id,
          name: player.name,
          //for score = get the bets and filer for particular player, then use reduce function to count the one where bet is equal to the winner in games table
          score: state.bets
            .filter((b) => b.userId == player.id)
            .reduce((p, a) => {
              if (a.bet == state.games.find((g) => g.id == a.gameId).winner)
                return p + 1;
              else return p;
            }, 0),
        };
      });
    },
    gamesWithBets(state) {
      //returns the game structure as the original but adds to each game a bet from Player 1 - 4
      const table = [];
      state.games.forEach((g) => {
        const game = { ...g };
        game.player1Bet =
          state.bets.find((b) => {
            return b.userId == state.players[0].id && b.gameId == g.id;
          })?.bet ?? null;
        game.player2Bet =
          state.bets.find((b) => {
            return b.userId == state.players[1].id && b.gameId == g.id;
          })?.bet ?? null;
        game.player3Bet =
          state.bets.find((b) => {
            return b.userId == state.players[2].id && b.gameId == g.id;
          })?.bet ?? null;
        game.player4Bet =
          state.bets.find((b) => {
            return b.userId == state.players[3].id && b.gameId == g.id;
          })?.bet ?? null;
        table.push(game);
      });
      return table;
    },
    activePlayerBet(state) {
      //returns the bet of the given game Id of the active player
      return (gameId) => {
        return (
          state.bets.find((b) => {
            return b.gameId == gameId && b.userId == state.activePlayer.id;
          })?.bet ?? null
        );
      };
    },
  },

  actions: {},
});
