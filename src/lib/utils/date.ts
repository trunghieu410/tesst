// Helper functions (pure, extracted outside component)
export const parseDateString = (dateString: string): Date | null => {
  const formats = [
    // MM/DD/YYYY format
    (str: string) => {
      const parts = str.split("/");
      if (parts.length === 3) {
        const [month, day, year] = parts.map(Number);
        return new Date(year, month - 1, day);
      }
      return null;
    },
    // DD.MM or DD.MM.YYYY format
    (str: string) => {
      const parts = str.split(".");
      if (parts.length >= 2) {
        const [day, month, year] = parts.map(Number);
        const currentYear = year || new Date().getFullYear();
        return new Date(currentYear, month - 1, day);
      }
      return null;
    },
  ];

  for (const formatParser of formats) {
    const date = formatParser(dateString);
    if (date && !isNaN(date.getTime())) {
      return date;
    }
  }
  return null;
};

export const formatDateForDisplay = (date: Date, showYear: boolean = false): string => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  return showYear
    ? `${day}.${month}.${date.getFullYear()}`
    : `${day}.${month}`;
};

export const formatDateRange = (
  startDate: Date | null,
  endDate: Date | null,
  showYear: boolean
): string => {
  if (startDate && endDate) {
    return `${formatDateForDisplay(startDate, showYear)} - ${formatDateForDisplay(endDate, showYear)}`;
  } else if (startDate) {
    return formatDateForDisplay(startDate, showYear);
  }
  return "";
};

export const areDatesEqual = (date1: Date, date2: Date): boolean => {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};

export const isDayInRange = (
  day: Date,
  startDate: Date | null,
  endDate: Date | null
): boolean => {
  return !!(startDate && endDate && day > startDate && day < endDate);
};

export const toUtcIsoString = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}T00:00:00Z`;
};

export const formatDateTimeTo = (datetime: string, toFormat: string = 'dd.MM.yyyy - HH:mm') => {
  const date = new Date(datetime);

  // Kiểm tra nếu date không hợp lệ
  if (isNaN(date.getTime())) {
    return datetime; // Trả về chuỗi gốc nếu không parse được
  }

  const pad = (num: number) => num.toString().padStart(2, '0');

  const tokens: Record<string, string> = {
    'yyyy': date.getFullYear().toString(),
    'MM': pad(date.getMonth() + 1), // Tháng trong JS bắt đầu từ 0
    'dd': pad(date.getDate()),
    'HH': pad(date.getHours()),     // Giờ 24
    'hh': pad(date.getHours() % 12 || 12), // Giờ 12
    'mm': pad(date.getMinutes()),
    'ss': pad(date.getSeconds()),
    'a': date.getHours() >= 12 ? 'PM' : 'AM'
  } 

  // Thay thế format string bằng giá trị thực
  return toFormat.replace(/yyyy|MM|dd|HH|hh|mm|ss|a/g, (match) => tokens[match]);
};