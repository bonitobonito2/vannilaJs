const validationFunctions = {
  nameValidation: function (name) {
    if (name.length === 0) {
      document.getElementById("nameHelp").classList.add("error");
      return false;
    } else {
      document.getElementById("nameHelp").classList.remove("error");
      return true;
    }
  },
  lastNameValidation: function (lastName) {
    if (lastName.length === 0) {
      document.getElementById("lastNameHelp").classList.add("error");
      return false;
    } else {
      document.getElementById("lastNameHelp").classList.remove("error");
      return true;
    }
  },
  addressValidation: function (address) {
    if (address.length === 0 || address.length > 35) {
      document.getElementById("addressHelp").classList.add("error");
      return false;
    } else {
      document.getElementById("addressHelp").classList.remove("error");
      return true;
    }
  },
};

const button = document.getElementById("submit");
const nameInput = document.getElementById("name");
const lastNameInut = document.getElementById("lastName");
const addressInput = document.getElementById("address");
const items = document.getElementById("items");

function allStorage() {
  var values = [],
    keys = Object.keys(localStorage),
    i = keys.length;

  keys.sort((a, b) => a - b);
  while (i--) {
    values.push(JSON.parse(localStorage.getItem(keys[i])));
  }

  return values;
}

const loadHandler = () => {
  const item = allStorage();
  items.innerHTML = "";
  if (item) {
    console.log(item.name);
    item.map((obj) => {
      console.log(obj);

      const oneItem = document.createElement("div");
      oneItem.innerHTML = `name : ${obj.name}; lastname : ${obj.lastName}; address : ${obj.address}`;

      items.appendChild(oneItem);
    });
  }
};

const clickHandler = () => {
  let name = nameInput.value;
  let nameIsValid = validationFunctions.nameValidation(name);
  //lastname
  let lastName = lastNameInut.value;
  let lastNameIsValid = validationFunctions.lastNameValidation(lastName);
  //address Validation
  let address = addressInput.value;
  let isAddressValid = validationFunctions.addressValidation(address);

  if (nameIsValid && lastNameIsValid && isAddressValid) {
    const items = allStorage();

    localStorage.setItem(
      items.length + 1,
      JSON.stringify({ name: name, lastName: lastName, address: address })
    );
    loadHandler();
  }
};

button.addEventListener("click", clickHandler);
