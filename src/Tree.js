class Tree {
  constructor(args) {
    const { root = null, comparator = false } = args || {};
    this.root = root;
    this.compare = comparator || ((first, second) => first.data < second.data);
  }

  insert(node) {
    if (this.root === null) {
      this.root = node;
    } else {
      let current = this.root;
      let previous = null;
      while (current) {
        previous = current;
        const less_than_current = this.compare(node, current);

        if (less_than_current) current = current.left;
        else current = current.right;
      }
      const less_than_current = this.compare(node, previous);

      if (less_than_current) previous.left = node;
      else previous.right = node;
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
