import { User, Post, Sub } from '../../gql/entities'
import { DBInterface } from '../DBInterface'

export class TestDatabaseWrapper implements DBInterface {
	private testState = {
		users: [
			{
				username: 'Nick',
				password: 'pass',
				id: '1',
				description: 'I like memes!',
				postIDs: ['1', '2']
			},
			{
				username: 'Michael',
				password: 'pass',
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

	getUserByID(id: string): Promise<User | null> {
		return new Promise<User | null>(resolve => resolve(this.testState.users.find(user => user.id === id) ?? null))
	}

	getUserByUsername(username: string): Promise<User | null> {
		return new Promise<User | null>(resolve =>
			resolve(this.testState.users.find(user => user.username === username) ?? null)
		)
	}

	getPostsByUserID(id: string): Promise<Post[]> {
		return new Promise<Post[]>(resolve => resolve(this.testState.posts.filter(post => post.author === id)))
	}

	getSubBySubName(subName: string): Promise<Sub> {
		return new Promise<Sub>(resolve => resolve(this.testState.subs.find(sub => sub.name === subName) as Sub))
	}

	addUserFromScratch(user: User): Promise<boolean> {
		if (this.testState.users.find(u => u.username === user.username)) {
			return new Promise<boolean>(resolve => resolve(false))
		}

		this.testState.users.push(user)
		return new Promise<boolean>(resolve => resolve(true))
	}

	addUserByUsernameAndPassword(username: string, password: string): Promise<boolean> {
		const uuid = (): string => {
			return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
				const r = (Math.random() * 16) | 0,
					v = c == 'x' ? r : (r & 0x3) | 0x8
				return v.toString(16)
			})
		}

		return this.addUserFromScratch({
			username,
			password,
			id: uuid(),
			description: '',
			postIDs: []
		})
	}
}
