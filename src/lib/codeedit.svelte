<script>
    import { mydb } from "../store";
    import CodeMirror from "svelte-codemirror-editor";
    import { sql } from "@codemirror/lang-sql";

    export let querytext;
    $: value = querytext;

    export let showresultfunc;

    function onclick() {
        let rR = [];
        try {
            $mydb.exec({
                sql: value,
                rowMode: "object",
                resultRows: rR,
            });
            showresultfunc(rR);
        } catch (e) {
            showresultfunc([{ error: e.message }]);
            console.log("err", e.message);
        }
    }
</script>

<div style="border: 1px solid red; position:relative; width:100%">
    <CodeMirror
        bind:value
        styles={{
            "&": {
                width: "100%",
                minWidth: "100%",
                height: "10rem",
            },
        }}
        lang={sql()}
    />
    <button on:click={onclick} class="runbutton">Выполнить</button>
</div>

<style>
    :global(.cm-editor) {
        width: 100%;
        font-size: 1.1em;
    }
    .runbutton {
        position: absolute;
        bottom: 10px;
        right: 18px;

        border-radius: 8px;
        border: 1px solid transparent;
        padding: 0.6em 1.2em;
        font-size: 1em;
        font-weight: 500;
        font-family: inherit;
        /* background-color: #1a1a1a; */
        cursor: pointer;
        transition: border-color 0.25s;
    }

    .runbutton:hover {
        border-color: #646cff;
    }
    .runbutton:focus,
    .runbutton:focus-visible {
        outline: 4px auto -webkit-focus-ring-color;
    }
</style>
