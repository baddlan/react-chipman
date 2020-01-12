import React from 'react';

import isArray from 'lodash/isArray';
import isString from 'lodash/isString';
import { Container, ContainerOptions, Draggable, DropResult, OnDropCallback } from 'react-smooth-dnd';

import { Chip } from './chip';
import { ChipProps, ContainerChangeEvent, DraggableItem, IChip} from './types';

export interface ChipContainerProps {
  id?: string;
  /**
   * Determine the orientation of the Chips list. This defaults to `horizontal`.
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * An optional class name used for styling the chips and their container.
   * If no `className` is set a default value will be used to apply basic
   * styles.
   */
  className?: string;
  /**
   * Containers that share the same `group` value can exchange draggable
   * items among each other. This can be useful for implementing UI that
   * manipulates many-to-many model relationships.
   */
  group?: string;
  /**
   * Remove an item when dropped outside the boundaries of its parent container
   * or any container that shares the same `group`.
   */
  removeOnDropOut?: boolean;
  /**
   * A list of ChipProps to populate draggable items in the container which
   * uses the data to render Chip components as its children.
   *
   * Important Note: the properties `chips` and `children` are mutually
   * exclusive with precedence given to `children`. Setting both properties
   * can lead to unexpected behavior.
   */
  chips?: ChipProps[];
  /**
   * Optionally, instead of providing a data model in `chips`, ChipContainer
   * can directly receive a list of React elements as its children and they
   * will gain drag-and-drop capabilities. However, some of the differences
   * between the two approaches include the following:
   *
   * - Unlike `chips`, the container does not provide an option to remove
   *   `children`. That must be manually implemented by the container user.
   *
   * Important Note: the properties `chips` and `children` are mutually
   * exclusive with precedence given to `children`. Setting both properties
   * can lead to unexpected behavior.
   */
  children?: Array<React.ReactElement<IChip>>;
  /**
   * An event that gets fired when chips are added, removed or changed
   * position in the container.
   */
  onChange?: (event: ContainerChangeEvent) => void;
}

interface State {
  chips?: ChipProps[];
  children?: Array<React.ReactElement<IChip>>;
}

/**
 * A container that adds drag-and-drop capabilities to chip components.
 *
 * The draggable items can be provided as an array of either ChipProps
 * or as React elements directly embedded as children of this component.
 */
export class ChipContainer extends React.Component<ChipContainerProps, State> {

  public static readonly DEFAULT_PROPS: Partial<ChipContainerProps> = {
    className: 'cm-container',
    orientation: 'horizontal',
  };
  public static readonly CHIP_CLASS_PREFIX = 'cm-cont-';

  protected keyGroup: string = '';
  protected dropHandler: OnDropCallback;
  protected draggableByIndexHandler: ContainerOptions['getChildPayload'];

  /** Constructor */
  constructor(props: ChipContainerProps) {
    super(props);
    this.dropHandler = this.onDrop.bind(this);
    this.draggableByIndexHandler = this.getDraggableByIndex.bind(this);

    // Preprocess chip props
    const chips: ChipProps[] | undefined = this.props.chips?.map((chip) => {
      const newChip = {...chip};
      // Add a class name that identifies chips with their parent container
      if (props.id) {
        newChip.className = (newChip.className && isString(newChip.className) && newChip.className.length > 0)
                          ? ` ${ChipContainer.CHIP_CLASS_PREFIX}${props.id}`
                          : `${ChipContainer.CHIP_CLASS_PREFIX}${props.id}`;
      }

      return newChip;
    });

    let children;

    if (props.children) {
      children = isArray(props.children) ? [...props.children]
                                                 : [props.children as React.ReactElement];
    }

    this.state = { chips, children };

    if (props.group) {
      this.keyGroup = `${props.group}-`;
    }
  }

  /** @override */
  public render() {
    const {id, orientation, group, className, removeOnDropOut} = {...ChipContainer.DEFAULT_PROPS, ...this.props};
    const draggables = this.state.children ? this.renderChildren()
                                           : this.state.chips ? this.renderChips()
                                                              : [];
    return (
      <div id={id} className={className}>
        <Container
          groupName={group}
          removeOnDropOut={removeOnDropOut}
          orientation={orientation}
          getChildPayload={this.state.chips || this.state.children ? this.draggableByIndexHandler : undefined}
          onDrop={this.dropHandler}
        >
          {draggables}
        </Container>
      </div>
    );
  }

  /**
   * Render chips.
   * @param chips
   */
  protected renderChips() {
    return this.state.chips && this.state.chips.map((chip) => (
      <Draggable key={chip.key || `${this.keyGroup}${chip.key}`}>
        <Chip {...chip}/>
      </Draggable>
    ));
  }

  /**
   * Render child components.
   * @param children
   */
  protected renderChildren() {
    if (isArray(this.state.children)) {
      return this.state.children.map((child, index) => (
        <Draggable key={child.key || `${this.keyGroup}${index}`}>
          {child}
        </Draggable>
      ));
    } else {
      return (
        <Draggable>
          {this.state.children}
        </Draggable>
      );
    }
  }

  /**
   * A SmoothDnD callback to return a draggable item given its index.
   *
   * @param index
   */
  protected getDraggableByIndex(index: number): DraggableItem | undefined {
    if (this.state.children && isArray(this.state.children)) {
      return this.state.children[index];
    } else if (isArray(this.state.chips)) {
      return this.state.chips[index];
    } else {
      return undefined;
    }
  }

  /**
   * A SmoothDnD event handler that gets called when a draggable is dropped.
   * We use this to update
   *
   * @param dropResult
   */
  protected onDrop(dropResult: DropResult): void {
    if (this.state.children) {
      const draggables = this.applyDropResult(this.state.children, dropResult);
      this.setState({
        children: draggables,
      });
    } else if (this.state.chips) {
      const draggables = this.applyDropResult(this.state.chips, dropResult);
      this.setState({
        chips: draggables,
      });
    }
  }

  /**
   * Manipulate the provided list of `draggables` in accordance to changes
   * specified in `dropResult`. This method also fires a `change` event
   * after applying all the necessary changes.
   *
   * @param draggables DraggableItem[] An array of draggable items (ChipProps or React Elements).
   * @param dropResult DropResult @see SmoothDnD for details about drop result contents.
   * @return The modified list of draggables.
   */
  protected applyDropResult<T extends DraggableItem>(draggables: T[], dropResult: DropResult): T[] {
    const { removedIndex, addedIndex, payload } = dropResult;

    // If there is nothing to add or remove, return the original draggables array
    if (removedIndex === null && addedIndex === null) {
      return draggables;
    }

    const result = [...draggables];
    let itemToAdd = payload;
    const eventActions: ContainerChangeEvent['actions'] = [];

    // Item removed
    if (removedIndex !== null) {
      itemToAdd = result.splice(removedIndex, 1)[0];
      eventActions.push({ type: 'remove', index: removedIndex });
    }

    // Item added
    // Note: if both `removedIndex` and `addedIndex` have numeric values, then the
    // position of the item has changed.
    if (addedIndex !== null) {
      result.splice(addedIndex, 0, itemToAdd);
      eventActions.push({ type: 'add', index: addedIndex });
    }

    // Fire change event if a callback is provided in the props
    if (this.props.onChange) {
      const changeEvent: ContainerChangeEvent = {
        actions: eventActions,
        item: payload,
      };

      this.props.onChange(changeEvent);
    }

    return result;
  }
}
