const ParentFinder = (tree, node_one, node_two) => {
  const parents_one = tree.get_parents(node_one.data);
  const parents_two = tree.get_parents(node_two.data);

  const min_parents = Math.min(parents_one.length, parents_two.length) - 1;
  if (min_parents < 0) return;

  if (parents_one[min_parents] === parents_two[min_parents])
    return parents_one[min_parents];
  else return parents_one[0];
};

export default ParentFinder;
