import { writable } from 'svelte/store'
export let mydb = writable({})

export default function () {
    async function Iniwasm() {
        const capi = globalThis.sqlite3.capi
        const oo = globalThis.sqlite3.oo1;

        const dataPromise = fetch("sakila_master.db").then((res) =>
            res.arrayBuffer(),
        );
        const buf = await Promise.resolve(dataPromise);

        const p = globalThis.sqlite3.wasm.allocFromTypedArray(buf);
        const db = new oo.DB();

        const rc = capi.sqlite3_deserialize(
            db.pointer,
            "main",
            p,
            buf.byteLength,
            buf.byteLength,
            capi.SQLITE_DESERIALIZE_FREEONCLOSE,
            // Optionally:
            // | sqlite3.capi.SQLITE_DESERIALIZE_RESIZEABLE
        );
        mydb.set(await db)
    }

    Iniwasm()
}
