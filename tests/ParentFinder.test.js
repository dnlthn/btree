import Tree from "../src/Tree";
import Node from "../src/Node";
import ParentFinder from "../src/ParentFinder";

test("Find common parents when on same branch from root", () => {
  const tree = new Tree();
  const left_level_two = new Node({ data: 4 });
  const left_level_three = new Node({ data: -2 });

  tree.insert(new Node({ data: 6 }));
  // Left Branch
  tree.insert(new Node({ data: 2 }));
  tree.insert(left_level_two);
  tree.insert(new Node({ data: 0 }));
  tree.insert(left_level_three);

  // Tree
  //     6
  //   2   null
  // 0   4
  //  -2
  const common_parent = ParentFinder(tree, left_level_two, left_level_three);
  expect(common_parent.data).toBe(2);
});

test("Find common parents when on opposite branches from root", () => {
  const tree = new Tree();
  tree.insert(new Node({ data: 6 }));
  // Left Branch
  tree.insert(new Node({ data: 2 }));
  tree.insert(new Node({ data: 4 }));
  tree.insert(new Node({ data: 0 }));
  // Right Branch
  tree.insert(new Node({ data: 10 }));
  tree.insert(new Node({ data: 8 }));
  tree.insert(new Node({ data: 12 }));

  const left_level_three = new Node({ data: -2 });
  const right_level_three = new Node({ data: 14 });
  tree.insert(left_level_three);
  tree.insert(right_level_three);

  // Tree
  //        6
  //   2        10
  // 0   4    8   12
  //  -2            14
  const common_parent = ParentFinder(tree, left_level_three, right_level_three);
  expect(common_parent.data).toBe(6);
});
