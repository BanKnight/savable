
const savable = function (data, ctx)
{
    return new Proxy(data, {
        set: function (target, key, val)
        {
            if (key == "__changed")
            {
                ctx.changed = val
                if (val == true)
                {
                    ctx.notice()
                }

                return true
            }
            target[key] = val

            ctx.changed = true
            ctx.notice()

            return true
        },
        get: function (target, key)
        {
            if (key == "__changed")
            {
                return ctx.changed
            }
            else if (key == "__data")
            {
                return target
            }

            let exist = target[key]
            if (typeof (exist) == "object")
            {
                let wrap = ctx.caches.get(exist)
                if (wrap == null)
                {
                    wrap = savable(exist, ctx)
                    ctx.caches.set(exist, wrap)
                }

                exist = wrap
            }

            return exist
        },
        deleteProperty: function (target, key)
        {
            let exist = target[key]
            if (exist == null)
            {
                return false
            }

            ctx.caches.delete(exist)
            delete target[key]

            ctx.changed = true
            ctx.notice()

            return true
        }
    })
}

module.exports = function (data, cb)
{
    let ctx = {
        changed: false,
        caches: new WeakMap(),
        noticing: false
    }

    ctx.notice = function ()
    {
        if (cb == null)
        {
            return
        }
        if (ctx.noticing == true)
        {
            return
        }

        ctx.noticing = true
        setImmediate(() =>
        {
            ctx.noticing = false
            cb()
        })
    }

    return savable(data, ctx)
}
