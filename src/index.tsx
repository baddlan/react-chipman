import {ChipContainerProps as _ChipContainerProps} from './chip-container';
import {
  ChipProps as _ChipProps,
  ContainerChangeEvent as _ContainerChangeEvent,
  DraggableItem as _DraggableItem,
  IChip as _IChip,
} from './types';
import './index.css';


export {ChipContainer as ChipContainer} from './chip-container';
export {Chip as Chip} from './chip';

// Using named exports because Rollup hicks up when exporting an interface.
export type ChipProps = _ChipProps;
export type ContainerChangeEvent = _ContainerChangeEvent;
export type DraggableItem = _DraggableItem;
export type IChip = _IChip;
