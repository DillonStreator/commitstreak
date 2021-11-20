import express from 'express'
import env from './env'
import { getContributions } from './github'

if (!env.GITHUB_ACCESS_TOKEN) {
    console.log("missing env GITHUB_ACCESS_TOKEN")
    process.exit(1)
}

const app = express()

app.get("/health", (req, res) => res.sendStatus(200))

app.get("/api/v1/github-contributions", async (req, res) => {
    const { username } = req.query
    if (!username) {
        res.status(400).send({ message: "`username` query param missing" })
    }

    try {
        const contributions = await getContributions(username as string);

        res.send({ data: contributions })
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "something went wrong" })
    }
})

app.listen(env.PORT, () => console.log(`listening on port ${env.PORT}`))
