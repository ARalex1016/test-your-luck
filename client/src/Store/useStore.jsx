import { create } from "zustand";
import axios from "axios";

// Urls
const API_URL =
  import.meta.env.VITE_NODE_ENV === "production"
    ? import.meta.env.VITE_SERVER_URL_PRODUCTION
    : import.meta.env.VITE_SERVER_URL_DEVELOPMENT;

// Routes
const AUTH_ROUTE = import.meta.env.VITE_SERVER_AUTH_ROUTE;
const USER_ROUTE = import.meta.env.VITE_SERVER_USER_ROUTE;
const CONTEST_ROUTE = import.meta.env.VITE_SERVER_CONTEST_ROUTE;
const TICKET_ROUTE = import.meta.env.VITE_SERVER_TICKET_ROUTE;

axios.defaults.withCredentials = true;
if (import.meta.env.VITE_NODE_ENV === "development") {
  let token = localStorage.getItem("authToken");

  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

const setTokenInDev = (token) => {
  if (import.meta.env.VITE_NODE_ENV === "development") {
    localStorage.setItem("authToken", token);
    return;
  }
  return;
};

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
      const res = await axios.post(`${API_URL}${AUTH_ROUTE}signup`, userData);

      setTokenInDev(res.data.token);

      //   Success
      set({ user: res.data.data, isAuthenticated: true, error: null });
      return res;
    } catch (error) {
      // Error
      set({
        error: error.response.data.message,
        isAuthenticated: false,
      });

      throw Error(error.response.data.message);
    } finally {
      set({ isLoading: false });
    }
  },

  login: async (userData) => {
    set({ isLoading: true });

    try {
      const res = await axios.post(`${API_URL}${AUTH_ROUTE}login`, userData);

      setTokenInDev(res.data.token);

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
      const res = await axios.post(`${API_URL}${AUTH_ROUTE}check-auth`);

      //   Success
      set({ user: res.data.data, isAuthenticated: true, error: null });
    } catch (error) {
      // Error

      set({
        user: null,
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
      const res = await axios.post(`${API_URL}${AUTH_ROUTE}logout`);

      if (import.meta.env.VITE_NODE_ENV === "development") {
        localStorage.clear("authToken");
      }

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

  getAllContest: async () => {
    set({ isLoading: true });

    try {
      const res = await axios.get(`${API_URL}${CONTEST_ROUTE}`);

      //   Success
      set({ contest: res.data.data, error: null });
    } catch (error) {
      set({
        error: error.response.data.message,
      });
      throw Error;
    } finally {
      set({ isLoading: false });
    }
  },

  getContest: async (contestId) => {
    try {
      const res = await axios.get(`${API_URL}${CONTEST_ROUTE}${contestId}`);

      return res.data.data;
    } catch (error) {
      throw Error(error.response.data.message);
    }
  },

  getTicketById: async (ticketId) => {
    try {
      const res = await axios.get(`${API_URL}${TICKET_ROUTE}${ticketId}`);

      return res.data.data;
    } catch (error) {
      throw Error(error.response.data.message);
    }
  },

  participateContest: async (amount, contestId) => {
    try {
      const res = await axios.post(
        `${API_URL}${CONTEST_ROUTE}${contestId}/participate`,
        { amount }
      );

      return res.data;
    } catch (error) {
      throw Error(error.response.data.message);
    }
  },

  exchangeCoin: async (coins, contestId) => {
    try {
      const res = await axios.post(
        `${API_URL}${CONTEST_ROUTE}${contestId}/exchange-coin`,
        { coins }
      );

      return res.data;
    } catch (error) {
      throw Error(error.response.data.message);
    }
  },

  getReferrals: async () => {
    try {
      const res = await axios.get(`${API_URL}${USER_ROUTE}getReferrals`);

      return res.data.data;
    } catch (error) {
      throw Error(error.response.data.message);
    }
  },
}));

export default useStore;
