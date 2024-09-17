import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://crystal-coders-back.onrender.com/';

const token = {
  setAuth(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  clearAuth() {
    axios.defaults.headers.common.Authorization = '';
  },
};

export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await axios.post('/users/logout');
    token.clearAuth();
    return;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const setAuthHeader = token => {
  if (token) {
    console.log(token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    console.log(
      'Authorization Header Set:',
      axios.defaults.headers.common.Authorization
    );
  }
};

const clearAuthHeader = () => {
  delete axios.defaults.headers.common.Authorization;
};

export const signIn = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await axios.post('auth/login', credentials);
      const accessToken = data.data.accessToken;
      setAuthHeader(accessToken);
      console.log(data.data.accessToken);

      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);
