"use client";

import { useState } from "react";

export function Newsletter() {
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <p className="text-sm font-extrabold tracking-[0.12em] uppercase">
        You&apos;re on the list.
      </p>
    );
  }

  return (
    <form
      className="mt-4 flex w-full flex-col min-[861px]:mt-0 min-[861px]:w-auto min-[861px]:flex-row min-[861px]:flex-wrap min-[861px]:gap-2"
      onSubmit={(event) => {
        event.preventDefault();
        setDone(true);
      }}
    >
      <label htmlFor="email" className="sr-only">
        Email address
      </label>
      <input
        id="email"
        type="email"
        required
        autoComplete="email"
        placeholder="Your email"
        className="box-border h-[52px] w-full border-2 border-paper bg-transparent px-3.5 text-base text-paper placeholder:text-steel min-[861px]:w-auto min-[861px]:min-w-[260px] min-[861px]:px-4"
      />
      <button
        type="submit"
        className="mt-2 h-[52px] w-full cursor-pointer border-0 bg-accent px-7 text-sm font-extrabold tracking-[0.12em] text-white uppercase min-[861px]:mt-0 min-[861px]:w-auto"
      >
        Subscribe
      </button>
    </form>
  );
}
