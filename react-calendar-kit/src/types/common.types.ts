export type ElementProps<ElementType extends React.ElementType, PropsToOmit extends string = never> = Omit<
  React.ComponentPropsWithoutRef<ElementType>,
  PropsToOmit
>;

export type SupportedCalendars =
  | 'buddhist'
  | 'ethiopic'
  | 'ethioaa'
  | 'coptic'
  | 'hebrew'
  | 'indian'
  | 'islamic-civil'
  | 'islamic-tbla'
  | 'islamic-umalqura'
  | 'japanese'
  | 'persian'
  | 'roc'
  | 'gregory';
