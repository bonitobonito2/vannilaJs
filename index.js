const button = document.getElementById("submit");
const nameInput = document.getElementById("name");
const lastNameInut = document.getElementById("lastName");
const addressInput = document.getElementById("address");
const note = document.getElementById("note");
const date = document.getElementById("calendar");
const maleRadio = document.getElementById("maleRadio");
const femaleRadio = document.getElementById("femaleRadio");
const items = document.getElementById("items");

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

const addHandler = (object) => {
  const Id = document.createElement("td");
  Id.innerHTML = `${object.id}`;
  const name = document.createElement("td");
  name.innerHTML = `${object.name}`;
  const lastName = document.createElement("td");
  lastName.innerHTML = `${object.lastName}`;
  const address = document.createElement("td");
  address.innerHTML = `${object.address}`;
  const gender = document.createElement("td");
  gender.innerHTML = `${
    object.choosenGender ? object.choosenGender : "not defined"
  }`;
  const data = document.createElement("td");
  data.innerHTML = `${object.data ? object.data : "not defined"}`;

  const deletee = document.createElement("td");
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = "delete";
  deletee.appendChild(deleteButton);
  deleteButton.addEventListener("click", () => {
    localStorage.removeItem(object.id);
    items.removeChild(document.getElementById(object.id));
  });
  const division = document.createElement("tr");

  division.classList.add("div");
  division.appendChild(Id);
  division.appendChild(name);
  division.appendChild(lastName);
  division.appendChild(address);
  division.appendChild(gender);
  division.appendChild(data);
  division.appendChild(deletee);
  division.addEventListener("click", () => {
    window.alert(`note : ${object.note}`);
  });
  division.id = object.id;
  items.appendChild(division);
};

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

  if (item != undefined) {
    item.map((obj) => {
      addHandler(obj);
    });
  }
};

const addOneHandler = (id) => {
  let item = localStorage.getItem(id);
  item = JSON.parse(item);
  addHandler(item);
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
  //date
  let dataTime = date.value;
  //note
  let notee = note.value;

  if (nameIsValid && lastNameIsValid && isAddressValid) {
    const items = allStorage();
    let item = { name: name, lastName: lastName, address: address };

    if (choosenGender != "") item.choosenGender = choosenGender;

    if (dataTime) item.data = dataTime;

    if (notee) item.note = notee;
    let biggestID;
    for (var i = 0; i < items.length; i++) {
      if (i === 0) {
        biggestID = items[i].id;
      } else {
        if (items[i].id > biggestID) {
          biggestID = items[i].id;
        }
      }
    }
    item.id = biggestID+1;
    localStorage.setItem(biggestID+1, JSON.stringify(item));
    addOneHandler(biggestID+1);
  }
};

button.addEventListener("click", clickHandler);
