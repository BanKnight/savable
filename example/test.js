const savable = require("../index")

let wrap = savable({ test: 1, players: new Map() }, function ()
{
    console.log("obj changed")
})

wrap.test = 2
wrap.obj = {}

console.dir(wrap)       //{ test: 2, obj: {} }
console.log(wrap.__changed)     //true

wrap.__changed = false

console.log(wrap.__changed) //false

wrap.obj.ceshi = "what"
console.log(wrap.__changed) //true

wrap.__changed = false

console.log(wrap.__changed) //false

delete wrap.obj

console.dir(wrap)           //{ test: 2 }
console.log(wrap.__changed) //true

const players = wrap.players.__data

players.set(123, { name: "test" })

console.dir(wrap)

