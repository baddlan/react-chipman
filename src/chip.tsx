import React from 'react';
import { ChipProps } from './types';

interface State {
  className: string;
}

/**
 * The Chip component is used to render draggables of ChipProps type.
 * @see ChipContainer for details.
 */
export class Chip extends React.Component<ChipProps, State> {

  /** Constructor */
  constructor(props: ChipProps) {
    super(props);
    const className = 'cm-chip' + (props.className ? ` ${props.className}` : '');
    this.state = {className};
  }

  /** @override */
  public render() {
    return (
      <div className={this.state.className}>
        {this.props.label}
        {this.props.canRemove && (
          <span>x</span>
        )}
      </div>
    );
  }
}
