export const monthDiff = (d1: Date, d2: Date) => {
  var months = 0;
  months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth();
  months += d2.getMonth();
  return months + 1;
};
