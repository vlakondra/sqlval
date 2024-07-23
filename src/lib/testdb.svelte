<script>
    import { mydb } from "../store";

    function onclick() {
        let rR = [];
        $mydb.exec({
            sql: "SELECT * FROM actor",
            rowMode: "object",
            resultRows: rR,
        });
        console.log(rR);
    }
</script>

<div>
    <button on:click={onclick}> COMP </button>
</div>
