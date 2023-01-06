import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'posts')

export const getPostsData = () => {
	const fileNames = fs.readdirSync(postsDirectory)
	const allPostsData = fileNames.map(fileName => {
		const id = fileName.replace(/\.md$/, '')
		const filePath = path.join(postsDirectory, fileName)
		const fileData = fs.readFileSync(filePath, 'utf-8')
		const matterResult = matter(fileData)
		return {
			id,
			title: matterResult.data.title,
			date: matterResult.data.date,
			content: matterResult.content,
		}
	})

	return allPostsData
}

export const getPostData = async (id: string) => {
	const filePath = path.join(postsDirectory, `${id}.md`)
	const fileData = fs.readFileSync(filePath, 'utf-8')
	const matterResult = matter(fileData)
	const processedContent = await remark().use(html).process(matterResult.content)
	const contentHtml = processedContent.toString()

	return {
		id,
		title: matterResult.data.title,
		date: matterResult.data.date,
		content: matterResult.content,
		contentHtml,
	}
}

export function getAllPostIds() {
	const fileNames = fs.readdirSync(postsDirectory)

	// Returns an array that looks like this:
	// [
	//   {
	//     params: {
	//       id: 'ssg-ssr'
	//     }
	//   },
	//   {
	//     params: {
	//       id: 'pre-rendering'
	//     }
	//   }
	// ]
	return fileNames.map(fileName => {
		return {
			params: {
				id: fileName.replace(/\.md$/, ''),
			},
		}
	})
}
