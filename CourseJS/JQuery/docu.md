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


---
# 5. DOM Manipulation

## 5.1 What DOM manipulation means

The Document Object Model manipulation means reading or changing that structure.

jQuery can:
- change text
- change HTML
- change attributes
- change CSS classes
- insert elements
- remove elements
- move elements

## 5.2 Changing text and HTML

```js
$("#title").text("New title");
$("#content").html("<strong>Important</strong>");
```

Difference:

| Method    | Meaning             | Safer for user input?           |
| --------- | ------------------- | ------------------------------- |
| `.text()` | inserts plain text  | yes                             |
| `.html()` | inserts HTML markup | dangerous if input is untrusted |

Prefer `.text()` when inserting user input:
```js
const userInput = "<script>alert('xss')</script>";
$("#output").text(userInput); // displayed as text, not executed as HTML
```

## 5.3 Reading and changing form values

```js
const name = $("#name").val();
$("#name").val("Mykhaylo"); // sets the secound value into the input field
```

## 5.4 Attributes and properties

```js
$("img").attr("src", "photo.png");
$("a").attr("href", "https://example.com");
$("input").prop("checked", true);
```

Use `.attr()` for HTML attributes. Use `.prop()` for live DOM properties such as `checked`, `selected`, and `disabled`.

## 5.5 Classes and CSS

```js
$("#box").addClass("active");
$("#box").removeClass("hidden");
$("#box").toggleClass("selected");
$("#box").hasClass("active");
```

Direct CSS changes:
```js
$("#box").css("background-color", "yellow");
$("#box").css({
  width: "200px",
  height: "100px",
  border: "1px solid black"
});
```

In real projects, prefer classes for styling because CSS stays in CSS:
```js
$("#box").addClass("warning");
```

## 5.6 Inserting and removing elements
```js
$("#list").append("<li>New item at the end</li>");
$("#list").prepend("<li>New item at the beginning</li>");
$("#title").after("<p>Text after title</p>");
$("#title").before("<p>Text before title</p>");
```

Remove content:
```js
$(".error").remove();  // removes the element itself
$("#list").empty();    // removes child elements, keeps #list
```

## 5.7 Small DOM example

HTML:
```html
<input id="task-input" placeholder="Task name" />
<button id="add-task">Add</button>
<ul id="task-list"></ul>
```

jQuery:
```js
$(function () {
	$("#add-task").on("click", addTask);
	$("task-list").on("click", "delete", deleteTask);
});

function addTask() {
	const task = $("#task-input").val().trim();
	
	
	if (text === ""){
		return;
	}
	
	const item = $("<li></li>");
	const label = $("<span></span>").text(text);  
	const button = $("<button></button>").text("Delete").addClass("delete");
	
	item.append(label, " ", button);
	$("#task-list").append(item);
	$("#task-input").val("");
}

function deleteTask() {
	$(this).closest("li").remove();
}
```


---

# 6. Effects and Animation

## 6.1 Simple effects

jQuery has built-in effects for showing, hiding, fading, and sliding elements.

```js
$("#box").hide();
$("#box").show();
$("#box").toggle();
```

## 6.2 Fading

```js
$("#message").fadeIn('fast');
$("#message").fadeOut(300);
$("#message").fadeToggle(300);
$("#message").fadeTo(300, 0.5);
```
- `.fadeToggle()` switches between fade in and fade out

## 6.3 Sliding

```js
$("#panel").slideDown(300);
$("#panel").slideUp(300);
$("#panel").slideToggle(300);
```
Common use case: dropdowns and collapsible panels.

HTML:
```html
<button id="toggle-help">Help</button>
<div id="help-panel" style="display: none;">
  This is man text.
</div>
```

jQuery:
```js
$("#toggle-help").on("click", function () {
  $("#help-panel").slideToggle(300);
});
```

## 6.4 Custom animation with `.animate()`

`.animate()` changes numeric CSS properties over time.
```js
$("#box").animate({
  width: "300px",
  opacity: 0.5,
  marginLeft: "50px"
}, 600);
```
Important: `.animate()` works best with numeric CSS properties. It cannot directly animate colors without extra plugins.

## 6.5 Animation callbacks

A callback runs after the animation finishes.
```js
$("#box").fadeOut(300, function () {
  console.log("Animation finished");
  $(this).remove();
});
```


---

# 7. Ajax

## 7.1 What Ajax means

Ajax means loading data from a server without refreshing the whole page.

Examples:
- loading search results
- sending a form in the background
- getting JSON data from an API
- updating a part of the page without reloading

## 7.2 Basic `$.ajax()` request
```js
$.ajax({
  url: "/api/users",
  method: "GET",
  dataType: "json",
  success: function (users) {
    console.log(users);
  },
  error: function (xhr, status, error) {
    console.error("Request failed:", error);
  }
});
```

