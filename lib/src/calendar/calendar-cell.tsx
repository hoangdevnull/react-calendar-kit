import React, { useRef } from 'react';
import { CalendarDate, getDayOfWeek, isSameDay, isSameMonth, isToday } from '@internationalized/date';
import { AriaCalendarCellProps, useCalendarCell } from '@react-aria/calendar';
import { useFocusRing } from '@react-aria/focus';
import { useLocale } from '@react-aria/i18n';
import { useHover } from '@react-aria/interactions';
import { mergeProps } from '@react-aria/utils';
import type { CalendarState, RangeCalendarState } from '@react-stately/calendar';

import { ElementProps } from '../../dist/types/common.types';
import { withAttr } from '../utils';

export interface CalendarCellProps extends ElementProps<'td'>, AriaCalendarCellProps {
  state: CalendarState | RangeCalendarState;
  isPickerVisible?: boolean;
  currentMonth: CalendarDate;
}

export function CalendarCell(originalProps: CalendarCellProps) {
  const { state, isPickerVisible, currentMonth, ...props } = originalProps;

  const ref = useRef<HTMLButtonElement>(null);

  const { cellProps, buttonProps, isPressed, isSelected, isDisabled, isFocused, isInvalid, formattedDate } =
    useCalendarCell(
      {
        ...props,
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
  const { locale } = useLocale();
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
    <td data-type="cell" {...cellProps}>
      <span
        {...mergeProps(buttonProps, hoverProps, focusProps)}
        ref={ref}
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
