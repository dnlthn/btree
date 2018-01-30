import ParentFinder from "./ParentFinder";
import Tree from "./Tree";
import Node from "./Node";

let binary_tree = default_tree();

const reset_button = document.getElementById("reset-tree");
reset_button.addEventListener("click", () => {
  binary_tree = default_tree();
});

const clear_button = document.getElementById("clear-tree");
clear_button.addEventListener("click", () => {
  binary_tree = clear_tree();
});

const insert_button = document.getElementById("insert_node");
insert_button.addEventListener("click", () => {
  const insert_div = document.getElementById("insert_value");
  if (insert_div.value) {
    const value = parseInt(insert_div.value, 10);
    binary_tree.insert(new Node({ data: value }));
    build_tree(binary_tree);
    insert_div.value = "";
  }
});

const remove_button = document.getElementById("remove_node");
remove_button.addEventListener("click", () => {
  const remove_div = document.getElementById("remove_value");
  if (remove_div.value) {
    const value = parseInt(remove_div.value, 10);
    binary_tree.remove(new Node({ data: value }));
    build_tree(binary_tree);
    remove_div.value = "";
  }
});

const parent_button = document.getElementById("parent_button");
parent_button.addEventListener("click", () => {
  const node_one_div = document.getElementById("first_value");
  const node_two_div = document.getElementById("second_value");
  if (node_one_div.value && node_two_div) {
    const value_one = parseInt(node_one_div.value, 10);
    const value_two = parseInt(node_two_div.value, 10);
    const parent = ParentFinder(
      binary_tree,
      new Node({ data: value_one }),
      new Node({ data: value_two })
    );

    build_tree(binary_tree, {
      parent: parent ? parent.data : parent,
      child_one: value_one,
      child_two: value_two
    });
    node_one_div.value = "";
    node_two_div.value = "";
  }
});

function default_tree() {
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

  tree.insert(new Node({ data: -2 }));
  tree.insert(new Node({ data: 14 }));

  build_tree(tree);
  return tree;
}

function clear_tree() {
  const tree = new Tree();
  const tree_div = document.getElementById("tree");
  tree_div.innerHTML = `<div class="text-3xl font-thin text-grey-darkest p-8">Insert a node to get started!</div>`;
  return tree;
}

function build_tree(tree, options) {
  const { parent, child_one, child_two } = options || {};

  const tree_div = document.getElementById("tree");
  const list_of_nodes = breadth_first_list(tree);

  let tree_html = "";
  let current_level = 0;
  while (list_of_nodes.length > 0) {
    const possible_nodes = Math.pow(2, current_level);
    const nodes_in_level = list_of_nodes.splice(0, possible_nodes);

    if (nodes_in_level.length < possible_nodes) {
      for (let i = nodes_in_level.length; i < possible_nodes; i++)
        nodes_in_level.push(null);
    }

    const level_html = nodes_in_level.reduce((html, node) => {
      const color =
        node.data !== "leaf"
          ? node.data === parent
            ? "bg-orange"
            : node.data === child_one || node.data === child_two
              ? "bg-green"
              : "bg-purple"
          : "bg-transparent";
      return `${html}<div class='p-4 m-4 text-xl ${color} text-white rounded'>${
        node ? node.data : ""
      }</div>`;
    }, "");
    tree_html = `${tree_html}<div class='flex justify-around p-2'>${level_html}</div>`;
    current_level += 1;
  }
  tree_div.innerHTML = tree_html;
}

function breadth_first_list(tree) {
  if (!tree.root) return [];
  const max_nodes = Math.pow(2, depth_of_tree(tree.root)) - 1;
  const list = [];
  const queue = [tree.root];

  while (list.length < max_nodes) {
    const removed = queue.shift();
    list.push(removed);
    if (removed !== null)
      queue.push(
        removed.left !== null ? removed.left : new Node({ data: "leaf" }),
        removed.right !== null ? removed.right : new Node({ data: "leaf" })
      );
  }
  return list;
}

function depth_of_tree(root) {
  if (!root) return 0;
  const left_depth = depth_of_tree(root.left);
  const right_depth = depth_of_tree(root.right);

  return Math.max(left_depth, right_depth) + 1;
}
