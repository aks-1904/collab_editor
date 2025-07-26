import { createSlice } from "@reduxjs/toolkit";

// Typescript interface of a logged in user
interface User {
  id: string;
  name: string;
  email: string;
}

// Typescript interface of UserSlice
interface UserSlice {
  isAuthenticated: boolean;
  loading: boolean;
  user: User | null; // Initially user will be null if not authenticated;
}

// Definition of UserSlice
const userSlice = createSlice({
  name: "user",
  initialState: {
    isAuthenticated: false,
    loading: false,
    user: null,
  } as UserSlice, // Assert the initial state type
  reducers: {
    // Actions
    setUser: (state, action) => {
      // To set logged in user
      state.isAuthenticated = true;
      state.user = action.payload;
      state.loading = false;
    },
    setUserLoading: (state, _) => {
      // When user profile is loading
      state.loading = true;
    },
    logoutUser: (state, _) => {
      // If user logout
      state.isAuthenticated = false;
      state.loading = false;
      state.user = null;
    },
    loginFailure: (state) => {
      // Action for login failed
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { setUser, setUserLoading, logoutUser, loginFailure } =
  userSlice.actions;
export default userSlice;
