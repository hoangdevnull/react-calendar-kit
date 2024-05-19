import React, { useRef } from 'react';
import { getDayOfWeek, isSameDay, isSameMonth, isToday, type CalendarDate } from '@internationalized/date';
import { useCalendarCell, type AriaCalendarCellProps } from '@react-aria/calendar';
import { useFocusRing } from '@react-aria/focus';
import { useLocale } from '@react-aria/i18n';
import { useHover } from '@react-aria/interactions';
import { mergeProps } from '@react-aria/utils';
import { type CalendarState, type RangeCalendarState } from '@react-stately/calendar';

import { type ElementProps } from '../types/common.types';
import { withAttr } from '../utils';
import { type CalendarClassNames, type CalendarStyles } from './calendar-context';

export interface CalendarCellProps extends ElementProps<'td'>, AriaCalendarCellProps {
  state: CalendarState | RangeCalendarState;
  isPickerVisible?: boolean;
  currentMonth: CalendarDate;
  classNames?: CalendarClassNames;
  styles?: CalendarStyles;
}

export function CalendarCell({
  isPickerVisible,
  classNames,
  styles,
  state,
  currentMonth,
  ...props
}: CalendarCellProps) {
  const { locale } = useLocale();

  const ref = useRef<HTMLButtonElement>(null);
  const { cellProps, buttonProps, isPressed, isSelected, isDisabled, isFocused, isInvalid, formattedDate } =
    useCalendarCell(
      {
        ...props,
        date: props.date,
        isDisabled: !isSameMonth(props.date, currentMonth) || isPickerVisible,
      },
      state,
      ref
    );

  const isUnavailable = state.isCellUnavailable(props.date);
  const isLastSelectedBeforeDisabled =
    !isDisabled && !isInvalid && state.isCellUnavailable(props.date.add({ days: 1 }));
  const isFirstSelectedAfterDisabled =
    !isDisabled && !isInvalid && state.isCellUnavailable(props.date.subtract({ days: 1 }));
  const highlightedRange = 'highlightedRange' in state && state.highlightedRange;
  const isSelectionStart = isSelected && highlightedRange && isSameDay(props.date, highlightedRange.start);
  const isSelectionEnd = isSelected && highlightedRange && isSameDay(props.date, highlightedRange.end);
  const dayOfWeek = getDayOfWeek(props.date, locale);
  const isRangeStart = isSelected && (isFirstSelectedAfterDisabled || dayOfWeek === 0 || props.date.day === 1);
  const isRangeEnd =
    isSelected &&
    (isLastSelectedBeforeDisabled ||
      dayOfWeek === 6 ||
      props.date.day === currentMonth.calendar.getDaysInMonth(currentMonth));

  const { focusProps, isFocusVisible } = useFocusRing();
  const { hoverProps, isHovered } = useHover({
    isDisabled: isDisabled || isUnavailable || state.isReadOnly,
  });

  return (
    <td {...cellProps} role="grid-body-cell" className={classNames.gridBodyCell}>
      <span
        {...mergeProps(buttonProps, hoverProps, focusProps)}
        className={classNames.cellButton}
        style={styles?.cellButton}
        ref={ref}
        role="button"
        data-disabled={withAttr(isDisabled && !isInvalid)}
        data-focus-visible={withAttr(isFocused && isFocusVisible)}
        data-hover={withAttr(isHovered)}
        data-invalid={withAttr(isInvalid)}
        data-outside-month={withAttr(!isSameMonth(props.date, currentMonth))}
        data-pressed={withAttr(isPressed && !state.isReadOnly)}
        data-range-end={withAttr(isRangeEnd)}
        data-range-selection={withAttr(isSelected && 'highlightedRange' in state)}
        data-range-start={withAttr(isRangeStart)}
        data-readonly={withAttr(state.isReadOnly)}
        data-selected={withAttr(isSelected)}
        data-selection-end={withAttr(isSelectionEnd)}
        data-selection-start={withAttr(isSelectionStart)}
        data-today={withAttr(isToday(props.date, state.timeZone))}
        data-unavailable={withAttr(isUnavailable)}
      >
        <span>{formattedDate}</span>
      </span>
    </td>
  );
}
