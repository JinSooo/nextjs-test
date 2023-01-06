import Head from 'next/head'
import Layout from '../../components/Layout'
import { getAllPostIds, getPostData } from '../../lib/post'

export default function Post({ postData }) {
	return (
		<Layout>
			<Head>
				<title>{postData.title}</title>
			</Head>
			{postData.title}
			<br />
			{postData.id}
			<br />
			{postData.date}
			<br />
			<div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
		</Layout>
	)
}

export async function getStaticPaths() {
	const paths = getAllPostIds()

	// Return a list of possible value for id
	return {
		paths,
		fallback: false,
	}
}

export async function getStaticProps({ params }) {
	// Fetch necessary data for the blog post using params.id
	const postData = await getPostData(params.id)
	return {
		props: {
			postData,
		},
	}
}
