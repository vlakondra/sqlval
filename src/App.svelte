<script>
  import "./app.css";

  //https://github.com/sql-js/sql.js/tree/master/examples
  import IniWasm from "./store";
  import { mydb } from "./store";

  let testarr = [];

  async function start() {
    await globalThis.sqlite3InitModule().then(async function (sqlite3) {
      globalThis.sqlite3 = sqlite3;

      await IniWasm();

      $mydb.exec({
        sql: "SELECT name FROM sqlite_master WHERE type = 'table'",
        rowMode: "object",
        callback: function (value) {
          testarr = [...testarr, value.name];
        },
      });
    });
  }

  import CodeEditor from "./lib/codeedit.svelte";
  import Results from "./lib/results.svelte";
  import Tables from "./lib/tables.svelte";

  start();

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
      <Tables testdata={testarr} setqueryfunc={setquery}></Tables>
    </div>
    <div class="analisis">
      <div class="editor">
        <CodeEditor showresultfunc={showresult} {querytext}></CodeEditor>
      </div>
      <div class="result">
        <Results queryresult={result} />
      </div>
    </div>
  </div>
</div>

<style>
  .container-opt {
    display: flex;
    flex-direction: column;
    border: 1px solid rgb(212, 209, 209);
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
