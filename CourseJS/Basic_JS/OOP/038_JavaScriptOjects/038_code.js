// Objects in JavaScript
// An object is a collection of related properties and/or methods.
// Objects can represent real-world entities like people, products, or places.

// Defining an object named 'person1'
const person1 = {
    // Properties of the object
    firstname: "Mykhaylo", // Property 'firstname' with a string value
    lastname: "Zhovkevych", // Property 'lastname' with a string value
    age: 30, // Property 'age' with a number value
    isEmployed: true, // Property 'isEmployed' with a boolean value

    // Methods of the object
    // Method 'sayHello' that prints a greeting message to the console
    sayHello: function() {
        console.log("Hi, I am Mykhaylo Zhovkevych");
    },

    // Method 'sayBye' that prints a farewell message to the console
    sayBye: function() {
        console.log("Bye");
    }
};

// Accessing object properties
console.log(person1.firstname); // Outputs: Mykhaylo
console.log(person1.lastname);  // Outputs: Zhovkevych
console.log(person1.age);       // Outputs: 30
console.log(person1.isEmployed);// Outputs: true

// Calling object methods
person1.sayHello(); // Outputs: Hi, I am Mykhaylo Zhovkevych
person1.sayBye();   // Outputs: Bye

// Adding a new property to the object
person1.country = "Ukraine";
console.log(person1.country); // Outputs: Ukraine

// Updating an existing property
person1.age = 31;
console.log(person1.age); // Outputs: 31

// Deleting a property
delete person1.isEmployed;
console.log(person1.isEmployed); // Outputs: undefined


//The JavaScript for in statement loops through the properties of an Object:

// Syntax
for (key in object) {
  // code block to be executed
}

// Looping through all properties and methods in the object
for (let key in person1) {
    console.log(key + ": " + person1[key]);
}