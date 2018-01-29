const ParentFinder = (tree, node_one, node_two) => {
  const parents_one = tree.get_parents(node_one.data);
  const parents_two = tree.get_parents(node_two.data);

  const one_has_more_parents = parents_one.length > parents_two.length;
  if (one_has_more_parents) {
    if (
      parents_one[parents_two.length - 1] ===
      parents_two[parents_two.length - 1]
    ) {
      return parents_one[parents_two.length - 1];
    } else {
      return parents_one[0];
    }
  } else {
    if (
      parents_one[parents_one.length - 1] ===
      parents_two[parents_one.length - 1]
    ) {
      return parents_one[parents_one.length - 1];
    } else {
      return parents_one[0];
    }
  }
};

export default ParentFinder;
