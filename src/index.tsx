import './index.css';

export {ChipContainer as ChipContainer} from './chip-container';

// Using named exports because Rollup hicks up when exporting an interface.
import {ChipContainerProps as _ChipContainerProps} from './chip-container';
export type ChipContainerProps = _ChipContainerProps;
