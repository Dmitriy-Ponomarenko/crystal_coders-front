import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://crystal-coders-back.onrender.com';

export const createVolume = createAsyncThunk(
  'water/createVolume',
  async data => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('No authentication token found. Please log in.');
    }

    try {
      const response = await axios.post(`${BASE_URL}/water`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const updateVolume = createAsyncThunk(
  'water/updateVolume',
  async ({ id, data }) => {
    const token = localStorage.getItem('authToken');
    console.log(id);
    const response = await axios.patch(`${BASE_URL}/water/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  }
);

export const deleteVolume = createAsyncThunk('water/deleteVolume', async id => {
  const token = localStorage.getItem('authToken');
  const response = await axios.delete(`${BASE_URL}/water/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
});

export const fetchVolumes = createAsyncThunk('water/fetchVolumes', async () => {
  const token = localStorage.getItem('authToken');
  const response = await axios.get(`${BASE_URL}/water`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
});

export const fetchVolumeById = createAsyncThunk(
  'water/fetchVolumeById',
  async id => {
    const token = localStorage.getItem('authToken');
    const response = await axios.get(`${BASE_URL}/water/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

export const fetchWaterConsumptionForMonth = createAsyncThunk(
  'water/fetchWaterConsumptionForMonth',
  async month => {
    const token = localStorage.getItem('authToken');
    const response = await axios.get(`${BASE_URL}/water/consumption/month`, {
      params: { month },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

export const fetchWaterConsumptionForDay = createAsyncThunk(
  'water/fetchWaterConsumptionForDay',
  async day => {
    const token = localStorage.getItem('authToken');
    const response = await axios.get(`${BASE_URL}/water/consumption/day`, {
      params: { day },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response.data;
  }
);
