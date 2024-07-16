<script>
  import createSqlWasm from "sql-wasm";

  (async () => {
    const sql = await createSqlWasm({
      wasmUrl: "node_modules/sql-wasm/dist/sqlite3.wasm",
    });
    // From here on, the SQL.js API can be used...
    const db = new sql.Database();
    console.log(db);

    // var db = new sql.Database();
    // NOTE: You can also use new sql.Database(data) where
    // data is an Uint8Array representing an SQLite database file

    // Execute some sql
    let sqlstr = "CREATE TABLE hello (a int, b char);";
    sqlstr += "INSERT INTO hello VALUES (0, 'hello');";
    sqlstr += "INSERT INTO hello VALUES (1, 'world');";
    db.run(sqlstr); // Run the query without returning anything

    var res = db.exec("SELECT * FROM hello");
    console.log(res);
  })();

  import CodeMirror from "svelte-codemirror-editor";
  import { sql } from "/home/vkondra/MyDevs/Svelte/sqlval/node_modules/@codemirror/lang-sql";

  let value = "select * from table";
  console.log(sql);
  let rs = sql();
  console.log("rs", rs);
  // import svelteLogo from "./assets/svelte.svg";
  // import viteLogo from "/vite.svg";
  // import Counter from "./lib/Counter.svelte";
</script>

<main>
  <div style="border: 1px solid red">
    <CodeMirror bind:value lang={sql()} />
  </div>
</main>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }
</style>
