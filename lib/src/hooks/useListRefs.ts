import React, { useRef } from 'react';

type RefMap<T extends HTMLElement> = Map<number, T>;

const useListRefs = <T extends HTMLElement,>() => {
  const trackingRefs = useRef<RefMap<T>>();

  function getRefs() {
    if (!trackingRefs.current) {
      // Initialize the Map on first usage.
      trackingRefs.current = new Map();
    }
    return trackingRefs.current;
  }


  function bindRefs(node: T | null, value: number) {
    if (node) {
      trackingRefs.current.set(value, node);
    } else {
      trackingRefs.current.delete(value);
    }
  }

  return [bindRefs, getRefs]
};

export default useListRefs;
