import { create } from "zustand";
import axios from "axios";

// Urls
const API_URL =
  import.meta.env.VITE_NODE_ENV === "production"
    ? import.meta.env.VITE_SERVER_URL_PRODUCTION
    : import.meta.env.VITE_SERVER_URL_DEVELOPMENT;

// Routes
const USER_ROUTE = import.meta.env.VITE_SERVER_USER_ROUTE;
const CONTEST_ROUTE = import.meta.env.VITE_SERVER_CONTEST_ROUTE;

axios.defaults.withCredentials = true;

// Store
const useStore = create((set) => ({
  user: null,
  contest: null,
  isAuthenticated: false,
  isCheckingAuth: false,
  isLoading: false,
  error: null,

  signup: async (userData) => {
    set({ isLoading: true });

    try {
      const res = await axios.post(`${API_URL}${USER_ROUTE}signup`, userData);

      //   Success
      set({ user: res.data.data, isAuthenticated: true, error: null });
    } catch (error) {
      // Error
      set({
        error: error.response.data.message,
        isAuthenticated: false,
      });

      throw Error;
    } finally {
      set({ isLoading: false });
    }
  },

  login: async (userData) => {
    set({ isLoading: true });

    try {
      const res = await axios.post(`${API_URL}${USER_ROUTE}login`, userData);

      //   Success
      set({ user: res.data.data, isAuthenticated: true, error: null });
    } catch (error) {
      // Error
      set({
        error: error.response.data.message,
        isAuthenticated: false,
      });

      throw Error;
    } finally {
      set({ isLoading: false });
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true });

    try {
      const res = await axios.post(`${API_URL}${USER_ROUTE}check-auth`);

      //   Success
      set({ user: res.data.data, isAuthenticated: true, error: null });
    } catch (error) {
      // Error

      set({
        error: error.response.data.message,
        isAuthenticated: false,
      });

      throw Error;
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  logout: async () => {
    set({ isLoading: true });

    try {
      const res = await axios.post(`${API_URL}${USER_ROUTE}logout`);

      //   Success
      set({ user: res.data.data, isAuthenticated: false, error: null });
    } catch (error) {
      // Error
      console.log(error);

      set({
        error: error.response.data.message,
      });

      throw Error;
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useStore;
