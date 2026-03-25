import { format, parseISO } from 'date-fns';

export function formatDate(dateString: string, formatStr = 'dd MMM yyyy, HH:mm') {
  if (!dateString) return '';
  try {
    return format(parseISO(dateString), formatStr);
  } catch {
    return dateString;
  }
}
