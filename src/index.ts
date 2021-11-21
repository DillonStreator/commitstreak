import express from 'express'
import env from './env'
import { getContributions } from './github'
import { newRedisCacher, newInMemoryCacher } from './cacher'
import redis from 'redis'

if (!env.GITHUB_ACCESS_TOKEN) {
    console.log("missing env GITHUB_ACCESS_TOKEN")
    process.exit(1)
}

const init = async () => {
    let cache: Cacher
    if (env.REDIS_HOST && env.REDIS_PORT) {
        const redisClient = redis.createClient({
            host: env.REDIS_HOST,
            port: env.REDIS_PORT,
        })

        cache = newRedisCacher(redisClient)
    } else {
        cache = newInMemoryCacher()
    }

    const app = express()

    app.get("/health", (req, res) => res.sendStatus(200))

    app.get("/api/v1/github-contributions", async (req, res) => {
        const username = req.query.username as string
        if (!username) {
            res.status(400).send({ message: "`username` query param missing" })
        }

        try {
            const cachedContributions = await cache.get(username)
            if (cachedContributions) {
                res.send({ data: JSON.parse(cachedContributions) })
                return
            }

            const contributions = await getContributions(username);

            // don't await this call and prevent error from interfering with request as it's not that important
            cache.set(username, JSON.stringify(contributions)).catch(console.log)

            res.set("Cache-Control", "public max-age=60")
            res.send({ data: contributions })
        } catch (error) {
            console.log(error)
            res.status(500).send({ message: "something went wrong" })
        }
    })

    app.listen(env.PORT, () => console.log(`listening on port ${env.PORT}`))
}

init()