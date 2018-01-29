import Node from "../src/Node";

test("Node instantiates a Node object", () => {
  expect(new Node({ data: 1 }) instanceof Node).toBe(true);
});

test("Constructor sets the correct value", () => {
  const node_one = new Node({ data: 1 });
  expect(node_one.data).toBe(1);
});

test("Constructor inserts left correctly", () => {
  const node_one = new Node({ data: 1 });
  const root_node = new Node({ data: 2, left: node_one });

  const left_node = root_node.left;
  expect(left_node).toBe(node_one);
});

test("Constructor inserts right correctly", () => {
  const node_one = new Node({ data: 1 });
  const root_node = new Node({ data: 2, right: node_one });

  const right_node = root_node.right;
  expect(right_node).toBe(node_one);
});

test("Returns correct node when deeply nested", () => {
  const four = new Node({ data: 4 });
  const two = new Node({ data: 2, right: four });
  const root_node = new Node({ data: 6, left: two });

  const result = root_node.left.right;
  expect(result).toBe(four);
});

test("Returns correct value when deeply nested", () => {
  const four = new Node({ data: 4 });
  const two = new Node({ data: 2, right: four });
  const root_node = new Node({ data: 6, left: two });

  const result = root_node.left.right;
  expect(result.data).toBe(4);
});

test("Returns null for a leaf", () => {
  const two = new Node({ data: 2 });
  const root_node = new Node({ data: 6, left: two });

  const result = root_node.right;
  expect(result).toBe(null);
});
