<script>
    export let queryresult;
</script>

<div>
    {#if queryresult.length > 0}
        <table>
            <tbody>
                <tr>
                    {#each Object.keys(queryresult[0]) as cn}
                        <th>
                            {cn}
                        </th>
                    {/each}
                </tr>
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
    {/if}
</div>
