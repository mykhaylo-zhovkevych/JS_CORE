'use strict';

const searchInput = document.getElementById('search');
const searchBtn = document.getElementById('search-btn');

const profileContainer = document.getElementById('profile-container');
const errorContainer = document.getElementById('error-container');
const errorMessage = document.getElementById('error-message');

const avatar = document.getElementById('avatar');
const nameElement = document.getElementById('name');
const usernameElement = document.getElementById('username');
const bioElement = document.getElementById('bio');
const locationElement = document.getElementById('location');
const joinedDateElement = document.getElementById('joined-date');

const profileLink = document.getElementById('profile-link');
const followersElement = document.getElementById('followers');
const followingElement = document.getElementById('following');
const repoCountElement = document.getElementById('repos');

const companyElement = document.getElementById('company');
const blogElement = document.getElementById('blog');
const twitterElement = document.getElementById('twitter'); 
const reposContainer = document.getElementById('repos-container');


const USERNAME_PATTERN = /^[a-z\d-]{1,39}$/i; 

// Tracks the in-flight request so a newer search can cancel an older one
let controller = null;


searchBtn.addEventListener('click', searchUser);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchUser();
});


const API_BASE = 'https://api.github.com';
const REPO_COUNT = 6;
const REQUEST_HEADERS = { Accept: 'application/vnd.github+json' };



async function searchUser() {
    const username = searchInput.value.trim();

    if (!username) {
        showError('Enter a GitHub username to search.');
        return;
    }
 
    if (!USERNAME_PATTERN.test(username)) {
        showError('That is not a valid GitHub username. Use letters, numbers and hyphens.');
        return;
    }

    controller?.abort();
    controller = new AbortController();
    const signal = controller.signal;

    hideError();
    profileContainer.classList.add('hidden');
    setLoading(true);


    try {
        // https://api.github.com/users/{username}
        const response = await fetch(`${API_BASE}/users/${encodeURIComponent(username)}`,
            { signal, headers: REQUEST_HEADERS }
        );

        if (!response.ok) throw new Error(describeHttpError(response));

    
        const user = await response.json();
        
        displayUserData(user);
        profileContainer.classList.remove('hidden');

        await fetchRepositories(user.repos_url, signal);
        } catch (error) {
            if (error.name === 'AbortError') return;
            showError(error.message);
        }
    finally {
        // Only celar the spinner if this request is still the current one
        if (controller?.signal === signal) setLoading(false);
    }
}

function displayUserData(user) {
    avatar.src = user.avatar_url;
    avatar.alt = `Avatar of ${user.login}`;

    nameElement.textContent = user.name || user.login;
    usernameElement.textContent = `@${user.login}`;
    bioElement.textContent = user.bio || 'No bio available';

    locationElement.textContent = user.location || 'Location not available';
    joinedDateElement.textContent = formatDate(user.created_at);

    profileLink.href = user.html_url;

    followersElement.textContent = formatNumber(user.followers);
    followingElement.textContent = formatNumber(user.following);
    repoCountElement.textContent = formatNumber(user.public_repos);

    companyElement.textContent = user.company || "Not specified";

    // User.blog is a text validate the protocol before it becomes an href
    setLink(blogElement, safeUrl(user.blog), user.blog, "No website");
    

    setLink(
        twitterElement, user.twitterElement ? `https://twitter.com/${encodeURIComponent(user.twitter_username)}` : null,
        `@${user.twitter_username}`, "No Twitter"
    );

}



function setLink(anchor, url, label, fallback) {
    if (url) {
        anchor.href = url;
        anchor.textContent = label;
    } else {
        anchor.removeAttribute('href');
        anchor.textContent = fallback;
    }
}

function safeUrl(value) {
    if (!value) return null;

    try {
        const url = new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`);    
        return url.protocol === 'http:' || url.protocol === 'https:' ? url.href : null;
    
    } catch {
        return null;
    }
}


async function fetchRepositories(repos_url, signal) {
    reposContainer.replaceChildren(
        createMessage('loading-repos', 'Loading repositories...')
    );

    const url = new URL(repos_url);
    url.searchParams.set('sort', 'updated');       // the heading says "latest"
    url.searchParams.set('per_page', String(REPO_COUNT));


    try {
        const response = await fetch(url, {singal, headers: REQUEST_HEADERS });

        if (!response.ok) throw new Error(describeHttpError(response));
        const repos = await response.json();

        if (!Array.isArray(repos)) throw new Error ('Github returned unexpected data.');

        displayRepos(repos);
    } catch (err) {
        if (err.name === 'AbortError') return;
        reposContainer.replaceChildren(...createMessage('no-repos', error.message));
    }
}


function displayRepos(repos) {
    if (repos.length === 0) {
        reposContainer.replaceChildren(
            createMessage('no-repos', 'This account has no public repositories')
        );
        return;
    }

    reposContainer.replaceChildren(...repos.map(createRepoCard));


}

function createRepoCard(repo) {
    const card = document.createElement('div');
    card.classList = 'repo-card';

    const link = document.createElement('a');
    link.className = 'repo-name';
    link.href = repo.html_url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.append(icon('fa-code-branch'), ` ${repo.name}`);

    const description = document.createElement('p');
    description.className = 'repo-description';
    description.textContent = repo.description  || 'No description available';

    const meta = document.createElement('div');
    meta.className = 'repo-meta';


    if (repo.language) meta.append(metaItem('fa-circle', repo.language));

    meta.append(
        metaItem('fa-star', formatNumber(repo.stargazers_count)),
        metaItem('fa-code-fork', formatNumber(repo.forks_count)),
        metaItem('fa-history', formatDate(repo.updated_at))
    );


    card.append(link, description, meta);
    return card;
}


// UI 
function setLoading(isLoading) {
    searchBtn.disabled = isLoading;
    searchBtn.textContent = isLoading ? 'Searching...' : 'Search';
}

function showError(message) {
    errorMessage.textContent = message;
    errorContainer.classList.remove('hidden');
    profileContainer.classList.add('hidden');
}
 
function hideError() {
    errorContainer.classList.add('hidden');
}



function metaItem(iconClass, text) {
    const item = document.createElement('div');
    item.className = 'repo-meta-item';
    item.append(icon(iconClass), ` ${text}`);
    return item;
}

function icon(iconClass) {
    const element = document.createElement('i');
    element.className = `fas ${iconClass}`;
    element.setAttribute('aria-hidden', 'true');
    return element;
}


function createMessage(className, text) {
    const el = document.createElement('div');
    el.className = className;
    el.textContent = text;
    return el;
}


// Helpers
function describeHttpError(response) {
    if (response.status === 404) {
        return 'No user found with that username. Check the spelling and try again.';
    }
    if (response.status === 403 || response.status === 429) {
        return 'GitHub rate limit reached (60 requests per hour). Try again later.';
    }
    return `GitHub returned an error (${response.status}).`;
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function formatNumber(value) {
    return new Intl.NumberFormat('en-US').format(value ?? 0);
}