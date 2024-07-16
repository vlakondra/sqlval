import createSqlWasm from "sql-wasm";
import { readable } from 'svelte/store';




export const wasm = readable(null, function start(set) {
    console.log('fromstore', set)

    set(
        async () => {
            const sql = await createSqlWasm({
                wasmUrl: "node_modules/sql-wasm/dist/sqlite3.wasm"
            });
            const db = new sql.Database();
            return db
        })
    //)

    function stop() {
        // teardown code goes here
    };
});