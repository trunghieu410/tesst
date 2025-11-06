import { useCallback, useEffect, useRef } from "react";

// Enhanced publish function with better typing
export function useEventEmitter() {
  const publish = useCallback(<T = any>(eventName: string, data?: T) => {
    const event = new CustomEvent(eventName, {
      detail: data,
      bubbles: false, // Prevent event bubbling by default
      cancelable: true,
    });
    document.dispatchEvent(event);
  }, []);

  return { publish };
}

// Hook for subscribing to events
export function useEventListener<T = any>(
  eventName: string,
  handler: (data: T) => void,
  options?: {
    once?: boolean;
    capture?: boolean;
    passive?: boolean;
  }
) {
  const savedHandler = useRef(handler);

  // Update ref to latest handler on each render
  useEffect(() => {
    savedHandler.current = handler;
  });

  useEffect(() => {
    const listener = (event: CustomEvent<T>) => {
      savedHandler.current(event.detail);
    };

    const eventOptions = {
      once: options?.once || false,
      capture: options?.capture || false,
      passive: options?.passive || false,
    };

    document.addEventListener(
      eventName,
      listener as EventListener,
      eventOptions
    );

    return () => {
      document.removeEventListener(
        eventName,
        listener as EventListener,
        eventOptions
      );
    };
  }, [eventName, options?.once, options?.capture, options?.passive]);
}

// Hook for one-time event listening
export function useEventOnce<T = any>(
  eventName: string,
  handler: (data: T) => void
) {
  return useEventListener(eventName, handler, { once: true });
}
