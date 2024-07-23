<script>
  //SELECT name FROM sqlite_master WHERE type = "table"
  //https://github.com/sql-js/sql.js/tree/master/examples

  //import { test } from "./store";

  import ggg from "./store";
  import TestDdb from "./lib/testdb.svelte";
  // // //console.log($test, "test");

  import { mydb } from "./store";

  let sqlite;
  globalThis.sqlite3InitModule().then(function (sqlite3) {
    console.log("sqlite3:", sqlite3);
    globalThis.sqlite3 = sqlite3;
    sqlite = sqlite3; //??
    ggg();
  });
  //setTimeout(() => console.log($mydb, "mydb"), 1000);

  import CodeMirror from "svelte-codemirror-editor";
  import { sql } from "@codemirror/lang-sql";
  import Testdb from "./lib/testdb.svelte";
  let value = "select * from actor limit 10";

  // let db;
  // let sqlite;
  async function onclick() {
    // console.log(globalThis.sqlite3);
    const capi = globalThis.sqlite3.capi /*C-style API*/,
      oo = globalThis.sqlite3.oo1;

    sqlite = globalThis.sqlite3;

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
    console.log("DB", db);

    let rR = [];
    db.exec({
      sql: "select * from pragma_table_info('actor')",
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

  function onbtn() {
    let rR = [];
    $mydb.exec({
      sql: "select * from pragma_table_info('actor')",
      rowMode: "object",
      resultRows: rR,
    });
    console.log(rR);
  }
  function gd(d) {
    console.log("gd", d);
    //return d;
  }
  $: tt = gd;
  function onnew() {
    let rR = [];
    $mydb.exec({
      //sql: "select * from pragma_table_info('actor')",
      sql: value,
      rowMode: "object",
      resultRows: rR,
    });
    gd(rR);
  }
</script>

<main>
  <div style="border: 1px solid red; width:100%">
    <CodeMirror
      bind:value
      styles={{
        "&": {
          width: "100%",
          minWidth: "100%",
          height: "15rem",
          background: "red",
        },
      }}
      lang={sql()}
    />
  </div>
  <div><Testdb /></div>

  <div>
    <button on:click={onnew}>NEW</button>
  </div>
  <div>
    <button on:click={onclick}>Click</button>
  </div>
  <div>
    <button on:click={oncreate}>create</button>
  </div>
  <div>
    <button on:click={onbtn}>mytest</button>
  </div>
</main>

<style>
  main {
    width: 100%;
  }
  :global(.cm-editor) {
    width: 100%;
  }
</style>
