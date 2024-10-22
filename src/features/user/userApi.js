import axiosInstance from "@/lib/axiosInstance";
import { setCredentials, logout } from "@/app/api/auth/authSlice";

export const signupUser = (userData) => async (dispatch) => {
  try {
    const response = await axiosInstance.post("/auth/signup", userData);
    dispatch(
      setCredentials({ user: response.data.user, token: response.data.token })
    );
  } catch (error) {
    throw new Error(error.response?.data?.message || "Signup failed");
  }
};

export const loginUser = (credentials) => async (dispatch) => {
  try {
    const response = await axiosInstance.post("/auth/login", credentials);
    dispatch(
      setCredentials({ user: response.data.user, token: response.data.token })
    );
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    await axiosInstance.post("/auth/logout");
    dispatch(logout());
  } catch (error) {
    throw new Error(error.response?.data?.message || "Logout failed");
  }
};
