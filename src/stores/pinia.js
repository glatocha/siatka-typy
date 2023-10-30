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
  },

  actions: {},
});
