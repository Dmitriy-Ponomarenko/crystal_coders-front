export const selectVolumes = state => state.water.volumes;
export const selectVolume = state => state.water.volume;
export const selectLoading = state => state.water.loading;
export const selectError = state => state.water.error;
export const selectWaterConsumption = state => state.water.waterConsumption;
export const selectRemainingWaterPercentage = state =>
  state.water.remainingPercentage;
