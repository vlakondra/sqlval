<script>
  let sqlite;
  globalThis.sqlite3InitModule().then(function (sqlite3) {
    // The module is now loaded and the sqlite3 namespace
    // object was passed to this function.
    console.log("sqlite3:", sqlite3);
    globalThis.sqlite3 = sqlite3;
    //sqlite = sqlite3;
  });
  console.log("SQL", sqlite);
  //import { wasm } from "./store.js";
  // import createSqlWasm from "sql-wasm";
  // let dbb = null;
  // (async () => {
  //   const sql = await createSqlWasm({
  //     wasmUrl: "node_modules/sql-wasm/dist/sqlite3.wasm",
  //   });
  //   // From here on, the SQL.js API can be used...
  //   const db = new sql.Database();
  //   console.log(db);

  //   // var db = new sql.Database();
  //   // NOTE: You can also use new sql.Database(data) where
  //   // data is an Uint8Array representing an SQLite database file

  //   // Execute some sql
  //   let sqlstr = "CREATE TABLE hello (a int, b char);";
  //   sqlstr += "INSERT INTO hello VALUES (0, 'hello');";
  //   sqlstr += "INSERT INTO hello VALUES (1, 'world');";
  //   db.run(sqlstr); // Run the query without returning anything

  //   var res = db.exec("SELECT * FROM hello");
  //   console.log(res);
  //   dbb = db;
  // })();

  import CodeMirror from "svelte-codemirror-editor";
  // import { sql } from "/home/vkondra/MyDevs/Svelte/sqlval/node_modules/@codemirror/lang-sql";
  import { sql } from "@codemirror/lang-sql";
  //node_modules/@codemirror/lang-sql
  ///home/vkondra/MyDevs/Svelte/sqlval/node_modules/@codemirror/lang-sql
  let value = "select * from hello";
  console.log(sql);
  // let rs = sql();
  // console.log("rs", rs);

  // console.log("wasm", $wasm);
  // let db = null;
  // $wasm().then((v) => {
  //   console.log(v);
  //   let sqlstr = "CREATE TABLE hello (a int, b text);";
  //   sqlstr += "INSERT INTO hello VALUES (0, 'hello');";
  //   sqlstr += "INSERT INTO hello VALUES (1, 'world');";
  //   v.run(sqlstr);
  //   db = v;

  //   var res = v.exec(value);
  //   console.log(res);
  // });
  // console.log(db, "DB");
  let db;
  function onclick() {
    //var res = dbb.exec(value);
    //console.log(res);
    console.log(globalThis.sqlite3);
    const capi = globalThis.sqlite3.capi /*C-style API*/,
      oo = globalThis.sqlite3.oo1; /*high-level OO API*/
    console.log(
      "sqlite3 version",
      capi.sqlite3_libversion(),
      capi.sqlite3_sourceid(),
    );
    db = new oo.DB("/mydb.sqlite3", "ct");
    console.log("transient db =", db.filename);
  }

  function oncreate() {
    db.exec("CREATE TABLE IF NOT EXISTS t(a,b)");
    //Equivalent:
    db.exec({
      sql: "CREATE TABLE IF NOT EXISTS t(a,b)",
      // ... numerous other options ...
    });
  }
</script>

<main>
  <div style="border: 1px solid red">
    <CodeMirror bind:value lang={sql()} />
  </div>
  <div>
    <button on:click={onclick}>Click</button>
  </div>
  <div>
    <button on:click={oncreate}>create</button>
  </div>
</main>

<style>
</style>
