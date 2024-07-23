// // import createSqlWasm from "sql-wasm";
import { writable } from 'svelte/store'
export let mydb = writable({})



export default function () {
    async function gg() {
        console.log("Glob", globalThis.sqlite3)
        mydb.set({ b: 99 })
        // let sqlite
        // globalThis.sqlite3InitModule().then(function (sqlite3) {
        //     // globalThis.sqlite3 = await sqlite3;
        //     // sqlite = await sqlite3
        //     // console.log('GT', sqlite)
        //     mydb.set({ a: sqlite3 })
        // })
        // // const capi = globalThis.sqlite3.capi /*C-style API*/
        // console.log(globalThis.sqlite3)
        const capi = globalThis.sqlite3.capi
        const oo = globalThis.sqlite3.oo1;
        console.log(capi, 'capi')

        const dataPromise = fetch("sakila_master.db").then((res) =>
            res.arrayBuffer(),
        );
        // const buf = await Promise.all([dataPromise]);
        const buf = await Promise.resolve(dataPromise);
        console.log("BBB", buf)



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
        console.log(db)
        mydb.set(db)
    }


    gg()

}


// export const test = readable(999,
//     function start(set) {
//         globalThis.sqlite3InitModule().then(function (sqlite3) {
//             console.log("store-sqlite3:", sqlite3);
//             //globalThis.sqlite3 = sqlite3;
//             //sqlite = sqlite3; //??
//             const capi = sqlite3.capi /*C-style API*/
//             const oo = sqlite3.oo1;
//             console.log("capi-oo:", capi, oo);

//             const dataPromise = fetch("sakila_master.db").then((res) =>
//                 res.arrayBuffer(),
//             );
//             //const buf = Promise.all([dataPromise]);
//             Promise.all([dataPromise]).then((res) => {

//                 const p = sqlite3.wasm.allocFromTypedArray(res[0]);
//                 const db = new oo.DB();
//                 console.log('pdb', p, db)

//                 const rc = capi.sqlite3_deserialize(
//                     db.pointer,
//                     "main",
//                     p,
//                     res[0].byteLength,
//                     res[0].byteLength,
//                     capi.SQLITE_DESERIALIZE_FREEONCLOSE,
//                     // Optionally:
//                     // | sqlite3.capi.SQLITE_DESERIALIZE_RESIZEABLE
//                 );
//                 console.log("RC", rc);

//                 set(db);
//             }
//             )
//             //console.log("BUF", buf);




//         });




//         return function stop() {
//         }
//     })






// // export const wasm = readable(null, function start(set) {
// //     console.log('fromstore', set)

// //     set(
// //         async () => {
// //             const sql = await createSqlWasm({
// //                 //wasmUrl: "node_modules/sql-wasm/dist/sqlite3.wasm"
// //                 wasmUrl: 'sqlite3.wasm'
// //             });
// //             const db = new sql.Database();
// //             return db
// //         })
// //     //)

// //     function stop() {
// //         // teardown code goes here
// //     };
// // });

