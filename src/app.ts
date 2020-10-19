import 'reflect-metadata'
import { createConnection } from 'typeorm'
import { ApolloServer } from 'apollo-server'
import { buildSchema } from 'type-graphql'
import { resolvers } from './entities/resolvers'
import { Community, Post, User } from './entities'

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
		entities: [Community, Post, User]
	})

	const schema = await buildSchema({
		resolvers,
		validate: false
	})

	const apolloServer = new ApolloServer({
		schema,
		cors: true
	})

	apolloServer.listen(process.env.PORT ?? 4000).then(info => console.log(`Started GraphQL server: ${info.url}`))
}

initialize().catch(error => console.log(error))
