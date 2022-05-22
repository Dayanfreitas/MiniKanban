const router = function (r) {
    let routes = r
    const middleware = {}

    const setLastRoute = (path) => {
        const lastRoute = middleware.data.getLastRouter();
        if (lastRoute != path) {
            middleware.data.setLastRouter(path)
        }
    }

    const go = (path) => {
        for (const e of routes) {
                e.then((route)=> {
                    if (path != route.path){return;}


                    setLastRoute(path)
                    middleware.root.innerHTML = route.template
                })
        }
    }

    const back = () => {
        console.log('router back')
        console.log(middleware.data.getLastRouter())

    }

    const use = (name, obj) => {
        middleware[name] = obj;
    }

    const initialize = async () => {
        routes = routes.map(async (e) => {
            e.template = await ReadFile.read(e.template_path);
            return e
        })
    }

    initialize()

    return {
        routes,
        go,
        back,
        use
    }

}(
    [
        { path: '/login', template_path: '/views/users/login.html'},
        { path: '/dashboard', template_path: '/views/dashboard.html'},
    ]
)
