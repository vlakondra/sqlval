import { writable } from 'svelte/store'
export const mydb = writable({})

export default async function () {
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
            capi.SQLITE_DESERIALIZE_FREEONCLOSE | capi.SQLITE_DESERIALIZE_RESIZEABLE,
            // Optionally:
            // | capi.SQLITE_DESERIALIZE_RESIZEABLE
        );

        mydb.set(await db)
    }

    await Iniwasm()
}
