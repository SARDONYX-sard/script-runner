import produce from "immer";
import map from "lodash/map";
import max from "lodash/max";
import create from "zustand";

import { StorageData } from "../types/popup";
import { replaceArrayElements } from "../utils/array";

// define the type of state, actions are part of the state
type State = {
  data: StorageData;
  save: () => void;
  load: () => void;
  toggleSwitch: () => void;
  changeScriptElement: (index: number, prop: string, value: string) => string;
  changeOptionsElement: (value: string) => string;
  addScript: (type: string) => void;
  _getAvailableId: () => number;
  removeScript(index: number): void;
  moveUp(index: number): void;
  moveDown(index: number): void;
  togglePower: (index: number) => void;
  // toggleSetting(): void;
  _init: () => void;
};

const DEFAULT_SCRIPT = {
  id: 0,
  enable: false,
  name: "Script",
  type: "snippet",
  src: "",
  code: "",
  host: "",
};

const DEFAULT_OPTIONS = {
  exclude: "",
};

export const useStore = create<State>((set, get) => ({
  data: {
    power: false,
    scripts: [],
    options: {
      exclude: "",
    },
  },

  toggleSwitch: () => {
    set(
      produce((state: State) => {
        state.data.power = !state.data.power;
      }),
    );
    get().save();
  },

  changeScriptElement: (index, prop, value) => {
    set(
      produce((state: State) => {
        state.data.scripts[index][prop] = value;
      }),
    );
    get().save();
    return value;
  },

  changeOptionsElement: (value) => {
    set(
      produce((state: State) => {
        state.data.options.exclude = value;
      }),
    );
    get().save();
    return value;
  },

  addScript: (type: string) => {
    const script = { ...DEFAULT_SCRIPT };
    const id = get()._getAvailableId();
    script.id = id ?? 0;
    script.type = type;
    script.name += id;
    set(
      produce((state: State) => {
        const tempScripts = [...state.data.scripts];
        tempScripts.push(script);
        state.data.scripts = tempScripts;
      }),
    );
    get().save();
  },

  _getAvailableId: () => {
    const { scripts } = get().data;
    if (scripts.length === 0) return 0;

    const numbers = map(scripts, "id");
    const num = max(numbers) ?? 0;

    return num + 1;
  },
  removeScript: (index: number) => {
    if (window.confirm("Would you like to delete?")) {
      set(
        produce((state: State) => {
          const tempScripts = [...state.data.scripts];
          state.data.scripts = tempScripts.filter((script) => tempScripts[index] !== script);
        }),
      );
      get().save();
    }
  },

  moveUp: (index: number) => {
    if (index - 1 >= 0) {
      set(
        produce((state: State) => {
          const tempScripts = [...state.data.scripts];
          state.data.scripts = replaceArrayElements(tempScripts, index - 1, index);
        }),
      );
      get().save();
    }
  },

  moveDown: (index: number) => {
    if (index + 1 < get().data.scripts.length) {
      set(
        produce((state: State) => {
          const tempScripts = [...state.data.scripts];
          [tempScripts[index + 1], tempScripts[index]] = [tempScripts[index], tempScripts[index + 1]];
          // state.data.scripts = replaceArrayElements(tempScripts, index + 1, index);
          state.data.scripts = [...tempScripts];
        }),
      );
      get().save();
    }
  },

  togglePower: (index: number) => {
    set(
      produce((state: State) => {
        const script = state.data.scripts[index];
        state.data.scripts[index].enable = !script.enable;
      }),
    );
    get().save();
  },

  /* Save state data to chrome chrome storage. */
  save: () => {
    set((state) => {
      chrome.storage.sync.set(state.data, () => console.log("saved."));

      return {
        data: state.data,
      };
    });
  },

  /* Get the `data` from the chrome storage and set it to `state`. */
  load: () => {
    chrome.storage.sync.get(get().data, (items) => {
      const data = items as StorageData | undefined;

      if (data) {
        set(
          produce((state: State) => {
            state.data = data;
          }),
        );
      }
    });
  },

  _init: () => {
    if (window.confirm("Would you like to initialize?")) {
      get().load();
      chrome.storage.sync.remove(Object.keys(get().data));
      set({
        data: { power: true, scripts: [], options: DEFAULT_OPTIONS },
      });
    }
  },
}));
