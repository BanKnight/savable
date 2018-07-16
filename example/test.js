const savable = require("../index")

let wrap = savable({ test: 1 })

wrap.test = 2
wrap.obj = {}

console.dir(wrap)
console.log(wrap.__should_save)

wrap.__should_save = false

console.log(wrap.__should_save)

wrap.obj.ceshi = "what"
console.log(wrap.__should_save)

wrap.__should_save = false

console.log(wrap.__should_save)

delete wrap.obj

console.dir(wrap)
console.log(wrap.__should_save)