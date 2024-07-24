<script>
    export let queryresult;
</script>

<div class="result-data">
    {#if queryresult.length > 0}
        <table style="" class="">
            <thead>
                <tr>
                    {#each Object.keys(queryresult[0]) as cn}
                        <th>
                            {cn}
                        </th>
                    {/each}
                </tr>
            </thead>
            <tbody>
                {#each queryresult as item}
                    <tr>
                        {#each Object.keys(queryresult[0]) as cn}
                            <td>
                                {item[cn]}
                            </td>
                        {/each}
                    </tr>
                {/each}
            </tbody>
        </table>
    {:else}
        <div>Результаты выполнения запроса</div>
    {/if}
</div>

<style>
    .result-data {
        max-width: 300px;
        margin: 0 5px;
    }
    table,
    th,
    td {
        border: 1px solid silver;
    }
</style>
