<script>
  //SELECT name FROM sqlite_master WHERE type = "table"
  ////sql: "select * from pragma_table_info('actor') ",
  //https://github.com/sql-js/sql.js/tree/master/examples

  import IniWasm from "./store";

  globalThis.sqlite3InitModule().then(function (sqlite3) {
    globalThis.sqlite3 = sqlite3;
    IniWasm();
  });

  import CodeEditor from "./lib/codeedit.svelte";
  import Testdb from "./lib/testdb.svelte";
  import Tables from "./lib/tables.svelte";

  let result = [];

  function showresult(data) {
    result = data;
  }
  let querytext = "qwe";
  function setquery(tblname) {
    console.log(tblname);
    querytext = `SELECT * FROM ${tblname} LIMIT 50\n--select * from pragma_table_info('${tblname}')`;
  }
</script>

<main>
  <CodeEditor showresultfunc={showresult} {querytext} />

  <div><Testdb queryresult={result} /></div>
  <Tables setqueryfunc={setquery} />
</main>

<style>
  main {
    width: 100%;
  }
  :global(.cm-editor) {
    width: 100%;
    font-size: 1.1em;
  }
</style>
