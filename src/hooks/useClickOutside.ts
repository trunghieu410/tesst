import { useEffect, useRef } from "react";

interface UseClickOutsideOptions {
  enabled?: boolean;
  events?: Array<keyof DocumentEventMap>;
  /** Additional elements that should be treated as inside (won't trigger handler) */
  ignore?: Array<React.RefObject<HTMLElement | null>>;
}

/**
 * useClickOutside
 * Detects interactions occurring outside of the given element and invokes the provided handler.
 */
export function useClickOutside<T extends HTMLElement>(
  handler: () => void,
  options: UseClickOutsideOptions = {}
) {
  const { enabled = true, events = ["mousedown", "touchstart"], ignore = [] } =
    options;

  const targetRef = useRef<T | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const isEventInsideIgnored = (eventTarget: Node) => {
      for (const ref of ignore) {
        if (ref?.current && ref.current.contains(eventTarget)) return true;
      }
      return false;
    };

    const onEvent = (event: Event) => {
      const node = targetRef.current;
      const eventTarget = event.target as Node;
      if (!node) return;
      if (node.contains(eventTarget)) return;
      if (isEventInsideIgnored(eventTarget)) return;
      handler();
    };

    for (const eventName of events) {
      document.addEventListener(eventName, onEvent);
    }

    return () => {
      for (const eventName of events) {
        document.removeEventListener(eventName, onEvent);
      }
    };
  }, [enabled, events, ignore, handler]);

  return targetRef;
}

export default useClickOutside;


