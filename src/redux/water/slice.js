import { createSlice } from '@reduxjs/toolkit';
import {
  fetchVolumes,
  fetchVolumeById,
  createVolume,
  updateVolume,
  deleteVolume,
  fetchWaterConsumptionForMonth,
  fetchWaterConsumptionForDay,
  // fetchRemainingWaterPercentage,
} from './operations';
import { toast } from 'react-hot-toast';

const waterSlice = createSlice({
  name: 'water',
  initialState: {
    volumes: [],
    volume: null,
    dailyWater: {},
    remainingPercentage: {},
    loading: false,
    error: null,
    waterConsumption: {
      month: null,
      day: null,
    },
  },
  reducers: {
    clearVolume: state => {
      state.volume = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchVolumes.pending, state => {
        state.loading = true;
      })
      .addCase(fetchVolumes.fulfilled, (state, action) => {
        state.loading = false;
        state.volumes = action.payload;
      })
      .addCase(fetchVolumes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        console.log(action.error.message);
      })
      .addCase(fetchVolumeById.pending, state => {
        state.loading = true;
      })
      .addCase(fetchVolumeById.fulfilled, (state, action) => {
        state.loading = false;
        state.volume = action.payload;
      })
      .addCase(fetchVolumeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createVolume.fulfilled, (state, action) => {
        state.volumes.push(action.payload);
        toast.success('Volume added successfully!');
      })
      .addCase(updateVolume.fulfilled, (state, action) => {
        const index = state.volumes.findIndex(
          volume => volume._id === action.payload._id
        );
        if (index !== -1) {
          state.volumes[index] = action.payload;
        }
      })
      .addCase(deleteVolume.fulfilled, (state, action) => {
        state.volumes = state.volumes.filter(
          volume => volume._id !== action.payload
        );
      })
      .addCase(fetchWaterConsumptionForMonth.fulfilled, (state, action) => {
        state.waterConsumption.month = action.payload;
      })
      .addCase(fetchWaterConsumptionForDay.fulfilled, (state, action) => {
        state.waterConsumption.day = action.payload;
        console.log(action.payload);
      });
    // .addCase(fetchRemainingWaterPercentage.fulfilled, (state, action) => {
    //   state.consumedPercentage = action.payload.consumedPercentage;
    // })
    // .addCase(fetchRemainingWaterPercentage.rejected, (state, action) => {
    //   state.error = action.payload || action.error.message;
    // });
  },
});

export const { clearVolume } = waterSlice.actions;
export default waterSlice.reducer;
