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
    if (this.root === null) return null;
    if (current === null) return null;

    if (node.data === current.data) {
      if (current === this.root) this.root = null;
      else {
        const closest_parent = this.get_parents(current.data).pop();

        const left_of_parent = this.compare(current, closest_parent);
        if (left_of_parent) {
          if (!current.left && !current.right) closest_parent.left = null;
          else if (current.left && current.right) {
            const smallest_node = left_most_node(current.right);
            const smallest_parent = this.get_parents(smallest_node.data).pop();
            smallest_node.left = current.left;
            if (smallest_parent.left) smallest_parent.left = null;
            closest_parent.left = smallest_node;
            if (smallest_parent !== current)
              smallest_node.right = current.right;
          } else if (!current.right) {
            closest_parent.left = current.left;
          } else {
            closest_parent.left = current.right;
          }
        } else {
          if (!current.left && !current.right) closest_parent.right = null;
          else if (current.left && current.right) {
            const smallest_node = left_most_node(current.right);
            const smallest_parent = this.get_parents(smallest_node.data).pop();
            smallest_node.left = current.left;
            if (smallest_parent.left) smallest_parent.left = null;
            closest_parent.right = smallest_node;
            if (smallest_parent !== current)
              smallest_node.right = current.right;
          } else if (!current.right) {
            closest_parent.right = current.left;
          } else {
            closest_parent.right = current.right;
          }
        }
      }
      return current;
    }

    const less_than_current = this.compare(node, current);
    if (less_than_current) return this.remove(node, current.left);
    else return this.remove(node, current.right);
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
