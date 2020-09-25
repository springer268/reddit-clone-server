import { User, Post, Sub } from '../gql/entities'

const testState = {
	users: [
		{
			username: 'Nick',
			id: '1',
			description: 'I like memes!',
			postIDs: ['1', '2']
		},
		{
			username: 'Michael',
			id: '2',
			description: 'I love memes!',
			postIDs: []
		}
	],
	posts: [
		{
			id: '1',
			author: '1',
			subName: 'me_irl',
			title: 'funny haha',
			upvotes: 0,
			downvotes: 0
		},
		{
			id: '2',
			author: '1',
			subName: 'me_irl',
			title: 'funny LOL',
			upvotes: 0,
			downvotes: 0
		}
	],
	subs: [
		{
			name: 'me_irl',
			followerCount: 4203
		}
	]
} as {
	users: User[]
	posts: Post[]
	subs: Sub[]
}

export class TestDatabaseWrapper {
	public static getUserByID(id: string): Promise<User | null> {
		return new Promise<User | null>(resolve => resolve(testState.users.find(user => user.id === id) ?? null))
	}

	static getUserByUsername(username: string): Promise<User | null> {
		return new Promise<User | null>(resolve =>
			resolve(testState.users.find(user => user.username === username) ?? null)
		)
	}

	static getPostsByUserID(id: string): Promise<Post[]> {
		return new Promise<Post[]>(resolve => resolve(testState.posts.filter(post => post.author === id)))
	}

	static getSubBySubName(subName: string): Promise<Sub> {
		return new Promise<Sub>(resolve => resolve(testState.subs.find(sub => sub.name === subName) as Sub))
	}
}
