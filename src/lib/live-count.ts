import { useEffect, useState } from "react";

type Channel = "clients" | "lawyers";

const ranges: Record<Channel, [number, number]> = {
  clients: [164, 238],
  lawyers: [52, 96],
};

function seed(min: number, max: number) {
  const hour = new Date().getHours();
  const busy = hour >= 9 && hour <= 21;
  return Math.round((min + max) / 2 + (busy ? 10 : -8));
}

const state: Record<Channel, number> = {
  clients: seed(...ranges.clients),
  lawyers: seed(...ranges.lawyers),
};

const listeners = new Set<() => void>();

function notify() {
  for (const fn of listeners) fn();
}

function walk(n: number, min: number, max: number) {
  const step = Math.floor(Math.random() * 5) - 2;
  return Math.min(max, Math.max(min, n + (step === 0 ? 1 : step)));
}

let started = false;

function start() {
  if (started || typeof window === "undefined") return;
  started = true;
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

  const loop = (channel: Channel, wait: number) => {
    window.setTimeout(() => {
      const [min, max] = ranges[channel];
      state[channel] = walk(state[channel], min, max);
      notify();
      loop(channel, 2600 + Math.random() * 3200);
    }, wait);
  };

  loop("clients", 1400);
  loop("lawyers", 2200);
}

export function useLiveCount(channel: Channel) {
  const [count, setCount] = useState(state[channel]);

  useEffect(() => {
    start();
    const onChange = () => setCount(state[channel]);
    listeners.add(onChange);
    onChange();
    return () => {
      listeners.delete(onChange);
    };
  }, [channel]);

  return count;
}