## 7.3 GET request with `$.get()`
```js
$(document).ready(function(){
	$.get("/api/users", function (users) {
	  console.log(users);
	});
})
```

## 7.4 JSON request with `$.getJSON()`
```js
$.getJSON("/api/products", function (products) {
  products.forEach(function (product) {
    $("#products").append(
      $("<li></li>").text(product.name)
    );
  });
});
```

## 7.5 POST request
```js
$.ajax({
  url: "/api/tasks",
  method: "POST",
  contentType: "application/json",
  data: JSON.stringify({
    title: "Learn jQuery",
    done: true
  }),
  success: function (createdTask) {
    console.log("Created:", createdTask);
  },
  error: function (xhr) {
    console.error("Server error:", xhr.responseText);
  }
});
```

## 7.6 Ajax with form data
```html
<form id="profile-form">
  <input name="username" />
  <input name="email" />
  <button type="submit">Save</button>
</form>
```
```js
$("#profile-form").on("submit", function (event) {
  event.preventDefault();

  $.ajax({
    url: "/api/profile",
    method: "POST",
    data: $(this).serialize(),
    success: function () {
      $("#status").text("Saved successfully");
    },
    error: function () {
      $("#status").text("Save failed");
    }
  });
});
```


## 7.7 Global Ajax events

jQuery can react to Ajax activity globally:
```js
<div id="loading">Loading...</div>  
  
<button id="load-user">Load User</button>  
<button id="load-both">Load Both</button>  
  
<div id="result">Result will appear here...</div>

<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<script>
	$(document).on("ajaxStart", function(){
		$("#loading").show();
	});
	
	$(document).on("ajaxStop", function () {
		$("#loading").hide();
	});
	
	$("#load-user").on("click", function() {
		$.ajax({
			url: "https://jsonplaceholder.typicode.com/users/1",  
			method: "GET"
		})
		.done(function (user) {
			$("#result").html(
				`
				<h2>User loaded</h2>
				<p>Name: ${user.name}</p>  
				<p>Email: ${user.email}</p>
				`
			)
		})
		.fail(function () {  
			$("#result").text("Could not load user.");  
		});
	});
	
	// Global events when the button clicked a request started and because jquery automatically triggers the ajaxStart the same for the ajaxStop
	
	$("#load-both").on("click", function () {
      $("#result").html("");

      $.ajax({
        url: "https://jsonplaceholder.typicode.com/users/1",
        method: "GET"
      })
      .done(function (user) {
        $("#result").append(`
          <h2>User</h2>
          <p>${user.name}</p>
        `);
      });

      $.ajax({
        url: "https://jsonplaceholder.typicode.com/posts/1",
        method: "GET"
      })
      .done(function (post) {
        $("#result").append(`
          <h2>Post</h2>
          <p>${post.title}</p>
        `);
      });
    });
</script>
```

Ajax loads data without reloading the page because it does **not use the browser’s normal navigation mechanism**.

Internally, jQuery uses the browser’s HTTP request APIs, historically `XMLHttpRequest`. Modern JavaScript often uses `fetch()`, Ajax does not trigger document navigation. It creates a network request from the current JavaScript runtime. The response is delivered back to JavaScript as data, not as a replacement document.

---

# 8. What changed in 2026: jQuery 4.0

## 8.1 General update
Important points:
- jQuery 4.0.0 is the current major release.
- jQuery 3.x now receives only critical updates.
- Some older deprecated APIs and undocumented behaviors were removed.
- The jQuery Migrate plugin is recommended when upgrading older code.

## 8.2 Browser support changes
jQuery 4.0 removed support for very old browsers, including:
- Internet Explorer 10 and older
- legacy non-Chromium Edge
- old mobile Safari versions
- old Android browser versions

Internet Explorer 11 is still supported in jQuery 4.0, but older IE-specific code was reduced.

## 8.3 Selectors in jQuery 4.0
Selector-related update:
- jQuery 4.0 fixed selection-context behavior in the newer selector-native path.
- Support for legacy custom pseudos was dropped.

Normal selectors like these are still fine. Problems are more likely in older projects that used custom or unusual selector extensions.

## 8.4 Ajax in jQuery 4.0
Ajax had several important changes:
- JSON requests are no longer automatically promoted to JSONP(JSONP is not really “data only” It is executable JavaScript)
- Scripts loaded through Ajax are no longer auto-executed unless `dataType: "script"` is explicitly used.
- Async script requests now prefer script tags to avoid some Content Security Policy problems.
- Support for binary data through `FormData` was improved.
```js
$.ajax({
  url: "https://example.com/data?callback=?",
  dataType: "jsonp"
});

$.ajax({
  url: "/scripts/plugin.js",
  dataType: "script"
});
```