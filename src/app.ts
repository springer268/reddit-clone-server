import 'reflect-metadata'
import { ApolloServer } from 'apollo-server'
import { buildSchema } from 'type-graphql'
import * as resolvers from './gql/resolvers'

/**
 * Entry point of the Application.
 *
 * Takes in the resolvers and runs the GraphQL server.
 *
 * @param resolvers The resolvers to build the schema with.
 */
const app = async (resolvers: { [k: string]: Function }) => {
	type ResolversType = Parameters<typeof buildSchema>[0]['resolvers']

	const schema = await buildSchema({
		resolvers: Object.values(resolvers) as ResolversType,
		validate: false
	})

	const apolloServer = new ApolloServer({
		schema
	})

	apolloServer.listen(process.env.PORT ?? 5000).then(info => console.log(`Started GraphQL server: ${info.url}`))
}

app(resolvers)
