class Tree {
  constructor(args) {
    const { root = null, comparator = false } = args || {};
    this.root = root;
    this.compare = comparator || ((first, second) => first.data < second.data);
  }

  insert(node) {
    if (this.root === null) this.root = node;
    else this.recursive_insert(node, this.root);
  }

  recursive_insert(node, current) {
    const less_than_current = this.compare(node, current);

    if (less_than_current) {
      if (current.left) this.recursive_insert(node, current.left);
      else current.left = node;
    } else {
      if (current.right) this.recursive_insert(node, current.right);
      else current.right = node;
    }
  }

  contains(value, current = this.root) {
    if (!current) return false;
    if (value === current.data) return true;

    const less_than_current = this.compare({ data: value }, current);
    if (less_than_current) return this.contains(value, current.left);
    else return this.contains(value, current.right);
  }

  find(value, current = this.root) {
    if (!current) return null;
    if (value === current.data) return current;

    const less_than_current = this.compare({ data: value }, current);
    if (less_than_current) return this.find(value, current.left);
    else return this.find(value, current.right);
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
export default Tree;
