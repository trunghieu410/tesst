export const calculateDaysDifference = (dateRange: string): number | null => {
  if (!dateRange) return null;

  const parts = dateRange.split(" - ");
  if (parts.length !== 2) return null;

  const parseDate = (dateString: string): Date | null => {
    const parts = dateString.split(".");
    if (parts.length >= 2) {
      const [day, month, year] = parts.map(Number);
      const currentYear = year || new Date().getFullYear();
      return new Date(currentYear, month - 1, day);
    }
    return null;
  };

  const startDate = parseDate(parts[0]);
  const endDate = parseDate(parts[1]);

  if (startDate && endDate) {
    const diffTime = endDate.getTime() - startDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include both start and end dates
    return diffDays;
  }

  return null;
};
