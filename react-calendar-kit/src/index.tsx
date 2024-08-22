import { I18nProvider as LocaleProvider } from '@react-aria/i18n';

import { Calendar, RangeCalendar } from './calendar';
import { useDatePicker } from './date-picker/use-date-picker';
import { useDateRangePicker } from './date-picker/use-date-range-picker';
import { default as DateInput } from './input/date-input';
import { default as DateRangeInput } from './input/date-range-input';
import { default as TimeInput } from './input/time-input';

export const CalendarKit = {
  DateInput,
  TimeInput,
  DateRangeInput,
  Calendar,
  RangeCalendar,
  useDatePicker,
  useDateRangePicker,
};

export {
  DateInput,
  TimeInput,
  DateRangeInput,
  Calendar,
  RangeCalendar,
  useDatePicker,
  useDateRangePicker,
  LocaleProvider,
};

export type { CalendarProps, RangeCalendarProps } from './calendar';
export type { UseDatePickerProps } from './date-picker/use-date-picker';
export type { UseDateRangePickerProps } from './date-picker/use-date-range-picker';
export type { DateInputProps } from './input/date-input';
export type { DateRangeInputProps } from './input/date-range-input';
export type { TimeInputProps } from './input/time-input';
export type { RangeValue } from '@react-types/shared';
export type { DateValue, TimeValue, DateRange } from '@react-aria/datepicker';
