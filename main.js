const machinesContainer = document.querySelector(".machines-container");

var PRODUCT_FULL_NAMES = {
  EMS: "Enterprise Multi Server",
  MS: "Multi Server",
  D: "Desktop",
};

/* ------------------- *\
 # displaying machines in HTML
\* ------------------- */

for (var i = 0; i < machines.length; i++) {
  generateMachineComponent(machines[i]);
}

// rendering
function generateMachineComponent(machin) {
  var machinCard = document.createElement("div");

  machinCard.classList.add("machine-card");

  machinCard.setAttribute("data-machine-id", machin.ID);

  machinCard.setAttribute("data-machine-parent-id", machin["Parent-ID"]);

  if (machin.Status == "unreachable") {
    machinCard.classList.add("machine-card__disabled");
  }

  machinCard.innerHTML = `
    <h4>machin name - ${machin["Machine name"]} <span></span></h4>
    <p>Product - <span>${PRODUCT_FULL_NAMES[machin.Product]}</span></p>
    <p>OS - <span>${machin.OS}</span></p>
    <p>status - <span>${machin.Status}</span></p>
  `;

  machinesContainer.append(machinCard);
}

/* ------------------- *\
 # Showing child machines
\* ------------------- */

machinesContainer.addEventListener("dblclick", handleDoubleClick);

// Step 1
function handleDoubleClick(e) {
  var elem = e.target;

  // checking if clicked element is machine card or not
  if (
    elem.classList.contains("machine-card") &&
    elem.hasAttribute("data-machine-id")
  ) {
    var machineId = elem.getAttribute("data-machine-id");
    showChildMachines(machineId);
  }
}

// Step 2
function showChildMachines(machineId) {
  var machinCards = machinesContainer.children;

  for (var i = 0; i < machinCards.length; i++) {
    var parentId = machinCards[i].getAttribute("data-machine-parent-id");

    // show child machines, hide non child machines
    if (parentId == machineId) {
      machinCards[i].style.display = "block";
    } else {
      machinCards[i].style.display = "none";
    }
  }
}
