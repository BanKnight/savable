
const savable = function (data, ctx)
{
    ctx = ctx || {
        should_save: false,
        caches: new WeakMap(),
    }

    return new Proxy(data, {
        set: function (target, key, val)
        {
            if (key == "__should_save")
            {
                ctx.should_save = val
                return true
            }

            ctx.should_save = true
            target[key] = val

            return true
        },
        get: function (target, key)
        {
            if (key == "__should_save")
            {
                return ctx.should_save
            }
            let exist = target[key]
            if (exist instanceof Object)
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
            if (exist)
            {
                ctx.caches.delete(exist)

                ctx.should_save = true
            }
            delete target[key]
            return true
        }
    })
}

module.exports = savable