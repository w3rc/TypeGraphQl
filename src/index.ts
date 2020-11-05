import { ApolloServer } from 'apollo-server-express';
import 'reflect-metadata';
import * as express from 'express';
import { buildSchema, Query, Resolver } from 'type-graphql';

@Resolver()
class HelloResolver {
	@Query(() => String)
	async hello() {
		return 'Hello T-Gql!';
	}
}

const main = async () => {
	const schema = await buildSchema({
		resolvers: [HelloResolver],
	});
	const apolloServer = new ApolloServer({ schema });

	const app = express();

	apolloServer.applyMiddleware({ app });

	app.listen(3003, () =>
		console.log('\nAPI URL: http://localhost:3003/graphql')
	);
};

main();
