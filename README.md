# savable
a tool to detect if an object is changed,it can used for smoothly data saving.

# install 
`npm install savable --save`

# how to use
```js
let wrap = savable({ test: 1 }, function ()
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
```
