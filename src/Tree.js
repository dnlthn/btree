export default class Tree {
  constructor(args) {
    const { root = null, comparator = false } = args || {};
    this.root = root;
    this.compare = comparator || ((first, second) => first.data < second.data);
  }

  insert(node) {
    if (this.root === null) this.root = node;
    else if (this.contains(node.data))
      alert(`${node.data} is already in the tree`);
    else recursive_insert(node, this.root, { comparator: this.compare });
  }

  remove(node, current = this.root) {
    if (!this.root || !current) return null;

    if (node.data === current.data) this.remove_node(current);

    const less_than_current = this.compare(node, current);
    if (less_than_current) return this.remove(node, current.left);
    else return this.remove(node, current.right);
  }

  remove_node(node_to_remove) {
    const parent_node =
      this.get_parents(node_to_remove.data).pop() || this.root;

    const has_two_children = node_to_remove.left && node_to_remove.right;
    const has_no_children = !node_to_remove.left && !node_to_remove.right;

    if (has_two_children) this.swap_with_lowest(node_to_remove, parent_node);
    else if (has_no_children) this.remove_leaf(node_to_remove, parent_node);
    else this.swap_with_leaf(node_to_remove, parent_node);
  }

  swap_with_lowest(node, parent) {
    const smallest_node = left_most_node(node.right);
    const smallest_parent = this.get_parents(smallest_node.data).pop();

    smallest_node.left = node.left;
    smallest_parent.left = null;

    this.compare(smallest_node, parent)
      ? (parent.left = smallest_node)
      : (parent.right = smallest_node);

    if (smallest_parent !== node) smallest_node.right = node.right;
  }

  remove_leaf(node, parent) {
    this.compare(node, parent) ? (parent.left = null) : (parent.right = null);
  }

  swap_with_leaf(node, parent) {
    const child = node.left || node.right;
    this.compare(node, parent) ? (parent.left = child) : (parent.right = child);
  }

  contains(value, current = this.root) {
    return search_helper(value, current, {
      return_node: false,
      comparator: this.compare
    });
  }

  find(value, current = this.root) {
    return search_helper(value, current, {
      return_node: true,
      comparator: this.compare
    });
  }

  get_parents(value, current = this.root, parents = []) {
    if (!this.contains(value)) return [];
    if (!current || value === current.data) return parents;

    const less_than_current = this.compare({ data: value }, current);
    if (less_than_current)
      return this.get_parents(value, current.left, [...parents, current]);
    else return this.get_parents(value, current.right, [...parents, current]);
  }
}

function recursive_insert(node, current, options) {
  const less_than_current = options.comparator(node, current);

  if (less_than_current) {
    if (current.left) recursive_insert(node, current.left, options);
    else current.left = node;
  } else {
    if (current.right) recursive_insert(node, current.right, options);
    else current.right = node;
  }
}

function search_helper(value, current, options) {
  const { return_node = false, comparator } = options;

  if (!current) return return_node ? null : false;
  if (value === current.data) return return_node ? current : true;

  const less_than_current = comparator({ data: value }, current);
  if (less_than_current) return search_helper(value, current.left, options);
  else return search_helper(value, current.right, options);
}

function left_most_node(node) {
  if (!node.left) return node;

  let current = node.left;
  while (current.left) current = current.left;

  return current;
}
