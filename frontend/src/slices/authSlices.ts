import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of the user information
interface UserInfo {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  profile_picture: string;
}

// Define the shape of the initial state
interface AuthState {
  userInfo: UserInfo | null;
}

// Define the initial state
const initialState: AuthState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo") as string)
    : null,
};

// Create the slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Action to set user credentials
    setCredentials: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    // Action to log out the user
    logout: (state) => {
      state.userInfo = null;
      // Clear all data from localStorage
      localStorage.removeItem("userInfo");
    },
  },
});

// Export actions for use in components
export const { setCredentials, logout } = authSlice.actions;

// Export the reducer for use in the store
export default authSlice.reducer;
