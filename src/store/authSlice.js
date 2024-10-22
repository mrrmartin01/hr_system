import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { signIn, signOut } from 'next-auth/react';

export const signupUser = createAsyncThunk(
  'auth/signup',
  async ({ firstname, lastname, email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstname, lastname, email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        await signIn('credentials', { email, password, redirect: false });
        return data;
      }
      return rejectWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const signinUser = createAsyncThunk(
  'auth/signin',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const result = await signIn('credentials', { email, password, redirect: false });
      if (result.error) {
        return rejectWithValue({ message: result.error });
      }
      return { success: true };
    } catch (error) {
      return rejectWithValue({ message: 'An error occurred during sign in' });
    }
  }
);

export const signoutUser = createAsyncThunk(
  'auth/signout',
  async (_, { rejectWithValue }) => {
    try {
      await signOut({ redirect: false });
      return { success: true };
    } catch (error) {
      return rejectWithValue({ message: 'An error occurred during sign out' });
    }
  }
);

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(signinUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signinUser.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(signinUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(signoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { setUser, clearError } = authSlice.actions;
export default authSlice.reducer;