import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { getPostsData } from '../lib/post'

const inter = Inter({ subsets: ['latin'] })

export default function Home({ postsData }: any) {
	return (
		<>
			<Head>
				<title>Turbo</title>
			</Head>
			<main className={styles.main}>
				<ul>
					{postsData.map((post: any) => (
						<li key={post.id}>
							<Link href={`/posts/${post.id}`}>
								<h2>{post.title}</h2>
							</Link>
							<p>{post.date}</p>
						</li>
					))}
				</ul>
			</main>
		</>
	)
}

export async function getStaticProps() {
	// Fetch necessary data for the blog post using params.id
	const postsData = await getPostsData()
	return {
		props: {
			postsData,
		},
	}
}
