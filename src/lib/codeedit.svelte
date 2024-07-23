<script>
    import { mydb } from "../store";
    import CodeMirror from "svelte-codemirror-editor";
    import { sql } from "@codemirror/lang-sql";

    export let querytext; //= "select * from actor limit 10";
    $: value = querytext;

    export let showresultfunc;

    function onclick() {
        let rR = [];
        $mydb.exec({
            sql: value,
            rowMode: "object",
            resultRows: rR,
        });
        showresultfunc(rR);
    }
</script>

<div style="border: 1px solid red; position:relative; width:100%">
    <CodeMirror
        bind:value
        styles={{
            "&": {
                width: "100%",
                minWidth: "100%",
                height: "15rem",
                // background: "red",
            },
        }}
        lang={sql()}
    />
    <button on:click={onclick} class="runbutton">Выполнить</button>
</div>

<style>
    .runbutton {
        position: absolute;
        bottom: 10px;
        right: 18px;
    }
</style>
