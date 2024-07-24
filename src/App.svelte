<script>
  import "./app.css";

  //SELECT name FROM sqlite_master WHERE type = "table"
  ////sql: "select * from pragma_table_info('actor') ",
  //https://github.com/sql-js/sql.js/tree/master/examples
  import IniWasm from "./store";
  import { mydb } from "./store";

  globalThis.sqlite3InitModule().then(async function (sqlite3) {
    console.log(new Date());
    globalThis.sqlite3 = sqlite3;
    await IniWasm();
    console.log(new Date());
    console.log("iniwasm", $mydb);
  });

  import CodeEditor from "./lib/codeedit.svelte";
  import Testdb from "./lib/testdb.svelte";
  import Tables from "./lib/tables.svelte";
  let result = [];

  function showresult(data) {
    result = data;
  }

  let querytext = "SELECT * FROM sqlite_master";

  function setquery(tblname) {
    querytext = `SELECT * FROM ${tblname} LIMIT 50\n--select * from pragma_table_info('${tblname}')`;
  }
</script>

<div class="container-opt sm:container sm:mx-auto my-2">
  <div class="caption">SQL-тренажер</div>
  <div class="content">
    <div class="menu">
      <Tables setqueryfunc={setquery}></Tables>
    </div>
    <div class="analisis">
      <div class="editor">
        <CodeEditor showresultfunc={showresult} {querytext}></CodeEditor>
      </div>
      <div class="result">
        <Testdb queryresult={result}></Testdb>
      </div>
    </div>
  </div>
</div>

<style>
  .container-opt {
    display: flex;
    flex-direction: column;
    border: 1px solid silver;
  }
  .caption {
    font-size: 2em;
    text-align: center;
    padding: 10px 0;
    background-color: #f1eeed;
  }

  .content {
    display: flex;
    flex-direction: row;
    height: 100%;
  }

  .analisis {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .menu {
    width: 150px;
    border: 1px solid silver;
  }
  .result {
    overflow: auto;
    margin-top: 5px;
    min-height: 100px;
  }
</style>
