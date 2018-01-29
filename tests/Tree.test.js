import Tree from "../src/Tree";
import Node from "../src/Node";

test("Tree instantiates a Tree object", () => {
  expect(new Tree() instanceof Tree).toBe(true);
});

test("Default constructor sets a null root", () => {
  const tree = new Tree();
  expect(tree.root).toBe(null);
});

test("Constructor sets the correct root", () => {
  const node = new Node({ data: 1 });

  const tree = new Tree({ root: node });
  expect(tree.root).toBe(node);
});

test("Inserts to root correctly", () => {
  const node = new Node({ data: 1 });

  const tree = new Tree();
  tree.insert(node);
  expect(tree.root).toBe(node);
});

const initial_tree = comparator => {
  const tree = comparator ? new Tree({ comparator }) : new Tree();
  tree.insert(new Node({ data: 6 }));
  tree.insert(new Node({ data: 2 }));
  tree.insert(new Node({ data: 4 }));
  tree.insert(new Node({ data: 8 }));

  return tree;
};

test("Inserts correctly with default comparator", () => {
  const tree = initial_tree();

  const ten = new Node({ data: 10 });
  tree.insert(ten);

  const found_ten = tree.root.right.right;
  expect(found_ten).toBe(ten);
});

test("Inserts correctly with modified comparator", () => {
  const tree = initial_tree((first, second) => first.data > second.data);

  const ten = new Node({ data: 10 });
  tree.insert(ten);

  const found_ten = tree.root.left.left;
  expect(found_ten).toBe(ten);
});

test("Contains returns true if the node is in the tree", () => {
  const tree = initial_tree();
  tree.insert(new Node({ data: 10 }));

  expect(tree.contains(10)).toBe(true);
});

test("Contains returns false if the node is not in the tree", () => {
  const tree = initial_tree();
  expect(tree.contains(10)).toBe(false);
});

test("Find returns the node it is in the tree", () => {
  const tree = initial_tree();
  const ten = new Node({ data: 10 });
  tree.insert(ten);

  expect(tree.find(10)).toBe(ten);
});

test("Find returns null if the node is not in the tree", () => {
  const tree = initial_tree();

  expect(tree.find(10)).toBe(null);
});

test("Get Parents returns a list of the nodes parents", () => {
  const tree = initial_tree();
  const ten = new Node({ data: 10 });
  tree.insert(ten);

  const parents = tree.get_parents(10);
  expect(parents).toHaveLength(2);

  const [six, eight] = parents;
  expect(six.data).toBe(6);
  expect(eight.data).toBe(8);
});

test("Get Parents returns a empty list when the node is not in the tree", () => {
  const tree = initial_tree();

  expect(tree.get_parents(10)).toEqual([]);
});
