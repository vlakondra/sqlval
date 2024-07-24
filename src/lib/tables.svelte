<script>
    import { mydb } from "../store";
    export let setqueryfunc;
    let tbls = [];

    setTimeout(() => {
        console.log("db", $mydb);
        $mydb.exec({
            sql: "SELECT name FROM sqlite_master WHERE type = 'table'",
            rowMode: "object",
            callback: function (value) {
                tbls = [...tbls, value.name];
            },
        });
        console.log("tbls", tbls);
    }, 1500);
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

<div style="">
    <div class="pb-1 bg-[#ffe6e6] font-semibold">
        <div class="ml-2 text-lg">БД Sakila</div>
        <div class="ml-2">Таблицы:</div>
    </div>
    <div style="width:75%;margin:10px auto;">
        {#if tbls.length > 0}
            {#each tbls as item}
                <div
                    class="font-semibold table-link"
                    on:click={() => setqueryfunc(item)}
                >
                    {item}
                </div>
            {/each}
        {/if}
    </div>
</div>

<style>
    .table-link {
        cursor: pointer;
        /* font-weight: 500; */
        /* color: #646cff; */
        /* text-decoration: inherit; */
    }
    .table-link:hover {
        color: #535bf2;
        border-bottom: 1px solid #646cff;
    }
</style>
