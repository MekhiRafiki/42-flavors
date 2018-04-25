/* Sets a random integer quantity in range [1, 20] for each flavor. */
function setQuantities() {
  // Get all the elements that need to be modifed
  var elements = document.getElementsByClassName("flavor");

  Array.from(elements).forEach(function(element){
    // Prepend the quantity as the first child of meta
      var metaEl = element.querySelector(".meta");
      var spanAdd = document.createElement("span");
      spanAdd.classList.add("quantity");
      spanAdd.innerHTML = Math.floor(Math.random() * 20);
      metaEl.insertBefore(spanAdd, metaEl.firstChild);

  });
}

/* Extracts and returns an array of flavor objects based on data in the DOM. Each
 * flavor object should contain five properties:
 *
 * element: the HTMLElement that corresponds to the .flavor div in the DOM
 * name: the name of the flavor
 * description: the description of the flavor
 * price: how much the flavor costs
 * quantity: how many cups of the flavor are available
 */
function extractFlavors() {
  var flavors = [];

    var elements = document.getElementsByClassName("flavor");
    Array.from(elements).forEach(function(element){
        var flavor = {
          element: element,
          name: element.querySelector('.description').querySelector('h2').innerText,
          description:  element.querySelector('.description').querySelector('p').innerText,
          price: parseFloat(element.querySelector('.meta').querySelector('.price').innerText.replace(/\$/g, '')),
          quantity: element.querySelector('.meta').querySelector('span').innerText,
        };
        flavors.push(flavor);
    });
    return flavors;
}

/* Calculates and returns the average price of the given set of flavors. The
 * average should be rounded to two decimal places. */
function calculateAveragePrice(flavors) {
  var total = 0;
  var count = 0;
  Array.from(flavors).forEach(function(element){
      total = total + element['price'];
      count++;
  });
  var averageI = total / count;
  return averageI.toFixed(2);
}

/* Finds flavors that have prices below the given threshold. Returns an array
 * of strings, each of the form "[flavor] costs $[price]". There should be
 * one string for each cheap flavor. */
function findCheapFlavors(flavors, threshold) {
  flavors = Array.from(flavors).filter(function(flavor){
    return flavor['price'] <= threshold;
  });
  return Array.from(flavors).map(flavor => flavor['name'] + " cost $" + flavor['price']);
}

/* Populates the select dropdown with options. There should be one option tag
 * for each of the given flavors. */
function populateOptions(flavors) {
  var dropdown = document.querySelector('select');
  Array.from(flavors).forEach(function(flavor){
      var op = document.createElement('option');
      op.innerHTML = flavor['name'];
      op.value = flavor['name'];
      dropdown.appendChild(op);
  });
}

/* Processes orders for the given set of flavors. When a valid order is made,
 * decrements the quantity of the associated flavor. */
function processOrders(flavors) {
  var submit = document.querySelector('input[type="submit"]');
  submit.addEventListener('click', function(event){
    event.preventDefault();
    var dropdown = document.querySelector('select');
    var flavor = dropdown.value;
    var amount = document.querySelector('input[type="text"]').value

    // Handle updating
    var chosenOp = document.querySelector('select').querySelector('option[value="BERRIED TREASURE"]');
  });
}

/* Highlights flavors when clicked to make a simple favoriting system. */
function highlightFlavors(flavors) {
  // TODO
}


/***************************************************************************/
/*                                                                         */
/* Please do not modify code below this line, but feel free to examine it. */
/*                                                                         */
/***************************************************************************/


const CHEAP_PRICE_THRESHOLD = 1.50

// setting quantities can modify the size of flavor divs, so apply the grid
// layout *after* quantities have been set.
setQuantities()
const container = document.getElementById('container')
new Masonry(container, { itemSelector: '.flavor' })

// calculate statistics about flavors
const flavors = extractFlavors()
const averagePrice = calculateAveragePrice(flavors)
console.log('Average price:', averagePrice)

const cheapFlavors = findCheapFlavors(flavors, CHEAP_PRICE_THRESHOLD)
console.log('Cheap flavors:', cheapFlavors)

// handle flavor orders and highlighting
populateOptions(flavors)
processOrders(flavors)
highlightFlavors(flavors)
