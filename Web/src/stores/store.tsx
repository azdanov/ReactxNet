import { createContext, ReactElement, useContext } from "react";

import ActivityStore from "./activity-store";
import ModalStore from "./modal-store";
import ProfileStore from "./profile-store";
import UserStore from "./user-store";

interface Store {
  activityStore: ActivityStore;
  userStore: UserStore;
  modalStore: ModalStore;
  profileStore: ProfileStore;
}

export const store: Store = {
  activityStore: new ActivityStore(),
  userStore: new UserStore(),
  modalStore: new ModalStore(),
  profileStore: new ProfileStore(),
};

const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}

export const StoreProvider = ({ children }: { children: ReactElement }) => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
