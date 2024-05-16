import { useRef } from 'react';

type RefMap<T extends HTMLElement> = Map<number, T>;

const useListRefs = <T extends HTMLElement>(): [(node: T, key: number) => void, () => RefMap<T>] => {
  const trackingRefs = useRef<RefMap<T>>(new Map());

  function getRefs() {
    if (!trackingRefs.current) {
      // Initialize the Map on first usage.
      trackingRefs.current = new Map();
    }
    return trackingRefs.current;
  }

  function bindRefs(node: T | null, key: number) {
    if (node) {
      trackingRefs.current.set(key, node);
    } else {
      trackingRefs.current.delete(key);
    }
  }

  return [bindRefs, getRefs];
};

export default useListRefs;
