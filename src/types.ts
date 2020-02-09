
export interface IChip {
  key: number;
  label?: string;
  canRemove?: boolean;
}

export interface ChipProps extends IChip {
  label: string;
  className?: string;
}

export interface ListActions {
  removedIndex: number | null;
  addedIndex: number | null;
  /** The item to which the above actions will be applied. */
  payload?: any;
}

export interface ListActionsResult<T> {
  /** List of named actions applied to the input items list to produce the output list above. */
  actions: ListActions;
  /** Modified list of items. */
  items: T[];
  /** The item provided in the input list of actions. */
  payload?: any;
}

export type DraggableItem = ChipProps | React.ReactElement<IChip>;

/**
 * A type transformer that converts a type with a mix of required and
 * optional properties into a new type where all the properties are
 * required but some of them may be undefined.
 */
export type Complete<T> = {
  [P in keyof Required<T>]: Pick<T, P> extends Required<Pick<T, P>> ? T[P] : (T[P] | undefined);
};
