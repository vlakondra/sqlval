<script>
  let sqlite;
  globalThis.sqlite3InitModule().then(function (sqlite3) {
    // The module is now loaded and the sqlite3 namespace
    // object was passed to this function.
    console.log("sqlite3:", sqlite3);
    globalThis.sqlite3 = sqlite3;
    sqlite = sqlite3; //??
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

  // })();

  import CodeMirror from "svelte-codemirror-editor";
  // import { sql } from "/home/vkondra/MyDevs/Svelte/sqlval/node_modules/@codemirror/lang-sql";
  import { sql } from "@codemirror/lang-sql";
  let value = "select * from hello";
  console.log(sql);

  let db;
  async function onclick() {
    console.log(globalThis.sqlite3);
    const capi = globalThis.sqlite3.capi /*C-style API*/,
      oo = globalThis.sqlite3.oo1;

    console.log("OO", oo);
    console.log(
      "sqlite3 version",
      capi.sqlite3_libversion(),
      capi.sqlite3_sourceid(),
    );

    const dataPromise = fetch("sakila_master.db").then((res) =>
      res.arrayBuffer(),
    );
    const buf = await Promise.all([dataPromise]);
    console.log("BUF", buf);

    const p = await sqlite.wasm.allocFromTypedArray(buf[0]);
    const db = new oo.DB();

    console.log("PPP", p, db.pointer);

    const rc = capi.sqlite3_deserialize(
      db.pointer,
      "main",
      p,
      buf[0].byteLength,
      buf[0].byteLength,
      capi.SQLITE_DESERIALIZE_FREEONCLOSE,
      // Optionally:
      // | sqlite3.capi.SQLITE_DESERIALIZE_RESIZEABLE
    );
    console.log("RC", rc);
    let res = db.checkRc(rc);
    console.log(res, db);

    let rR = [];
    db.exec({
      sql: "SELECT * FROM actor",
      rowMode: "object",
      resultRows: rR,
    });
    console.log(rR);
    // const sqlPromise = initSqlJs({
    //       locateFile: file => `./${file}`
    //     });

    //https://willschenk.com/howto/2021/sq_lite_in_the_browser/

    //const db = new SQL.Database(new Uint8Array(buf));
    // console.log(buf);
    // db = new oo.DB(new Uint8Array(buf)); //, "ct"); //"/mydb.sqlite3", "ct");

    // console.log("transient db =", db);

    // var stmt = db.prepare("SELECT * FROM actor");
    // console.log(stmt);
    // let rR = [];
    // db.exec({
    //   sql: "SELECT * FROM actor",
    //   rowMode: "object",
    //   resultRows: rR,
    // });

    //let r = db.exec("SELECT name FROM sqlite_schema WHERE type='table'");
    //console.log(rR, "R");
  }

  function oncreate() {
    db.exec("CREATE TABLE IF NOT EXISTS t(a,b)");
    //Equivalent:
    db.exec({
      sql: "CREATE TABLE IF NOT EXISTS t(a,b)",
      // ... numerous other options ...
    });

    console.log("Query data with exec() using rowMode 'stmt'...");
    db.exec({
      sql: "select a from t order by a limit 3",
      rowMode: "stmt",
      callback: function (row) {
        console.log("row ", ++this.counter, "get(0) =", row.get(0));
      }.bind({ counter: 0 }),
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
