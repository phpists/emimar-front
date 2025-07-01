import React, { useState, useEffect } from "react";
import { Tree } from "antd";
import {useAppSelect} from "../../hooks/redux";
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
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [selectedKey, setSelectedKey] = useState(null);
  const tree = transformTree(nodes);
  const { selectedProject } = useAppSelect((state) => state.auth);
  const selectedId = typeof selected === "object" ? selected?.id : selected;
  const active = findPathById(nodes?.response?.tree, selectedId);
  const currentKey = active?.keys?.[active.keys.length - 1] || "";

  useEffect(() => {
    if (selectedId && active?.keys) {
      setExpandedKeys((prev) => {
        return Array.from(new Set([...prev, ...active.keys.slice(0, -1)]));
      });
      setSelectedKey(currentKey);
    }
  }, [selectedId]);

  useEffect(() => {
    setSelectedKey(null);
    setExpandedKeys([]);
    setSelectedKey(null);
  }, [selectedProject]);

  const onSelectFile = (keys, info) => {
    const key = info.node?.key;
    const nodeId = info.node?.id;
    if (!nodeId) return;

    const isSelected = selectedKey === key;
    const hasChildren = info.node.children?.length > 0;

    if (isSelected) {
      setSelectedKey(null);
      if (hasChildren) {
        setExpandedKeys(prev => prev.filter(k => !k.startsWith(key)));
      }
      onSelect?.(null);
    } else {
      setSelectedKey(key);
      onSelect?.({ id: nodeId, full_name: info.node.title });
      if (hasChildren && !expandedKeys.includes(key)) {
        setExpandedKeys(prev => [...prev, key]);
      }
    }
  };

  const onExpand = (newKeys) => {
    setExpandedKeys(newKeys);
  };

  return (
      <DirectoryTree
          onSelect={onSelectFile}
          expandAction={false}
          onExpand={onExpand}
          treeData={tree}
          expandedKeys={expandedKeys}
          selectedKeys={selectedKey ? [selectedKey] : []}
          autoExpandParent={false}
      />
  );
};
