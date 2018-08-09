class Property
{
    constructor()
    {
    }

    to(data)
    {
        new Error("you should imple this")
    }
    from(data)
    {
        new Error("you should imple this")
    }
}
class Account extends Property
{
    constructor()
    {
        super()

        this.name = ""
        this.lvl = 0
        this.is_new = true      //是否新手
        this.regist = 0         //注册时间

        this.this_login = 0     //本次登录时间
        this.last_logout = 0    //上次登出时间
        this.login_times = 0    //登录次数

        this.last_refresh = 0   //上次刷新的时间
        this.last_total_time = 0//上次玩的总的游戏时间，即是说本次登录没有加上去
    }

    to(data)
    {
        data.name = this.name
        data.lvl = this.lvl
        data.is_new = this.is_new
        data.regist = this.regist         //注册时间

        data.this_login = this.this_login     //本次登录时间
        data.last_logout = this.last_logout    //上次登出时间
        data.login_times = this.login_times    //登录次数

        data.last_refresh = this.last_refresh   //上次刷新的时间
        data.total_time = this.total_time     //到目前为止的游戏时间

        console.log(`account to`)
        console.dir(this)
        console.dir(data)
    }

    from(data)
    {
        this.name = data.name
        this.lvl = data.lvl
        this.is_new = data.is_new
        this.regist = data.regist         //注册时间

        this.this_login = data.this_login     //本次登录时间
        this.last_logout = data.last_logout    //上次登出时间
        this.login_times = data.login_times    //登录次数

        this.last_refresh = data.last_refresh   //上次刷新的时间
        this.total_time = data.total_time     //到目前为止的游戏时间
    }
}
const savable = require("../index")

let account = new Account()
let prop = savable(account)

let from = {
    name: "1234"
}

prop.from(from)

console.dir(account)
console.dir(prop)

prop.name = "土匪"

let to = {}

prop.to(to)

console.dir(to)
console.log(prop.__changed)     //true
