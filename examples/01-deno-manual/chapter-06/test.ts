import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

// Let's import the delay function from the https://deno.land/x/delay third-party module
import delay from "https://deno.land/x/delay/delay.js";

Deno.test("hello world", () => {
  const x = 1 + 2;
  assertEquals(x, 3);
});

Deno.test("async hello world", async () => {
  const x = 1 + 2;
  // await some async task
  await delay(100);
  if (x !== 3) {
    throw Error("x should be equal to 3");
  }
});
