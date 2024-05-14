import React, { useRef } from 'react';

type RefMap = Map<number, HTMLElement>;

const useListRefs = <T,>() => {
  const refs = useRef<RefMap>();

  function getItemsRefMap(itemsRef: React.MutableRefObject<RefMap | undefined>) {
    if (!itemsRef.current) {
      // Initialize the Map on first usage.
      itemsRef.current = new Map();
    }

    return itemsRef.current;
  }

  function getRef(node: HTMLElement | null, value: number) {
    const map = getItemsRefMap(refs);

    if (node) {
      map.set(value, node);
    } else {
      map.delete(value);
    }
  }

  return {
    getRef,
  };
};

export default useListRefs;
