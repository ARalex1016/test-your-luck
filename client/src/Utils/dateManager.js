export const formatDate = (isoString) => {
  return new Date(isoString).toISOString().split("T")[0];
};
