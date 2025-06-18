import React, {useState, useEffect, useMemo} from "react";
import { Tree } from "antd";
const { DirectoryTree } = Tree;

function findPathById(tree, id, path = [], keys = [], keyPath = "") {
  if (tree) {
    for (const node of tree) {
      const newPath = [...path, node];
      const newKeys = [
        ...keys,
        keyPath ? `${keyPath}/${node.name}` : node.name,
      ];
      if (node.id === id) {
        return { path: newPath, keys: newKeys };
      }
      if (node.children && node.children.length) {
        const result = findPathById(
          node.children,
          id,
          newPath,
          newKeys,
          keyPath ? `${keyPath}/${node.name}` : node.name
        );
        if (result) return result;
      }
    }
  }
  return null;
}

export function transformTree(data, parentPath = "") {
  return (
    data?.response?.tree?.map((item) => {
      const currentPath = parentPath ? `${parentPath}/${item.name}` : item.name;

      return {
        title: item.full_name,
        key: currentPath,
        id: item?.id,
        path: currentPath,
        children: transformTree(
          { response: { tree: item.children } },
          currentPath
        ),
      };
    }) || []
  );
}

export const FileThree = ({ nodes, selected, onSelect }) => {
  const tree = useMemo(() => transformTree(nodes), [nodes]);
  const [expandedKeys, setExpandedKeys] = useState([]);

  useEffect(() => {
    if (tree.length > 0) {
      const getAllKeys = (nodes) => {
        const keys = [];
        const traverse = (list) => {
          for (const node of list) {
            keys.push(node.key);
            if (node.children?.length) traverse(node.children);
          }
        };
        traverse(nodes);
        return keys;
      };

      setExpandedKeys(getAllKeys(tree));
    }
  }, [tree]);

  useEffect(() => {
    if (selected && nodes?.response?.tree) {
      const res = findPathById(nodes?.response?.tree, selected);
      if (res) {
        setExpandedKeys((prev) =>
            Array.from(new Set([...prev, ...res.keys.slice(0, -1)]))
        );
      }
    }
  }, [selected, nodes]);

  const onSelectFile = (keys, info) => {
    onSelect?.(info.node.id);
  };

  const onExpand = (newKeys) => {
    setExpandedKeys(newKeys);
  };

  const active = findPathById(nodes?.response?.tree, selected);
  const selectedKey = active?.keys?.[active.keys.length - 1] || "";

  return (
    <DirectoryTree
      onSelect={onSelectFile}
      onExpand={onExpand}
      treeData={tree}
      expandedKeys={expandedKeys}
      selectedKeys={selectedKey ? [selectedKey] : []}
    />
  );
};

// export function transformTree(data) {
//   return (
//     data?.response?.tree?.map((item, index) => ({
//       title: item.name,
//       key: `0-${index}`,
//       id: item?.id,
//       children: transformTree({ response: { tree: item.children } }),
//     })) || []
//   );
// }
