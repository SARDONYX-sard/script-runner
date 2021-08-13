import produce from "immer";
import create from "zustand";
import type { StorageData } from "../types/popup";

// define the type of state, actions are part of the state
type State = {
  data: StorageData;
  save: () => void;
  load: () => void;
  togglePower: () => void;
  toggle: (index: number) => void;
};

export const useStore = create<State>((set, get) => ({
  data: {
    power: true,
    scripts: [],
    options: {
      exclude: "",
    },
  },

  togglePower: () => {
    set(
      produce((state: State) => {
        state.data.power = !state.data.power;
      }),
    );
    get().save();
  },

  toggle: (index) => {
    set(
      produce((state: State) => {
        state.data.power = !state.data.power;
        const script = state.data.scripts[index];
        state.data.scripts[index].enable = !script.enable;
      }),
    );
    get().save();
  },

  /* Save state data to chrome chrome storage. */
  save: () =>
    set((state) => {
      chrome.storage.sync.set(state.data);

      return {
        data: state.data,
      };
    }),

  /* Get the `data` from the chrome storage and set it to `state`. */
  load: () => {
    chrome.storage.sync.get(get().data, (items) => {
      set({
        data: items.data,
      });
    });
  },
}));
