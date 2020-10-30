import 'reflect-metadata'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { createConnection } from 'typeorm'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { resolvers } from './entities/resolvers'
import { Community, Post, User, Comment, CommunityUser } from './entities'

const initialize = async () => {
	await createConnection({
		type: 'postgres',
		host: 'localhost',
		port: 5432,
		username: 'postgres',
		password: '',
		database: 'reddit-clone',
		synchronize: true,
		logging: false,
		entities: [Community, Post, User, Comment, CommunityUser]
	})

	const app = express()

	app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
	app.use(cookieParser())

	const schema = await buildSchema({ resolvers })

	const apolloServer = new ApolloServer({
		schema,
		context: ({ req, res }) => ({ req, res })
	})

	apolloServer.applyMiddleware({ app, cors: false })

	app.listen(4000, () => {
		console.log('Listening on http://localhost:4000/graphql')
	})
}

initialize().catch(error => console.log(error))
