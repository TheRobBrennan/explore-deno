# Welcome

This project is meant to serve as a starting point for exploring [Deno](https://deno.land/)

> Deno is a simple, modern and secure runtime for JavaScript and TypeScript that uses V8 and is built in Rust.

## Installation

To install Deno, please review the official [Installation Guide](https://deno.land/#installation).

If you are on a system with [Homebrew](https://brew.sh) installed, you can run:

```sh
$ brew install deno
```

## Getting started

Once you have installed Deno on your development environment, you can verify it has been installed correctly by running:

```sh
$ deno run https://deno.land/std/examples/welcome.ts
Download https://deno.land/std/examples/welcome.ts
Warning Implicitly using master branch https://deno.land/std/examples/welcome.ts
Compile https://deno.land/std/examples/welcome.ts
Welcome to Deno 🦕
```

### Example: Hello World server

If you would like to run the simple Hello World server example:

```sh
# Let's try running the server like this. Note we did not give Deno network access.
$ deno run examples/hello-world-server.ts
...
error: Uncaught PermissionDenied: network access to "0.0.0.0:8000", run again with the --allow-net flag

# BONUS: To see a full list of permissions with examples
$ deno run -h

# Let's run our Deno server and view the example at http://localhost:8000/
$ deno run --allow-net examples/hello-world-server.ts
Compile file:///Users/rob/repos/explore-deno/examples/hello-world-server.ts
🦕 server is now online at http://localhost:8000/
Request #1: GET /
Request #2: GET /
Request #3: GET /
Request #4: GET /
Request #5: GET /
Request #6: GET /
^C
```

## Resources

[Deno 1.0](https://deno.land/v1) - This is the official announcement and release of Deno v1 on Wednesday, May 13th, 2020.
[Deno 1.0: What you need to know](https://blog.logrocket.com/deno-1-0-what-you-need-to-know/) - This provides a great preview leading up to the May 13th announcement.
[Visual Studio Code Deno extension](https://marketplace.visualstudio.com/items?itemName=justjavac.vscode-deno) - This extension works using VS Code's built-in version of TypeScript.
