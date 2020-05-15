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

## Chapter 07 - Built-in tooling

Let's use `deno info` to inspect dependencies for our example file in chapter 06:

```sh
$ deno info chapter-06/test.ts 
Compile file:///Users/rob/repos/explore-deno/examples/01-deno-manual/chapter-06/test.ts
local: /Users/rob/repos/explore-deno/examples/01-deno-manual/chapter-06/test.ts
type: TypeScript
compiled: /Users/rob/Library/Caches/deno/gen/file/Users/rob/repos/explore-deno/examples/01-deno-manual/chapter-06/test.ts.js
map: /Users/rob/Library/Caches/deno/gen/file/Users/rob/repos/explore-deno/examples/01-deno-manual/chapter-06/test.ts.js.map
deps:
file:///Users/rob/repos/explore-deno/examples/01-deno-manual/chapter-06/test.ts
  ├─┬ https://deno.land/std/testing/asserts.ts
  │ ├── https://deno.land/std/fmt/colors.ts
  │ └── https://deno.land/std/testing/diff.ts
  └── https://deno.land/x/delay/delay.js
```

Also of note is `deno doc` - a documentation generator for your code.

## Chapter 08 - Embedding Deno

> Deno consists of multiple parts, one of which is deno_core. This is a rust crate that can be used to embed a JavaScript runtime into your rust application. Deno is built on top of deno_core.

## Chapter 10 - Examples

### Chapter 10.1 - Unix cat program

In this program each command-line argument is assumed to be a filename, the file is opened, and printed to stdout.

```js
for (let i = 0; i < Deno.args.length; i++) {
  let filename = Deno.args[i];
  let file = await Deno.open(filename);
  await Deno.copy(file, Deno.stdout);
  file.close();
}
```

```sh
$ deno run --allow-read chapter-10/01-unix-cat.ts ./chapter-10/01-unix-cat.ts 
```

The copy() function here actually makes no more than the necessary kernel -> userspace -> kernel copies. That is, the same memory from which data is read from the file, is written to stdout. This illustrates a general design goal for I/O streams in Deno.

### Chapter 10.2 - File server

This one serves a local directory in HTTP.

```sh
# Run the file_server from deno land with appropriate network and file read permissions
$ deno run --allow-net --allow-read https://deno.land/std/http/file_server.ts .
```

### Chapter 10.3 - TCP echo server

This is an example of a simple server which accepts connections on port 8080, and returns to the client anything it sends.

```js
const listener = Deno.listen({ port: 8080 });
console.log("listening on 0.0.0.0:8080");
for await (const conn of listener) {
  Deno.copy(conn, conn);
}
```

```sh
# Start the TCP server in one tab
$ deno run --allow-net https://deno.land/std/examples/echo_server.ts

# To test it, try sending data to it with netcat:
$ nc localhost 8080
```

The copy() function here also does not make unnecessary memory copies. It receives a packet from the kernel and sends back, without further complexity.

### Chapter 10.4 - Creating a subprocess

```sh
# Here a function is assigned to window.onload. This function is called after the main script is loaded. 
# This is the same as onload of the browsers, and it can be used as the main entrypoint.
$ deno run --allow-run chapter-10/04-subprocess_simple.ts
```

```sh
# By default when you use Deno.run() subprocess inherits stdin, stdout and stderr of parent process. If you want to communicate with started subprocess you can use "piped" option.
$ deno run --allow-run chapter-10/04a-subprocess_process-communication.ts
```

### Chapter 10.5 - Inspecting and revoking permissions

This example has been intentionally omitted. It does make use of an unstable set of features in Deno, and for reference you can allow Deno to run those by simply passing in the `--unstable` flag.

### Chapter 10.6 - OS Signals

This program makes use of an unstable Deno feature.

You can use `Deno.signal()` function for handling OS signals:

```js
for await (const _ of Deno.signal(Deno.Signal.SIGINT)) {
  console.log("interrupted!");
}
```

`Deno.signal()` also works as a promise:

```js
await Deno.signal(Deno.Signal.SIGINT);
console.log("interrupted!");
```

If you want to stop watching the signal, you can use `dispose()` method of the signal object:

```js
const sig = Deno.signal(Deno.Signal.SIGINT);
setTimeout(() => {
  sig.dispose();
}, 5000);
for await (const _ of sig) {
  console.log("interrupted");
}
```

The above for-await loop exits after 5 seconds when `sig.dispose()` is called.

### Chapter 10.7 - File system events

To poll for file system events:

```js
const watcher = Deno.watchFs("/");
for await (const event of watcher) {
  console.log(">>>> event", event);
  // { kind: "create", paths: [ "/foo.txt" ] }
}
```

Note that the exact ordering of the events can vary between operating systems. This feature uses different syscalls depending on the platform:
+ Linux: inotify
+ macOS: FSEvents
+ Windows: ReadDirectoryChangesW

### Chapter 10.8 - Checking if file is main

To test if the current script has been executed as the main input to the program check `import.meta.main`:

```js
if (import.meta.main) {
  console.log("main");
}
```
