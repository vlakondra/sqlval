<script>
    import { mydb } from "../store";
    export let setqueryfunc;
    let tbls = [];
    console.log($mydb, "mydb");
    // let db;

    // mydb.subscribe((value) => {
    //     db = value;
    // });

    //const promise1 = Promise.resolve(mydb);

    // promise1.then((value) => {
    //     console.log(value);
    setTimeout(() => {
        console.log("db", $mydb);
        $mydb.exec({
            sql: "SELECT name FROM sqlite_master WHERE type = 'table'",
            rowMode: "object",
            callback: function (value) {
                console.log(value);
                //tbls.push(value.name);
                tbls = [...tbls, value.name];
            },
        });
        console.log("tbls", tbls);
    }, 800);
    // });

    //setTimeout(() => console.log($mydb), 500);

    // onMount(() => {
    //     console.log($mydb);
    //     $mydb.exec({
    //         sql: 'SELECT name FROM sqlite_master WHERE type = "table"',
    //         rowMode: "object",
    //         resultRows: tbls,
    //     });
    //     console.log("tbls", tbls);
    // });
</script>

<!-- SELECT name FROM sqlite_master WHERE type = "table" -->

<div>
    qq {tbls.length}
    {#if tbls.length > 0}
        {#each tbls as item}
            <div on:click={() => setqueryfunc(item)}>
                {item}
            </div>
        {/each}
    {/if}
</div>
