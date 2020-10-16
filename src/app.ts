import 'reflect-metadata'
import { ApolloServer } from 'apollo-server'
import { buildSchema } from 'type-graphql'
import { resolvers } from './entities/resolvers'

const initialize = async () => {
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

initialize().catch(error => {
	console.log(error)
})
