import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  name: string;
  email: string;
}

interface UserSliceState {
  isAuthenticated: boolean;
  loading: boolean;
  user: User | null;
}

const initialState: UserSliceState = {
  isAuthenticated: false,
  loading: false,
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.loading = false;
    },
    setUserLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    logoutUser: (state) => {
      state.isAuthenticated = false;
      state.loading = false;
      state.user = null;
    },
    loginFailure: (state) => {
      state.isAuthenticated = false;
      state.loading = false;
      state.user = null;
    },
  },
});

export const { setUser, setUserLoading, logoutUser, loginFailure } =
  userSlice.actions;
export default userSlice;
