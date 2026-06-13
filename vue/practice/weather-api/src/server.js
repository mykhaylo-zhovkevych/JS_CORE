import express from 'express';
import cors from 'cors';

import {posts} from './data.js'
import { DEFAULT_PAGE_SIZE, parsePagination} from "./pagination.js";

const app = express();
const PORT = 3000;

app.use(
    cors({
        origin: 'http://localhost:5173',
        exposedHeaders: [
            'X-Total-Count',
            'X-Total-Pages'
        ]
    })
);

/*
GET /posts
GET /posts?_page=1&_limit=10
* */
app.get('/posts', (request, response) => {
    // request query will be passed from express
    const url = new URL(
        request.originalUrl,
        `${request.protocol}://${request.get('host')}`
    );

    const pagination = parsePagination(url);

    if (pagination.error) {
        return response.status(400).json({
            message: pagination.error,
        });
    }

    const { page, limit } = pagination;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const totalPages = Math.ceil(
        posts.length / limit
    );

    const selectedPosts = posts.slice(startIndex, endIndex).map((post, index) => ({...post, pageId: page, positionInPage:  index + 1}));

    response.set({
        'X-Total-Count': String(posts.length),
        'X-Total-Pages': String(totalPages)
    });
    return response.json(selectedPosts);
})

/*
 * GET /posts/1
 */
app.get('/posts/:id', (request, response) => {
    const postId = Number(request.params.id);

    if (!Number.isInteger(postId) || postId < 1) {
        return response.status(400).json({
            message: 'Post ID must be a positive integer'
        });
    }

    const postIndex = posts.findIndex(post => post.id === postId);

    if (postIndex === -1) {
        return response.status(404).json({
            message: `Post with ID ${postId} was not found`
        });
    }

    const pageNumber = Math.floor(postIndex / DEFAULT_PAGE_SIZE) + 1;
    const positionInPage = (postIndex % DEFAULT_PAGE_SIZE) + 1;

    return response.json({
        ...posts[postIndex],
        pageNumber,
        positionInPage
    });
});

/*
 * No endpoint matched.
 */
app.use((request, response) => {
    response.status(404).json({
        message: `Route ${request.path} was not found`
    });
});

app.listen(PORT, () => {
    console.log(`Weather API is running at http://localhost:${PORT}`);
});
