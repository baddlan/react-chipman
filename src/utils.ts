import {ListActions, ListActionsResult} from './types';

/**
 * Modify the list of `items` based on the `actions` provided.
 * @param items
 * @param actions
 */
export function applyListActions<T>(items: T[], actions: ListActions): ListActionsResult<T> {
  const { removedIndex, addedIndex, payload } = actions;

  // If there is nothing to add or remove, return the original items list
  if (removedIndex === null && addedIndex === null) {
    return { actions, items };
  }

  const outItems = [...items];
  let itemToAdd = payload;

  // Item removed
  if (removedIndex !== null) {
    itemToAdd = outItems.splice(removedIndex, 1)[0];
  }

  // Item added
  // Note: if both `removedIndex` and `addedIndex` have numeric values, then the
  // position of the item has changed.
  if (addedIndex !== null) {
    outItems.splice(addedIndex, 0, itemToAdd);
  }

  return {
    actions,
    items: outItems,
  };
}
