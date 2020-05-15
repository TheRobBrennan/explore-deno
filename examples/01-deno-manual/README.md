# Deno Manual

This folder contains examples from the official [Deno Manual](https://deno.land/manual)

## Examples

## Chapter 04 - Linking to third party code

```sh
$ deno run chapter-04/test.ts 

# If you're running this for the first time, you'll see something like:
Compile file:///Users/rob/repos/explore-deno/examples/01-deno-manual/chapter-04/test.ts
Download https://deno.land/std/testing/asserts.ts
Warning Implicitly using master branch https://deno.land/std/testing/asserts.ts
Download https://deno.land/std/fmt/colors.ts
Download https://deno.land/std/testing/diff.ts
Warning Implicitly using master branch https://deno.land/std/testing/diff.ts
Warning Implicitly using master branch https://deno.land/std/fmt/colors.ts
Asserted! 🎉
```

> Note that we did not have to provide the `--allow-net` flag for this program, and yet it accessed the network. The runtime has special access to download imports and cache them to disk.

### Additional notes

> Relying on external servers is convenient for development but brittle in production. Production software should always bundle its dependencies. In Deno this is done by checking the $DENO_DIR into your source control system, and specifying that path as the $DENO_DIR environmental variable at runtime.

> What if one of the URLs links to a subtly different version of a library? Isn't it error prone to maintain URLs everywhere in a large project?

> The solution is to import and re-export your external libraries in a central `deps.ts` file (which serves the same purpose as Node's `package.json` file). For example, let's say you were using the above assertion library across a large project. Rather than importing "https://deno.land/std/testing/asserts.ts" everywhere, you could create a `deps.ts` file that exports the third-party code:

```js
// deps.ts
export {
  assert,
  assertEquals,
  assertStrContains,
} from "https://deno.land/std/testing/asserts.ts";
```

```js
import { assertEquals, runTests, test } from "./deps.ts";
```

> This design circumvents a plethora of complexity spawned by package management software, centralized code repositories, and superfluous file formats.

## Chapter 05 - Standard library

> Standard library is not yet stable and therefore it is versioned differently than Deno. For latest release consult [https://deno.land/std/](https://deno.land/std/) or [https://deno.land/std/version.ts](https://deno.land/std/version.ts).

> We strongly suggest to always use imports with pinned version of standard library to avoid unintended changes.

## Chapter 06 - Testing

> Deno has a built-in test runner that you can use for testing JavaScript or TypeScript code.

```sh
$ deno test chapter-06/test.ts

# Example: Successful test run
Compile file:///Users/rob/repos/explore-deno/examples/01-deno-manual/chapter-06/test.ts
running 1 tests
test hello world ... ok (3ms)

test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out (3ms)

# Example: Failed test(s)
Compile file:///Users/rob/repos/explore-deno/examples/01-deno-manual/chapter-06/test.ts
running 1 tests
test hello world ... FAILED (1ms)

failures:

hello world
AssertionError: Values are not equal:


    [Diff] Actual / Expected


-   4
+   3

    at assertEquals (https://deno.land/std/testing/asserts.ts:167:9)
    at file:///Users/rob/repos/explore-deno/examples/01-deno-manual/chapter-06/test.ts:4:3
    at asyncOpSanitizer ($deno$/testing.ts:36:11)
    at Object.resourceSanitizer [as fn] ($deno$/testing.ts:70:11)
    at TestApi.[Symbol.asyncIterator] ($deno$/testing.ts:264:22)
    at TestApi.next (<anonymous>)
    at Object.runTests ($deno$/testing.ts:346:20)

failures:

        hello world

test result: FAILED. 0 passed; 1 failed; 0 ignored; 0 measured; 0 filtered out (1ms)
```

> You can also test asynchronous code by passing a test function that returns a promise. For this you can use the async keyword when defining a function

### Resource and async op sanitizers

> Certain actions in Deno create resources in the resource table (learn more here). These resources should be closed after you are done using them.

> For each test definition the test runner checks that all resources created in this test have been closed. This is to prevent resource 'leaks'. This is enabled by default for all tests, but can be disabled by setting the sanitizeResources boolean to false in the test definition.

> The same is true for async operation like interacting with the filesystem. The test runner checks that each operation you start in the test is completed before the end of the test. This is enabled by default for all tests, but can be disabled by setting the sanitizeOps boolean to false in the test definition.

```js
Deno.test({
  name: "leaky test",
  fn() {
    Deno.open("hello.txt");
  },
  sanitizeResources: false,
  sanitizeOps: false,
});
```

### Ignoring tests

> Sometimes you want to ignore tests based on some sort of condition (for example you only want a test to run on Windows). For this you can use the ignore boolean in the test definition. If it is set to true the test will be skipped.

```js
Deno.test({
  name: "do macOS feature",
  ignore: Deno.build.os !== "darwin",
  fn() {
    doMacOSFeature();
  },
});
```

### Running tests

> To run the test, call `deno test` with the file that contains your test function.

> You can also omit the file name, in which case all tests in the current directory (recursively) that match the glob {*_,}test.{js,ts,jsx,tsx} will be run. If you pass a directory, all files in the directory that match this glob will be run.
