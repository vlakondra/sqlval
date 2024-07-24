<script>
    // import { mydb } from "../store";
    export let setqueryfunc;
    export let testdata;
    // let tbls = [];

    // setTimeout(() => {
    //     console.log("db-1", $mydb);
    //     console.log(testdata);
    //     $mydb.exec({
    //         sql: "SELECT name FROM sqlite_master WHERE type = 'table'",
    //         rowMode: "object",
    //         callback: function (value) {
    //             tbls = [...tbls, value.name];
    //         },
    //     });
    //     console.log("tbls", tbls);
    // }, 1150);
</script>

<!-- SELECT name FROM sqlite_master WHERE type = "table" -->

<div>
    <div class="pb-1 bg-[#ffe6e6] font-semibold">
        <div class="ml-2 text-lg">БД Sakila</div>
        <div class="ml-2">Таблицы:</div>
    </div>
    <div class="tablelist">
        {#if testdata.length > 0}
            {#each testdata as item}
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
    }
    .tablelist {
        width: 75%;
        margin: 10px auto;
    }
    .table-link:hover {
        color: #535bf2;
        border-bottom: 1px solid #646cff;
    }
</style>
