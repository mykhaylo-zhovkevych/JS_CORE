// ==========================================
// 1. CALLBACKS
// ==========================================

// A callback is just a function passed into another function
// It can be called later

function greet(name, callback) {
  console.log("Hello " + name);
  callback();
}

greet("Anna", function () {
  console.log("This runs after greet()");
});


// BAD CASE: too many nested callbacks
// Harder to read and maintain
setTimeout(() => {
  console.log("Step 1");
  setTimeout(() => {
    console.log("Step 2");
    setTimeout(() => {
      console.log("Step 3");
    }, 1000);
  }, 1000);
}, 1000);



// ==========================================
// 2. PROMISES
// ==========================================

// A Promise represents a future value
// It is pending now, fulfilled later, or rejected on error


const myPromise = new Promise((resolve, reject) => {
    const success = true;

    if (success) {
        resolve("Done");
    } else {
        reject("Error");
    }
});

myPromise
  .then((result) => {
    console.log(result); 
  })
  .catch((error) => {
    console.log(error);
});



// Good example 

function wait(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

wait(1000) 
    .then(() => {
        console.log("Step 1");
        return wait(1000);
    })
  .then(() => {
    console.log("Step 2");
    return wait(1000);
  })
  .then(() => {
    console.log("Step 3");
  })
  .catch((error) => {
    console.log("Error:", error);
  });

// ==========================================
// 3. ASYNC / AWAIT
// ==========================================

// async makes the function always return a Promise
async function hello() {
    return "Hello";
}

console.log(hello()); 
// Promise { "Hi" }

// await pauses only INSIDE the async function
// it does not pause the whole program

async function example() {
  console.log("A");

  await Promise.resolve();

  console.log("B");
}

example();
console.log("C");

// output:
// A
// C
// B


// ==========================================
// 4. FETCH with .then/ async and await
// ==========================================

// fetch() returns a Promise immediately
// The response is not ready yet

fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => {
    // response.json() also returns a Promise
    return response.json(); 
  })
  .then((data) => {
    // actual JSON data
    console.log(data); 
  })
  .catch((error) => {
    console.log("Fetch error:", error);
  });



async function getUsers() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();
  return data;
}

async function main() {
  const users = await getUsers();
  console.log(users);
}

main();


// Showcase
const myUser2 = {
    userList: []
};

const loadUsers = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    myUsers2.userList = data;
};

async function run() {
    await loadUsers();
    console.log(myUsers2.userList)
}

run();

