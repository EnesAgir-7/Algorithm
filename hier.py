def ungroup(tree):
    flat = []
    _ungroup(tree, [], flat)
    return flat

def _ungroup(tree, keys, flat):
    if isinstance(tree, list):
        for item in tree:
            flat.append(keys + [item])
        return flat
    if isinstance(tree, dict):
        for key in tree:
            subKeys = keys.copy() + [key]
            _ungroup(tree[key], subKeys, flat)

def group(flat):
    tree = {}
    for el in flat:
        subtree = tree
        for i, ll in enumerate(el):
            if i == len(el) - 2:
                if ll not in subtree:
                    subtree[ll] = []
                subtree= subtree[ll]
            elif i == len(el) - 1:
                subtree.append(ll)
            else:
                if ll not in subtree:
                    subtree[ll] = {}
                subtree = subtree[ll]

    return tree