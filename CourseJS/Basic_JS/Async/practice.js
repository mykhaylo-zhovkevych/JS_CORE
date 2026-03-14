const getDadJoke = async () => {
    const response = await fetch('https://icanhazdadjoke.com/', {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    });

    const jsonJokeData = await response.json();
    console.log(jsonJokeData.joke);
}

getDadJoke();


async function getUserAndPosts() {
    try {
        const userResponse = await fetch('https://jsonplaceholder.typicode.com/users/1');
        if (!userResponse.ok) {
            throw new Error('Failed to fetch user data');
        }
        const user = await userResponse.json();
        console.log('User:', user);

        const postsResponse = await fetch(
        "https://jsonplaceholder.typicode.com/posts?userId=" + user.id
        );

        if (!postsResponse.ok) {
            throw new Error("Could not load posts");
        }

        const posts = await postsResponse.json();
        console.log("Posts:", posts);
        } catch (error) {
        console.log("Error:", error.message);
  
    }
}

getUserAndPosts();



const jokeObject = {
    id: "0oO71ITSv4Ed",
    joke: "Why was it called the dark ages? Beacuse of all the knights."
}

// const postData = async (jokeObj) => {
//     const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(jokeObj)
//     });
//     const jsonResponse = await response.json();
//     console.log(jsonResponse);
// }

//postData(jokeObject);

// abstraction into functions

// Some data from a form, with eventlistener
const getDataFromForm = () => {
    const requestObj = {
        firstName: "Bruce",
        lastName: "Lee",
        categories: ["nerdy"]
    };
    return requestObj;
}

const buildRequestURL = (requestData) => {
    return `https://api.icndb.com/jokes/random?firstName=${requestData.firstName}&lastName=${requestData.lastName}&limitTo=[${requestData.categories.join(",")}]`;
}

// async function
const requestJoke = async (url) => {

    const response = await fetch(url);
    const jsonResponse = await response.json();
    const jokeObj= jsonResponse.value;
    postJokeToPage(jokeObj);

}

const postJokeToPage = (jokeObj) => {
    console.log(jokeObj);
}

// Procedural "workflow" function

const processJokeRequest = async () => {
    const requestData = getDataFromForm();
    const requestUrl = buildRequestURL(requestData);
    await requestJoke(requestUrl);
    console.log("Finished");
}


processJokeRequest();

// const requestJoke = async (firstName, lastName) => {
//     const response = await fetch(`https://api.icndb.com/jokes/random?firstName=${firstName}&lastName=${lastName}`);

//     const jsonResponse = await response.json();

//     console.log(jsonResponse.value);

// }

// requestJoke("Clint", "Eastwood");
