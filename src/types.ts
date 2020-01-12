
export interface IChip {
  key: number;
  label?: string;
  canRemove?: boolean;
}

export interface ChipProps extends IChip {
  label: string;
  className?: string;
}

export interface ContainerChangeEvent {
  actions: [{
    type: 'add' | 'remove';
    index: number;
  }?];
  item: DraggableItem;
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
