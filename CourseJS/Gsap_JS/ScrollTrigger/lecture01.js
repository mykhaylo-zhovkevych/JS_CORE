// Create style tag
const style = document.createElement('style');
style.textContent = `
  body, html {
    margin: 0;
    background-color: #1a1a1a;
    font-family: Arial, sans-serif;
  }
  .grid-container {
    display: grid;
    width: 50vmin;
    height: 50vmin;
    grid-template-columns: repeat(8, 1fr);
    grid-template-rows: repeat(8, 1fr);
    gap: 2px;
    margin: auto;
    margin-bottom: 20vmin;
  }
  .grid-item {
    display: grid;
    place-items: center;
    color: white;
    font-size: 3vmin;
  }
  .item-a {
    background-color: #800080;
    grid-column: 1 / 3;
    grid-row: 1 / 3;
  }
  .item-b {
    background-color: #008000;
    grid-column: 3 / 5;
    grid-row: 7 / 9;
  }
  .item-c {
    background-color: #685b14;
    width: 5vmin;
    height: 5vmin;
    margin-top: 210rem;
  }
`;
document.head.appendChild(style);

// Create grid container and items
const gridContainer = document.createElement('div');
gridContainer.className = 'grid-container';

const itemA = document.createElement('div');
itemA.className = 'grid-item item-a';
itemA.textContent = 'a';

const itemB = document.createElement('div');
itemB.className = 'grid-item item-b';
itemB.textContent = 'b';

gridContainer.append(itemA, itemB);

// Create item C outside of grid container
const itemC = document.createElement('div');
itemC.className = 'grid-item item-c';
itemC.textContent = 'c';

// Append elements to the body
document.body.appendChild(gridContainer);
document.body.appendChild(itemC);

// Load GSAP and ScrollTrigger
const scriptGSAP = document.createElement('script');
scriptGSAP.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js';
document.body.appendChild(scriptGSAP);

// JS code do additional animation 
const scriptST = document.createElement('script');
scriptST.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js';
scriptST.onload = () => {
  gsap.registerPlugin(ScrollTrigger);
  
  gsap.to(".item-c", {
    scrollTrigger: {
      trigger: ".item-c",
      toggleActions: "restart none none none"
    },
    x: 1200,
    rotation: 360,
    duration: 3
  });
};
document.body.appendChild(scriptST);

/* 
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script>

    
    gsap.to(".item-c", {
    scrollTrigger: {
      trigger: ".item-c", ToggleActions: "restart none none none"
      
      }, // start the animation when ".box" enters the viewport (once)
    x: 200,
    rotation: 360,
    duration: 3
  });



</script> 
*/