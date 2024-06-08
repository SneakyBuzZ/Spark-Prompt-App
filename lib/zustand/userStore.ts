import { StateCreator, create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { UserType } from "@/utils/type";

type State = {
  user: UserType;
  isUserLoggedIn: boolean;
};

type Actions = {
  addUser: (user: UserType) => void;
  reset: () => void;
  updateUser: (user: UserType) => void;
};

const initialState: State = {
  user: {
    id: "",
    name: "",
    email: "",
    image: "",
  },
  isUserLoggedIn: false,
};

type userSliceType = State & Actions;

const userSlice: StateCreator<userSliceType, [], [], userSliceType> = (
  set
) => ({
  ...initialState,
  addUser: (user: UserType) => {
    set((state) => ({
      ...state,
      user: {
        ...state.user,
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
      },
      isUserLoggedIn: true,
    }));
  },
  updateUser: (user: UserType) => {
    set((state) => ({
      ...state,
      user: {
        ...state.user,
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
      },
    }));
  },
  reset: () => {
    set(initialState);
  },
});

const useUserStore = create(
  devtools(
    persist(userSlice, {
      name: "user",
    })
  )
);

export default useUserStore;
