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

function check(id) {
  document.getElementById(id).checked = true;
  return true;
}

function uncheck(id) {
  document.getElementById(id).checked = false;
  return true;
}

const button = document.getElementById("submit");
const nameInput = document.getElementById("name");
const lastNameInut = document.getElementById("lastName");
const addressInput = document.getElementById("address");
const maleRadio = document.getElementById("maleRadio");
const femaleRadio = document.getElementById("femaleRadio");
const items = document.getElementById("items");

let choosenGender = "";

const changeHandler = (gender) => {
  if (gender === "male") {
    maleRadio.checked && uncheck("femaleRadio")
      ? (choosenGender = "male")
      : (choosenGender = "");
  }

  if (gender === "female") {
    femaleRadio.checked && uncheck("maleRadio")
      ? (choosenGender = "female")
      : (choosenGender = "");
  }

  console.log(choosenGender);
};
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
      oneItem.innerHTML = `name : ${obj.name}; lastname : ${
        obj.lastName
      }; address : ${obj.address}; gender : ${
        obj.choosenGender ? obj.choosenGender : "not defined"
      }`;

      items.appendChild(oneItem);
    });
  }
};

const clickHandler = () => {
  //name validation
  let name = nameInput.value;
  let nameIsValid = validationFunctions.nameValidation(name);
  //lastname validation
  let lastName = lastNameInut.value;
  let lastNameIsValid = validationFunctions.lastNameValidation(lastName);
  //address Validation
  let address = addressInput.value;
  let isAddressValid = validationFunctions.addressValidation(address);

  if (nameIsValid && lastNameIsValid && isAddressValid) {
    const items = allStorage();
    let item = { name: name, lastName: lastName, address: address };
    console.log(choosenGender);
    if (choosenGender != "") {
      item.choosenGender = choosenGender;
    }
    localStorage.setItem(items.length + 1, JSON.stringify(item));
    loadHandler();
  }
};

button.addEventListener("click", clickHandler);
