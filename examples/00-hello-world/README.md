# Example: Hello World server

If you would like to run the simple Hello World server example:

```sh
# Let's try running the server like this. Note we did not give Deno network access.
$ deno run server.ts
...
error: Uncaught PermissionDenied: network access to "0.0.0.0:8000", run again with the --allow-net flag

# BONUS: To see a full list of permissions with examples
$ deno run -h

# Let's run our Deno server with the --allow-net permission
$ deno run --allow-net server.ts
🦕 server is now online at http://localhost:8000/

# View the example at http://localhost:8000/
Request #1: GET /
^C
```
