import { defineStore } from "pinia";

export const usePiniaStore = defineStore("pinia", {
  state: () => ({
    players: [],
    games: [],
    teams: [],
    bets: [],
    activePlayer: "",
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
  },

  actions: {},
});
