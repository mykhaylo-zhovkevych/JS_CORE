# jQuery Core

## 1. What is jQuery?

jQuery is a JavaScript library that makes common browser tasks easier:
- finding HTML elements
- reacting to user actions
- changing the DOM
- creating effects and animations
- loading data from a server with Ajax

The central dea is simple:
``` js
$(selector).method();
```
But intermediate/advanced jQuery is mostly about **how you select, store, chain, delegate, create plugins, handle async code, and control DOM behavior efficiently**.

Example:
```js
$("button").on("click", function () {
  $("#message").text("Button clicked!");
});
```

Here:
- `$()` creates a jQuery object.
- `"button"` is a selector.
- `.on("click", ...)` attaches an event handler.
- `$("#message").text(...)` changes the DOM.

_Some further examples_ 
1. Chaining
``` js
$("#box")
	.addClass("active")
	.text("Hello")
	.fadeIn(); 
```
2. Storing jQuery objects
``` js
const $menu = $("#menu");

$menu
	.addClass("open")
	.show()
	.css("color", "red")
```
The `$menu` variable means: “this variable contains a jQuery object.”

3. Event delegation
``` js
$("#list").on("click", ".delete-btn", function () {  
	$(this).parent().remove();  
});
```

 A better way of writting the code
``` js
$(".delete-bth").on("click", function(){
	$(this).parent().remove();
});
```

“Find all elements that have class `delete-btn` **right now**, and attach a click listener to those exact DOM elements.”

4. `this` versus `$(this)`
``` js
$("button").on("click", function () {  
console.log(this);  // `this` is the raw DOM element.
console.log($(this));  // `$(this)` wraps it as a jQuery object.
});
``` 

5. `.find()`, `.parent()`, `.children()`, `.closest()`
Advanced jQuery often moves through the DOM.
``` javascript
$(".delete").on("click", function () {  
$(this).closest(".card").remove();  
});


$(this).parent();        // direct parent
$(this).children();      // direct children
$(this).find("span");    // descendants inside
$(this).closest(".box"); // nearest matching parent
$(this).siblings();      // elements beside it
``` 

6. Filtering selections
``` javascript
$("li").first();
$("li").last();
$("li").eq(2);
$("li").filter(".active");
$("li").not(".disabled");
```

7. More into the thing itself
``` js
$("li").each(function (index, element) {  
console.log($(this).text());  
});

// current js 
document.querySelectorAll("li").forEach(function (element, index) {
    console.log(element.textContent);
});
```
With JQuery it allows achive the same, but a bit more efficent than in vanila js.

jQuery usually does not give you a completely different power. It mostly gives you a **shorter, simpler, more unified syntax** for things that JavaScript can already do.

But I would phrase it like this:

> jQuery is mostly a convenience layer over JavaScript DOM APIs.

Or:

> jQuery lets you write common DOM, event, animation, and Ajax code with less repetitive syntax.

---

# 3. Selectors

## 3.1 What selectors do
Selectors are used to find elements in the page. jQuery selectors are mostly based on CSS selectors, with some additional jQuery-specific selectors.

```js
$("p")          // all <p> elements
$("#main")      // element with id="main"
$(".card")      // elements with class="card"
$("ul li")      // all <li> elements inside <ul>
$("input[name=email]") // input with name="email"
```
The result is a jQuery collection. Even if only one element matches, jQuery still returns a collection-like object.

Example:
```html
<h1 id="title">Learn jQuery</h1>  
  
<ul id="tasks">  
	<li>Learn HTML</li>  
	<li>Learn CSS</li>  
	<li>Learn jQuery</li>  
</ul>
```

```js
const nativeTitle = document.querySelector("#title");
const jqueryTitle = $("#title");

console.log(nativeTitle);
console.log(jqueryTitle);  
console.log(jqueryTitle.length);  
console.log(jqueryTitle[0]);
// selecting one element, still returns a jQuery collection
{  
0: <h1 id="title">Learn jQuery</h1>,  
length: 1,  
// many jQuery methods: text(), addClass(), hide(), on(), ...  
// jQuery still returns a collection-like object, not the raw element directly
}
```
Why this is matter?
Because jQuery methods work on the whole collection.
`$("#tasks li").addClass("task-item");`
	Add `task-item` to every element inside the jQuery collection.

## 3.2 Common selector types

| Selector | Meaning | Example |
|---|---|---|
| `*` | all elements | `$("*")` |
| `element` | all elements of this type | `$("div")` |
| `#id` | one element by id | `$("#login")` |
| `.class` | elements by class | `$(".error")` |
| `A B` | descendants | `$("nav a")` |
| `A > B` | direct children | `$("ul > li")` |
| `[attr]` | elements with attribute | `$("[disabled]")` |
| `[attr=value]` | attribute equals value | `$("input[type=text]")` |
| `:first` | first matched element | `$("li:first")` |
| `:last` | last matched element | `$("li:last")` |
| `:visible` | visible elements | `$(".box:visible")` |
| `:hidden` | hidden elements | `$(".box:hidden")` |

## 3.3 Filtering after selection

Instead of making one huge selector, you can select first and then filter:
```js
$("li").first().addClass("first-item");
$("li").last().addClass("last-item");
$("li").eq(1).addClass("second-item");
$("li").filter(".done").css("font-weight", "bold");
```

Useful methods:
```js
.parent()      // direct parent
.children()    // direct children
.find()        // descendants inside current element
.siblings()    // elements on same level
.closest()     // nearest parent matching selector
.next()        // next sibling
.prev()        // previous sibling
```

Example:
```js
$(".delete-button").on("click", function () {
  $(this).closest("li").remove();
});
```
Here, `this` is the clicked button. `.closest("li")` finds the nearest parent `<li>` and removes it.

---

# 4. Events
## 4.1 What events are

Events are things that happen in the browser:
- user clicks a button
- user types into an input
- form is submitted
- mouse enters an element
- page finishes loading
- Ajax request starts or finishes

jQuery uses `.on()` to attach event handlers.

## 4.2 Common event examples

```js
$("#save").on("click", function () {
  console.log("Save clicked");
});

$("#username").on("input", function () {
  console.log($(this).val());
});

$("form").on("submit", function (event) {
  event.preventDefault();
  console.log("Form submitted without page reload");
});

$(".card").on("mouseenter", function () {
  $(this).addClass("active");
});

$(".card").on("mouseleave", function () {
  $(this).removeClass("active");
});

$(document).on('mousemove', function(e) {
	$('#coords').html('Coords: Y: '+e.clientY+" X: "e.ClientX);
})
```

## 4.3 The event object

The event object contains information about the event.
```js
$("a").on("click", function (event) {
  event.preventDefault(); // stop default browser behavior
  console.log("Link was clicked, but navigation was stopped");
});
```

## 4.4 Event delegation

Event delegation is important when elements are created later with JavaScript.
Bad for dynamic elements:
```js
$(".delete").on("click", function () {
  $(this).closest("li").remove();
});
```
This only attaches handlers to elements that already exist.

Better:
```js
$("#task-list").on("click", ".delete", function () {
  $(this).closest("li").remove();
});
```
Meaning:
- attach the event listener to `#task-list`
- react only when the clicked target matches `.delete`
- works also for buttons added later

