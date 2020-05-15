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
