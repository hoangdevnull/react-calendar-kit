import { clsx } from 'clsx';
import { DateValue, startOfYear } from "@internationalized/date";

export const cn = clsx;

export const withAttr = (cond: boolean | undefined) => {
    return (cond ? "true" : undefined) as any;
}


export function getYearRange(start?: DateValue, end?: DateValue): DateValue[] {
    const years: DateValue[] = [];

    if (!start || !end) {
        return years;
    }

    let current = startOfYear(start);

    while (current.compare(end) <= 0) {
        years.push(current);
        // Move to the first day of the next year
        current = startOfYear(current.add({ years: 1 }));
    }

    return years;
}

export function addMonths(date: DateValue, months: number): DateValue {
    return date.add({ months });
}

export function getMonthRange(year: DateValue) {
    const firstMonth = startOfYear(year);
    const months = [firstMonth];

    while (months.length < 12) {
        const prevMonth = months[months.length - 1];

        months.push(addMonths(prevMonth, 1));
    }

    return months;
}


/**
 * Merges multiple CSS properties objects into one.
 * Filters out any undefined or null values before merging.
 * @param styles An array of React.CSSProperties objects or undefined.
 * @returns A single merged React.CSSProperties object.
 */
export function mergeStyles(...styles: (React.CSSProperties | undefined | null)[]): React.CSSProperties {
    return styles?.reduce<React.CSSProperties>((acc, style) => {
        // Filter out falsy values to avoid unnecessary spread of undefined/null
        return style ? { ...acc, ...style } : acc;
    }, {}) ?? {};
}
