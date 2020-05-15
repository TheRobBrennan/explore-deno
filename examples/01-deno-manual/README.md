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
