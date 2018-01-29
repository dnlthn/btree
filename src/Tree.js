export default class Tree {
  constructor(args) {
    const { root = null, comparator = false } = args || {};
    this.root = root;
    this.compare = comparator || ((first, second) => first.data < second.data);
  }

  insert(node) {
    if (this.root === null) this.root = node;
    else recursive_insert(node, this.root, { comparator: this.compare });
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
    if (!current) return parents.slice(0, parents.length - 1);

    const less_than_current = this.compare({ data: value }, current);
    if (less_than_current)
      return this.get_parents(value, current.left, [...parents, current]);
    else return this.get_parents(value, current.right, [...parents, current]);
  }
}

function recursive_insert(node, current, { comparator }) {
  const less_than_current = comparator(node, current);

  if (less_than_current) {
    if (current.left) recursive_insert(node, current.left, { comparator });
    else current.left = node;
  } else {
    if (current.right) recursive_insert(node, current.right, { comparator });
    else current.right = node;
  }
}

function search_helper(value, current, { return_node = false, comparator }) {
  if (!current) return return_node ? null : false;
  if (value === current.data) return return_node ? current : true;

  const less_than_current = comparator({ data: value }, current);
  if (less_than_current)
    return search_helper(value, current.left, {
      return_node,
      comparator
    });
  else
    return search_helper(value, current.right, {
      return_node,
      comparator
    });
}
