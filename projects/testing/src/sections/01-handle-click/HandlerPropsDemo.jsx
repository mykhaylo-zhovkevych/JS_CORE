import { memo, useState } from 'react'
import Code from '../../components/Code.jsx'
import Demo from '../../components/Demo.jsx'
import EventLog from '../../components/EventLog.jsx'
import Toggle from '../../components/Toggle.jsx'
import { useEventLog } from '../../hooks/useEventLog.js'

const INITIAL_POSTS = [
  { id: 1, author: 'ada', text: 'Event handlers are just props.', likes: 3, liked: false },
  { id: 2, author: 'linus', text: 'Pass the function, not its result.', likes: 7, liked: false },
  { id: 3, author: 'grace', text: 'Never mutate state — copy it.', likes: 12, liked: true },
]

// fresh objects every time, so the buggy (mutating) mode can't corrupt INITIAL_POSTS
const freshPosts = () => INITIAL_POSTS.map((post) => ({ ...post }))

// The child knows nothing about state. It only reports "the user liked me".
function PostCard({ post, onLike }) {
  return (
    <article className="post-card">
      <p className="post-author">@{post.author}</p>
      <p>{post.text}</p>
      <button
        type="button"
        className="btn btn-small like-btn"
        aria-pressed={post.liked}
        onClick={() => onLike(post.id)}
      >
        {post.liked ? '♥' : '♡'} {post.likes}
      </button>
    </article>
  )
}

// The parent of PostCard: owns the posts and the handler it passes down.
// memo() keeps log updates from re-rendering the feed, so you only see renders
// that setPosts itself causes — which is the whole point of the bug toggle.
const PostFeed = memo(function PostFeed({ bug, log }) {
  const [posts, setPosts] = useState(freshPosts)

  function handleLike(id) {
    if (bug) {
      const post = posts.find((p) => p.id === id)
      post.liked = !post.liked
      post.likes += post.liked ? 1 : -1
      setPosts(posts) // same array reference → Object.is(old, new) → React skips the render
      log(`mutated post ${id} in place (likes = ${post.likes} in memory) → setPosts(sameArray) → no re-render`, 'bug')
      return
    }

    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, liked: !p.liked, likes: p.likes + (p.liked ? -1 : 1) } : p)),
    )
    log(`handleLike(${id}) → new array + new post object → re-render`, 'ok')
  }

  function handleReset() {
    setPosts(freshPosts())
    log('reset posts', 'muted')
  }

  return (
    <>
      <div className="post-list">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} onLike={handleLike} />
        ))}
      </div>
      <button type="button" className="btn btn-small btn-ghost" onClick={handleReset}>
        Reset posts
      </button>
    </>
  )
})

export default function HandlerPropsDemo() {
  const [bug, setBug] = useState(false)
  const { entries, log, clear } = useEventLog()

  function handleBugChange(next) {
    setBug(next)
    if (!next) log('Toggling re-rendered the feed — mutated likes suddenly show up now', 'warn')
  }

  return (
    <Demo
      title="Handlers as props"
      concept="The parent owns the state and passes handleLike down as onLike. The child calls it; the parent replaces state with a new object so React sees the change."
      controls={
        <Toggle
          checked={bug}
          onChange={handleBugChange}
          label="Bug: mutate state in place"
          hint="post.likes++; setPosts(posts)"
        />
      }
      log={<EventLog entries={entries} onClear={clear} />}
    >
      <PostFeed bug={bug} log={log} />

      <Code variant={bug ? 'wrong' : 'right'}>
        {bug
          ? `
const post = posts.find((p) => p.id === id)
post.likes++          // mutates the existing object
setPosts(posts)       // same reference → no render
`
          : `
// naming: prop = onSomething, handler = handleSomething
<PostCard post={post} onLike={handleLike} />

setPosts((prev) => prev.map((p) =>
  p.id === id ? { ...p, likes: p.likes + 1 } : p
))
`}
      </Code>
    </Demo>
  )
}
