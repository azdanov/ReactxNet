import { createContext, ReactNode, useContext } from "react";

import ActivityStore from "./activity-store";

interface Store {
  activityStore: ActivityStore;
}

const store: Store = {
  activityStore: new ActivityStore(),
};

const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
