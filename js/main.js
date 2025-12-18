getUserName();
var myUser = document.getElementById("myUser");
// * contact count in header
var totalContacts = document.getElementById("contacts");
var favContacts = document.getElementById("favContacts");
var emergContacts = document.getElementById("emergContacts");
// ? title span
var allContacts = document.getElementById("manage");
// * buttons to toggle from fav and emerg lists
var makeNotFavBtn = document.getElementsByClassName("toggle-if-fav");
var makeNotEmergBtn = document.getElementsByClassName("toggle-if-emerg");
var makeFavBtn = document.getElementsByClassName("toggle-not-fav");
var makeEmergBtn = document.getElementsByClassName("toggle-not-emerg");

// alert("اشهد ان لا اله الا الله  \n وان محمد رسول الله")

// * my input fields var
var inputName = document.getElementById("inputName");
var inputEmail = document.getElementById("inputEmail");
var inputNumber = document.getElementById("inputNumber");
var inputAddress = document.getElementById("inputAddress");
var inputGroup = document.getElementById("inputGroup");
var inputNotes = document.getElementById("inputNotes");
var inputImage = document.getElementById("inputImage");
var isFav = document.getElementById("is_fav");
var isEmerg = document.getElementById("is_emerg");

// * add and update buttons
var SubmitBtn = document.getElementById("submitContactBtn");
var updateContactBtn = document.getElementById("updateContactBtn");

// * form element
var form = document.getElementById("form");

// * contact card buttons
var favBtn = document.getElementById("favBtn");
var emergBtn = document.getElementById("emergBtn");
var updateBtn = document.getElementById("updateBtn");
var deleteBtn = document.getElementById("deleteBtn");

// * search bar element
var search = document.getElementById("search");

// ? contact card
var contactsCard = document.getElementById("contactsCard");
// * fav & emergency contacts
var favContactsCounts = document.getElementById("favCounts");
var emergContactsCount = document.getElementById("emergCounts");

// * contacts arrays declaration
var contactsList;
var favoriteList;
var emergencyList;
var searchList;
//  * arrays iterators
var i;
var F;
var E;
var R;
var Up;

// ! array of contacts --------- ++ if in local , get it or empty array------------
contactsList = JSON.parse(localStorage.getItem("contacts")) || [];
favoriteList = JSON.parse(localStorage.getItem("favContacts")) || [];
emergencyList = JSON.parse(localStorage.getItem("emergContacts")) || [];
displayContact();
// ! number of contacts and type ------------------------------
function contactCount() {
  totalContacts.innerHTML = `${
    contactsList.length >= 1 ? contactsList.length : 0
  }`;
  emergContactsCount.innerHTML = `${
    emergencyList.length >= 1 ? emergencyList.length : 0
  }`;
  favContactsCounts.innerHTML = `${
    favoriteList.length >= 1 ? favoriteList.length : 0
  }`;
}

// ! get inputs from user------------------------------
function getInputs() {
  // ? add contact to array
  contactsList.push({
    Name: inputName.value,
    Number: inputNumber.value,
    Image: inputImage.value,
    Email: inputEmail.value,
    Address: inputAddress.value,
    Group: inputGroup.options[inputGroup.selectedIndex].text,
    Notes: inputNotes.value,
    Favorite: isFav.checked,
    Emergency: isEmerg.checked,
  });
  // ? add to favorite contacts
  if (isFav.checked == true) {
    favoriteList.push({
      Name: inputName.value,
      Number: inputNumber.value,
      Image: inputImage.value,
      Group: inputGroup.options[inputGroup.selectedIndex].text,
    });
  }
  // ? add to emergency contacts
  if (isEmerg.checked == true) {
    emergencyList.push({
      Name: inputName.value,
      Number: inputNumber.value,
      Image: inputImage.value,
      Group: inputGroup.options[inputGroup.selectedIndex].text,
    });
  }

  reset();
  //? display all contacts
  displayContact();

  // ? set contacts number in header
  contactCount();
  //? reset inputs value

  // ? save in local storage
  localStorage.setItem("contacts", JSON.stringify(contactsList));
  localStorage.setItem("favContacts", JSON.stringify(favoriteList));
  localStorage.setItem("emergContacts", JSON.stringify(emergencyList));
  Swal.fire({
    title: "Added",
    text: "contact has been added to your contact",
    icon: "success",
    timer: 2000,
  });
}

// ! display function  {display}-------------------------
function displayContact() {
  // ? add contact to favorite contact list

  if (favoriteList.length == 0) {
    console.log("no fav contact");
    favContacts.innerHTML = ` <div class="m-auto w-fit py-2 text-center">
                              <p class="my-4 fw-medium fs-sm text-body-tertiary">No favorites yet</p></div>`;
  } else {
    favContacts.innerHTML = ``;
   
   
    for (F = 0; F < favoriteList.length; F++) {
     var favFN ;
     var favLN ;
var favStr = []
if (favoriteList[F].Name.includes(" ") == true) {
  favStr = favoriteList[F].Name.split(" ")
  favFN = favStr[0].charAt(0).toUpperCase() 
  favLN = favStr[favStr.length - 1].charAt(0).toUpperCase()
}else{
  favFN = favoriteList[F].Name[0]
  favLN = favoriteList[F].Name[1]
}
      favContacts.innerHTML += `
        <div class="col">
          <div class="mb-2 fav-card bg-body-tertiary p-2 rounded-4 d-flex flex-row justify-content-between">
            <div class="rounded-4 bg d-flex  gap-2 align-items-center">
              <div class="fav-img  rounded-3 bg-main ">
                <!-- <img class="w-100 h-100 rounded-3 object-fit-contain" src="./Images/avatar-2.jpg" alt="hambozo"> -->
                <p class=" text-white text-center mt-1 mb-0 fs-5 fw-bold">${favFN + favLN}</p>
              </div>
              <div>
                <h6 class="mb-0 text-capitalize text-dark">${favoriteList[F].Name}</h6>
                <p class="mb-0 fs-sm text-body-tertiary fw-medium">${favoriteList[F].Number}</p>
              </div>
            </div>
            <div class="fav-contact rounded-3 bg-success-subtle text-success mt-1 h-fit p-2 fs-sm">
              <a class=" " href="tel:${favoriteList[F].Number}">
                <i class=" fa-solid  fa-phone"></i>
              </a>
            </div>
          </div>
        </div>
      `;
    }
  }
  // ? add contact to emergency contact list
  if (emergencyList.length == 0) {
    // console.log("no emergency contact");
    emergContacts.innerHTML = ` <div class="m-auto w-fit py-2 text-center">
                                <p class="my-4 fw-medium fs-sm text-body-tertiary">No emergency yet</p></div>`;
  } else {
    emergContacts.innerHTML = ``;
    for (E = 0; E < emergencyList.length; E++) {
   var EmergFN;
   var EmergLN;
   var strName = [];
      if (emergencyList[E].Name.includes(" ")) {
      strName =  emergencyList[E].Name.split(" ")
EmergFN = strName[0].charAt(0).toUpperCase() 
EmergLN = strName[strName.length - 1].charAt(0).toUpperCase() 
   }else{
 EmergFN = emergencyList[E].Name[0]
EmergLN = emergencyList[E].Name[1]

   }
      emergContacts.innerHTML += `
        <div class="col">
          <div class="mb-2 emerg-card bg-body-tertiary p-2 rounded-4 d-flex flex-row justify-content-between">
            <div class="rounded-4 bg d-flex  gap-2 align-items-center">
              <div class="fav-img rounded-3 bg-main ">
                <!-- <img class="w-100 h-100 rounded-3 object-fit-contain" src="./Images/avatar-2.jpg" alt="hambozo"> -->
                <p class=" text-white text-center mt-1 mb-0 fs-5 fw-bold">${ EmergFN + EmergLN}</p>
              </div>
              <div>
                <h6 class="mb-0 text-capitalize text-dark">${emergencyList[E].Name}</h6>
                <p class="mb-0 fs-sm text-body-tertiary fw-medium">${emergencyList[E].Number}</p>
              </div>
            </div>
            <div class="emerg-contact rounded-3 text-danger bg-danger-subtle mt-1 h-fit p-2 fs-sm">
              <a class="" href="tel:${emergencyList[E].Number}">
                <i class=" fa-solid  fa-phone"></i>
              </a>
            </div>
          </div>
        </div>
      `;
    }
  }
  
  // ? add contact to total contact list
  if (contactsList.length == 0) {
    console.log("no contact");
    contactsCard.innerHTML = `  <div class="empty d-flex flex-column mb-5 pb-5 justify-content-center align-items-center text-center  mt-5 pt-5 ">
                <p
                  class="p-3 rounded-3 fs-2 text-secondary text-opacity-25 
                    w-fit m-auto mb-2 text-center bg-body-secondary bg-opacity-50
                    d-flex justify-content-center align-items-center">
                          <i class="fa-solid fa-contact-book"></i>
                </p>
                <p class="mb-1 text-black text-opacity-50  fw-medium">No contacts found</p>
                <p class="mb-0 text-black fs-sm text-opacity-25 fw-medium">Click "Add Contact" to get started</p>
              </div>`;
  } else {
    contactsCard.innerHTML = ``;
    for (i = 0; i < contactsList.length; i++) {
      contactsCard.innerHTML += `<div class="col-12 col-md-6">
                <div class="card header-cards rounded-4 bg-white pt-3">
                  <div
                    class="card-title ps-3 gap-3 d-flex flex-row flex-nowrap justify-content-start align-items-center"
                  >
                    <figure
                      style="width: 60px"
                      class="mb-0 rounded-4 position-relative"
                    >
                      <div
                        class="spans-parent position-absolute w-100 top-0 bottom-0 text-end d-flex flex-column justify-content-between"
                        style="font-size: 8px"
                      >
                     <div class="position-relative w-100 h-100">
                        ${checkedFavSpan()}
                        ${checkedEmergSpan()}
                     </div>
                      </div>
                      <img
                        class="w-100 rounded-4 object-fit-cover"
                        src="./Images/avatar-2.jpg"
                        alt=""
                      />
                    </figure>
                    <div class="contact_name">
                      <h5 class="fs-6 fw-bold text-capitalize">${
                        contactsList[i].Name
                      }</h5>
                      <p class="mb-0 text-body-tertiary fw-medium">
                        <span
                          class="fs-xs text-primary bg-primary-subtle p-1 py-2 rounded-2 me-2"
                          ><i class="m-1 fa-solid fa-phone"></i></span
                        >${contactsList[i].Number}
                      </p>
                    </div>
                  </div>
                  <div class="card-body">
                    <p class="mb-2 text-body-secondary fw-normal">
                      <span
                        class="fs-xs text-main bg-main-subtle bg-opacity-10 p-2 rounded-2 me-2"
                        ><i class="fa-solid fa-envelope"></i></span
                      >${contactsList[i].Email}
                    </p>
                    <p class="mt-3 text-body-secondary fw-normal">
                      <span
                        class="text-success fs-xs bg-success bg-opacity-25 p-2 rounded-2 me-2"
                        ><i class="fa-solid fa-location-dot"></i></span
                      >${contactsList[i].Address}
                    </p>
                    <div class="labels fw-medium">
                   ${groupSpanSet()}
                   ${checkedEmergCardSpan()}    
                    </div>
                  </div>
                  <div
                    class="card-footer d-flex align-items-center justify-content-between py-3 bg-body-secondary bg-opacity-50"
                  >
                    <p class="d-flex align-items-center mb-0">
                      <span
                        class="text-success my-transition my-success-opacity fs-xs bg-success bg-opacity-25 p-2 rounded-2 me-2"
                        >
                        <a href="tel:${contactsList[i].Number}">
                        <i class="fa-solid fa-phone"></i>
                        </a>
                        </span>
                      <span
                        class="text-main fs-xs my-success-opacity bg-main-subtle p-2 rounded-2 me-2"
                        >
                        <a href="mailto:${contactsList[i].Email}">
                        <i class="fa-solid fa-envelope"></i>
                        </a>
                      </span>
                    </p>
                    <div class="card-buttons"> 
                      <!--  favorite button-->
                    ${isInFav(i)}
                      <!--  emergency button-->
                      ${isInEmerg(i)}
                      <!--  update button-->
                      <button data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick='updateContact(${i})'
                        class="btn update-btn my-transition fs-sm p-2 rounded-2 me-2 text-secondary bg-body-secondary bg-opacity-25"><i
                          class="fa-solid fa-pencil"></i>
                      </button>

                      <!-- delete button-->
                      <button  type="submit" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Tooltip on bottom" onclick='deleteContact(${i})' data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="ffffff" 
                        class="btn delete-btn fs-sm  p-2 rounded-2 me-2 shadow-none text-secondary bg-body-secondary bg-opacity-25 ">
                        <i class="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>`;
    }
    console.log(`added successfully and have ${contactsList.length} contacts `);
  }
  allContacts.innerHTML = `${contactsList.length} `;
  contactCount();
}

//   ! make inputs value empty {reset}------------------------------
function reset() {
  inputName.value = "";
  inputEmail.value = "";
  inputNumber.value = "";
  inputAddress.value = "";
  inputGroup.selectedIndex = 0;
  inputNotes.value = "";
  inputImage.value = "";
  search.value = "";
  isFav.checked = false;
  isEmerg.checked = false;
  contactsList.innerHTML = ``;

  inputsArray = [inputName, inputEmail, inputNumber];
  for (var arr = 0; arr < inputsArray.length; arr++) {
    inputsArray[arr].classList.contains("is-valid")
      ? inputsArray[arr].classList.remove("is-valid")
      : 1;
  }
}

// ! set group span in html ------------------------------
function groupSpanSet() {
  var groupSpan;
  switch (contactsList[i].Group) {
    case "Family":
      groupSpan = ` <span
                        class="badge fw-medium text-primary bg-primary-subtle"
                        >Family</span
                      >`;
      break;
    case "Friends":
      groupSpan = `     <span
                        class="badge fw-medium text-success bg-success-subtle"
                        >Friends</span
                      > `;
      break;
    case "School":
      groupSpan = `    <span class="badge fw-medium bg-main-subtle text-main"
                        >Work</span
                      >  `;
      break;
    case "Work":
      groupSpan = `   <span
                        class="badge fw-medium text-warning bg-warning-subtle"
                        >School</span
                      >  `;
      break;
    case "Other":
      groupSpan = `   <span class="badge fw-medium text-dark bg-dark-subtle"
                        >Other</span
                      >  `;
      break;
    default:
      groupSpan = ` `;
  }
  return groupSpan;
}

// ! check if contact favorite set star in image------------------------------
function checkedFavSpan() {
  var favSpan;
  if (contactsList[i].Favorite == true) {
    favSpan = ` <span
    class="p-1 favorite-span w-fit position-absolute bg-warning border border-3 border-white rounded-circle"
    ><i class="fa-solid fa-star text-white"></i>
    </span> `;
  } else {
    favSpan = ``;
  }
  return favSpan;
}

// ! check if contact emergency set heart in image------------------------------
function checkedEmergSpan() {
  var emergSpan;
  if (contactsList[i].Emergency == true) {
    emergSpan = `<span class="p-1  emergency-span w-fit position-absolute  bg-emerg border border-3 border-white rounded-circle">
                        <i class="fa-solid fa-heart-pulse text-white"></i>
                  </span> `;
  } else {
    emergSpan = ``;
  }
  return emergSpan;
}

// ! check if contact emergency set span  in contact card------------------------------
function checkedEmergCardSpan() {
  var emergCardSpan;
  if (contactsList[i].Emergency == true) {
    emergCardSpan = `    <span class="badge fw-medium text-danger bg-danger-subtle"
                        ><i class="fa-solid fa-heart-pulse"></i> Emergency</span
                      > `;
  } else {
    emergCardSpan = ``;
  }
  return emergCardSpan;
}

// !search input function ------------------------------
function getSearch() {
  searchList = [];

  var numSearch = search.value;
  var nameSearch = search.value.toLowerCase();
  var emailSearch = search.value;
  for (var g = 0; g < contactsList.length; g++) {
    var j = contactsList[g].Name.toLowerCase();
    var AA = contactsList[g].Number;
    var QQ = contactsList[g].Email;
    if (j.includes(nameSearch) == true) {
      searchList.push(contactsList[g]);
    } else if (QQ.includes(emailSearch) == true) {
      searchList.push(contactsList[g]);
    } else if (AA.includes(numSearch) == true) {
      searchList.push(contactsList[g]);
    }
  }
  displaySearched();
  if (search.value.length == 0) {
    displayContact();
  }
}
// ! display searched contacts------------------------------
function displaySearched() {
  // ? add matched contact to total contact list
  if (searchList.length == 0) {
    contactsCard.innerHTML = `  <div class="empty d-flex flex-column mb-5 pb-5 justify-content-center align-items-center text-center  mt-5 pt-5 ">
                <p
                  class="p-3 rounded-3 fs-2 text-secondary text-opacity-25 
                    w-fit m-auto mb-2 text-center bg-body-secondary bg-opacity-50
                    d-flex justify-content-center align-items-center">
                          <i class="fa-solid fa-contact-book"></i>
                </p>
                <p class="mb-1 text-black text-opacity-50  fw-medium">No contacts match this (${search.value} )</p>
                <p class="mb-0 text-black fs-sm text-opacity-25 fw-medium">Click "Add Contact" to get started</p>
              </div>`;
  } else {
    for (i = 0; i < searchList.length; i++) {
      contactsCard.innerHTML = `<div class="col-12 col-md-6">
                <div class="card header-cards rounded-4 bg-white pt-3">
                  <div
                    class="card-title ps-3 gap-3 d-flex flex-row flex-nowrap justify-content-start align-items-center"
                  >
                    <figure
                      style="width: 60px"
                      class="mb-0 rounded-4 position-relative"
                    >
                      <div
                        class="spans-parent position-absolute w-100 top-0 bottom-0 text-end d-flex flex-column justify-content-between"
                        style="font-size: 8px"
                      >
                     <div class="position-relative w-100 h-100">
                        ${checkedFavSpan()}
                        ${checkedEmergSpan()}
                     </div>
                      </div>
                      <img
                        class="w-100 rounded-4 object-fit-cover"
                        src="./Images/avatar-2.jpg"
                        alt=""
                      />
                    </figure>
                    <div class="contact_name">
                      <h5 class="fs-6 fw-bold text-capitalize">${
                        searchList[i].Name
                      }</h5>
                      <p class="mb-0 text-body-tertiary fw-medium">
                        <span
                          class="fs-xs text-primary bg-primary-subtle p-1 py-2 rounded-2 me-2"
                          ><i class="m-1 fa-solid fa-phone"></i></span
                        >${searchList[i].Number}
                      </p>
                    </div>
                  </div>
                  <div class="card-body">
                    <p class="mb-2 text-body-secondary fw-normal">
                      <span
                        class="fs-xs text-main bg-main-subtle bg-opacity-10 p-2 rounded-2 me-2"
                        ><i class="fa-solid fa-envelope"></i></span
                      >${searchList[i].Email}
                    </p>
                    <p class="mt-3 text-body-secondary fw-normal">
                      <span
                        class="text-success fs-xs bg-success bg-opacity-25 p-2 rounded-2 me-2"
                        ><i class="fa-solid fa-location-dot"></i></span
                      >${searchList[i].Address}
                    </p>
                    <div class="labels fw-medium">
                   ${groupSpanSet()}
                   ${checkedEmergCardSpan()}    
                    </div>
                  </div>
                  <div
                    class="card-footer d-flex align-items-center justify-content-between py-3 bg-body-secondary bg-opacity-50"
                  >
                    <p class="d-flex align-items-center mb-0">
                      <span href="tel:${searchList[i].Number}"
                        class="text-success my-transition my-success-opacity fs-xs bg-success bg-opacity-25 p-2 rounded-2 me-2"
                        ><i class="fa-solid fa-phone"></i
                      ></span>
                      <span
                        class="text-main fs-xs my-success-opacity bg-main-subtle p-2 rounded-2 me-2"
                        >
                        <a href="mailto:${contactsList[i].Email}">
                        <i class="fa-solid fa-envelope"></i>
                        </a>
                      </span>
                    </p>
                   <div class="card-buttons"> 
                    <!--  favorite button-->
                        ${isInFav(i)}
                      <!--  emergency button-->
                      ${isInEmerg(i)}
              
                      <!--  update button-->
                      <button data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick='updateContact(${i})'
                        class="btn update-btn my-transition fs-sm p-2 rounded-2 me-2 text-secondary bg-body-secondary bg-opacity-25"><i
                          class="fa-solid fa-pencil"></i>
                      </button>

                      <!-- delete button-->
                      <button  type="submit" onclick='deleteContact(${i})' 
                        class="btn delete-btn fs-sm  p-2 rounded-2 me-2 shadow-none text-secondary bg-body-secondary bg-opacity-25 ">
                        <i class="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>`;
    }
    console.log("those are searched contacts");
  }
  contactCount();
}
// ! regex checker function ------------------------------
function checkRegex(element) {
  var regexx = {
    inputName: /^([A-Z]{1}[ ]{0,1}|[a-z]{1}[ ]{0,1}){2,50}$/g,
    inputNumber: /^01[0|1|2|5]\d{8}$/,
    inputEmail: /^[A-Z0-9]{2,20}@[A-Z]{2,10}\.(com|net)$/i,
  };

  var isInputValid = regexx[element.id].test(element.value);
  console.log(` this is a valid ${element.id}`);
  if (isInputValid == false) {
    element.classList.add("is-invalid");
    element.nextElementSibling.classList.remove("d-none");
    console.log("wrong data");
    // continue
  } else if (isInputValid == true) {
    console.log("right data");
    element.classList.contains("is-invalid")
      ? element.classList.remove("is-invalid")
      : console.log("is invalid not found ");
    element.classList.add("is-valid");
    element.nextElementSibling.classList.add("d-none");
    // continue
  }
}

// ! is Valid Inputs checkers ------------------------------
function isValidInputs() {
  var inputsArray = [inputName, inputEmail, inputNumber];
  var z = 0;
  for (let ar = 0; ar < inputsArray.length; ar++) {
    inputsArray[ar].classList.contains("is-valid") ? z++ : 1;
  }

  checkData(z);
  reset();
}
// ! delete contact function------------------------------
function deleteContact(i) {
  // *delete from fav

  Swal.fire({
    title: "Delete Contact?",
    text: `Are you sure you want to delete ${contactsList[i].Name} ? This action cannot be undone.`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "rgba(111, 111, 111, 1)",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      for (let L = 0; L < favoriteList.length; L++) {
        if (contactsList[i].Name == favoriteList[L].Name) {
          favoriteList.splice(L, 1);
        } else {
          console.log("contact no in fav :", F);
        }
      }
      // ? save in local storage
      localStorage.setItem("favContacts", JSON.stringify(favoriteList));

      // *delete from emergency
      for (let U = 0; U < emergencyList.length; U++) {
        if (contactsList[i].Name == emergencyList[U].Name) {
          emergencyList.splice(U, 1);
        } else {
          console.log("contact is not in emergency : ", U);
        }
      }
      // ? save new emergency in local storage
      localStorage.setItem("emergContacts", JSON.stringify(emergencyList));

      // * sweet alert
      Swal.fire({
        title: "Deleted!",
        text: `Your ${contactsList[i].Name} has been deleted.`,
        icon: "success",
        timer: 2000,
      });
    }
  });

  // *delete from all contacts

  console.log("old length : ", contactsList.length);
  contactsList.splice(i, 1);
  console.log("delete me plz");
  console.log("new length : ", contactsList.length);

  // ? save in local storage
  localStorage.setItem("contacts", JSON.stringify(contactsList));
  contactsCard.innerHTML = ` `;
  emergContacts.innerHTML = ` `;
  favContacts.innerHTML = ` `;
  // ? display again

  displayContact();
}

// ! update contact function------------------------------
function updateContact(i) {
  showUpdateBtn();
  console.log("this element index", i);
  // * set inputs value as contact values
  inputName.value = contactsList[i].Name;
  inputEmail.value = contactsList[i].Email;
  inputNumber.value = contactsList[i].Number;
  inputAddress.value = contactsList[i].Address;
  inputGroup.value = contactsList[i].Group;
  inputNotes.value = contactsList[i].Notes;
  inputImage.value = contactsList[i].Image;
  isFav.checked = contactsList[i].Favorite;
  isEmerg.checked = contactsList[i].Emergency;
  // *  let inputs values valid
  inputName.classList.add("is-valid");
  inputEmail.classList.add("is-valid");
  inputNumber.classList.add("is-valid");
  Up = i;
}

// ! toggle update and submit buttons --------------------------------------
function showSubmitBtn() {
  reset();
  if (SubmitBtn.classList.contains("d-none")) {
    SubmitBtn.classList.remove("d-none");
  }
  if (updateContactBtn.classList.contains("d-none") == false) {
    updateContactBtn.classList.add("d-none");
  }
}
// ! toggle update and submit buttons --------------------------------------
function showUpdateBtn() {
  if (updateContactBtn.classList.contains("d-none")) {
    updateContactBtn.classList.remove("d-none");
  }
  if (SubmitBtn.classList.contains("d-none") == false) {
    SubmitBtn.classList.add("d-none");
  }
}

// ! get input when all data is valid----------
function checkData(z) {
  if (contactsList.length > 0) {
    for (i = 0; i < contactsList.length; i++) {
      if (inputNumber.value == contactsList[i].Number) {
     Swal.fire({
  title: "Duplicate Phone Number",
  text: `A contact with this phone number already exists: ${contactsList[i].name}`,
  icon: "error"
});
displayContact()

      } else {
        z == 3 ? getInputs() : alert("you entered an inValid data to add ");
      }
    }
  } else {
    z == 3 ? getInputs() : alert("you entered an inValid data to add ");
  }
}

// ! get new contact data function--------------
function saveNewContact() {
  // * update in all contacts
  contactsList[Up].Name = inputName.value;
  contactsList[Up].Email = inputEmail.value;
  contactsList[Up].Number = inputNumber.value;
  contactsList[Up].Address = inputAddress.value;
  contactsList[Up].Group = inputGroup.options[inputGroup.selectedIndex].text;
  contactsList[Up].Notes = inputNotes.value;
  contactsList[Up].Image = inputImage.value;
  contactsList[Up].Favorite = isFav.checked;
  contactsList[Up].Emergency = isEmerg.checked;

  // * update in favorite list
  UpdateFavList(Up);

  // * update in emergency list
  UpdateEmergList(Up);

  // ? save updated lists in local storage
  localStorage.setItem("contacts", JSON.stringify(contactsList));
  localStorage.setItem("favContacts", JSON.stringify(favoriteList));
  localStorage.setItem("emergContacts", JSON.stringify(emergencyList));

  displayContact();
  reset();
  Swal.fire({
    title: "Updated",
    text: "contact has been updated succesfully",
    icon: "success",
    timer: 2000,
  });
}

// ! check where is contact in fav
function UpdateFavList(Up) {
  if (favoriteList.length == 0 && isFav.checked == true) {
    favoriteList.push({
      Name: inputName.value,
      Number: inputNumber.value,
      Image: inputImage.value,
      Group: inputGroup.options[inputGroup.selectedIndex].text,
    });
  } else if (favoriteList.length > 0) {
    for (let BB = 0; BB < favoriteList.length; BB++) {
      if (
        favoriteList[BB].Name == contactsList[Up].Name &&
        isFav.checked == false
      ) {
        favoriteList.splice(BB, 1);
      } else if (
        favoriteList[BB].Name == contactsList[Up].Name &&
        isFav.checked == true
      ) {
        favoriteList[BB].Name = inputName.value;
        favoriteList[BB].Email = inputEmail.value;
        favoriteList[BB].Number = inputNumber.value;
        favoriteList[BB].Group =
          inputGroup.options[inputGroup.selectedIndex].text;
        favoriteList[BB].Image = inputImage.value;
      }
    }
  }
  localStorage.setItem("favContacts", JSON.stringify(favoriteList));
}
// ! check where is contact in emerg
function UpdateEmergList(Up) {
  if (emergencyList.length == 0 && isEmerg.checked == true) {
    emergencyList.push({
      Name: inputName.value,
      Number: inputNumber.value,
      Image: inputImage.value,
      Group: inputGroup.options[inputGroup.selectedIndex].text,
    });
  } else if (emergencyList.length > 0) {
    for (let EE = 0; EE < emergencyList.length; EE++) {
      if (
        emergencyList[EE].Name == contactsList[Up].Name &&
        isEmerg.checked == false
      ) {
        emergencyList.splice(EE, 1);
      } else if (
        emergencyList[EE].Name == contactsList[Up].Name &&
        isEmerg.checked == true
      ) {
        emergencyList[EE].Name = inputName.value;
        emergencyList[EE].Email = inputEmail.value;
        emergencyList[EE].Number = inputNumber.value;
        emergencyList[EE].Group =
          inputGroup.options[inputGroup.selectedIndex].text;
        emergencyList[EE].Image = inputImage.value;
      }
    }
  }
  localStorage.setItem("emergContacts", JSON.stringify(emergencyList));
}
// ! function to add contact to fav list
function makeFav(i) {
  contactsList[i].Favorite = true;
  favoriteList.push({
    Name: contactsList[i].Name,
    Number: contactsList[i].Number,
    Image: contactsList[i].Image,
    Group: contactsList[i].Group,
  });
  displayContact();
}
// ! function to add contact to emerg list
function makeEmerg(i) {
  contactsList[i].Emergency = true;
  emergencyList.push({
    Name: contactsList[i].Name,
    Number: contactsList[i].Number,
    Image: contactsList[i].Image,
    Group: contactsList[i].Group,
  });

  displayContact();
}
// ! function to remove contact from fav list
function makeNotFav(i) {
  contactsList[i].Favorite = false;

  for (let ED = 0; ED < favoriteList.length; ED++) {
    if (favoriteList[ED].Name == contactsList[i].Name) {
      favoriteList.splice(ED, 1);
    } else if (favoriteList[ED].Name != contactsList[i].Name) {
      console.log("not in this fav  index : ");
    }
  }

  displayContact();
}
// ! function to remove contact from emerg list
function makeNotEmerg(i) {
  contactsList[i].Emergency = false;
  for (let EDD = 0; EDD < emergencyList.length; EDD++) {
    if (emergencyList[EDD].Name == contactsList[i].Name) {
      emergencyList.splice(EDD, 1);
    } else if (emergencyList[EDD].Name != contactsList[i].Name) {
      console.log("not in this Emerg index : ");
    }
  }
  displayContact();
}

// ! toggle btn that make card in fav list
function isInFav(i) {
  var btnToToggleFav;
  if (favoriteList.length == 0) {
    btnToToggleFav = ` 
    <!-- add to favorite button-->
      <button onclick='makeFav(${i})'
        class="btn trash-btn toggle-not-fav rounded-2 fs-sm p-2 me-2 my-transition shadow-none  text-secondary ">
        <i class="fa-regular fa-star"></i>
      </button> `;
  } else if (favoriteList.length > 0) {
    // for (let WW = 0; WW < favoriteList.length; WW++) {
    //   if (contactsList[i].Name == favoriteList[WW].Name) {
    // console.log( 'favoriteList.length : and it in fav list ',favoriteList.length);

    //     btnToToggleFav = `
    //     <button onclick='makeNotFav(${i})'
    //       class="btn  toggle-if-fav rounded-2 fs-sm p-2 me-2 my-transition shadow-none ---- text-warning bg-warning bg-opacity-10 ">
    //       <i class="fa-solid fa-star"></i>
    //     </button>`;
    //   } else if (contactsList[i].Name != favoriteList[WW].Name) {
    // console.log( 'favoriteList.length : and it not in fav  ',favoriteList.length);

    //     btnToToggleFav = `
    //       <button onclick='makeFav(${i})'
    //         class="btn trash-btn toggle-not-fav rounded-2 fs-sm p-2 me-2 my-transition shadow-none  text-secondary ">
    //         <i class="fa-regular fa-star"></i>
    //       </button> `;
    //   }
    // }
    if (contactsList[i].Favorite == true) {
      btnToToggleFav = `
        <button onclick='makeNotFav(${i})'
          class="btn  toggle-if-fav rounded-2 fs-sm p-2 me-2 my-transition shadow-none ---- text-warning bg-warning bg-opacity-10 ">
          <i class="fa-solid fa-star"></i>
        </button>`;
    } else if (contactsList[i].Favorite == false) {
      btnToToggleFav = `
          <button onclick='makeFav(${i})'
            class="btn trash-btn toggle-not-fav rounded-2 fs-sm p-2 me-2 my-transition shadow-none  text-secondary ">
            <i class="fa-regular fa-star"></i>
          </button> `;
    }
  }
  return btnToToggleFav;
}

// ! toggle btn that make card in emer list
function isInEmerg(i) {
  var btnToToggleEmerg;
  if (emergencyList.length == 0) {
    btnToToggleEmerg = `
      <button onclick='makeEmerg(${i})'
        class="btn toggle-not-emerg  fs-sm p-2 rounded-2 me-2  text-secondary"><i
        class="fa-solid fa-heart-pulse"></i>
      </button> `;
  } else if (emergencyList.length > 0) {
    // for (let QQ = 0; QQ < emergencyList.length; QQ++) {
    //   if (contactsList[i].Name == emergencyList[QQ].Name) {
    //     btnToToggleEmerg = `
    //      <button onclick='makeNotEmerg(${i})'
    //       class="btn  toggle-if-emerg fs-sm p-2 rounded-2 me-2  text-danger bg-danger bg-opacity-10"><i
    //         class="fa-solid fa-heart-pulse"></i>
    //     </button> `;
    //   } else if (contactsList[i].Name != emergencyList[QQ].Name) {
    //     btnToToggleEmerg = `
    //       <button onclick='makeEmerg(${i})'
    //         class="btn toggle-not-emerg  fs-sm p-2 rounded-2 me-2  text-secondary"><i
    //         class="fa-solid fa-heart-pulse"></i>
    //       </button> `;
    //   }
    // }
    if (contactsList[i].Emergency == true) {
      btnToToggleEmerg = `
         <button onclick='makeNotEmerg(${i})'
          class="btn  toggle-if-emerg fs-sm p-2 rounded-2 me-2  text-danger bg-danger bg-opacity-10"><i
          class="fa-solid fa-heart-pulse"></i>
        </button> `;
    } else if (contactsList[i].Emergency == false) {
      btnToToggleEmerg = ` 
      <button onclick='makeEmerg(${i})'
        class="btn toggle-not-emerg  fs-sm p-2 rounded-2 me-2  text-secondary"><i
        class="fa-solid fa-heart-pulse"></i>
      </button> `;
    }
  }
  return btnToToggleEmerg;
}

async function getUserName() {
  const { value: userName } = await Swal.fire({
    title: "plz Enter Your First Name",
    input: "text",
    inputPlaceholder: "Enter your First Name"
  });
  if (userName) {
    Swal.fire(`hello my dear ${userName}`);
    var userRegex = /^[A-Z0-9ء-ي]{1,10}$/i ; 
    if (userRegex.test(userName)) {
      myUser.innerHTML = `${userName}` 
    }else{
    Swal.fire("استغفر الله العظيم");
    }
  }
}



// ! set the time of add contact in the card

// function name(params) {
//   var date = new Date();
//   var minutes = date.getMinutes();
//   console.log("minutes : ", minutes);
//   var hour = date.getHours();
//   console.log("hour : ", hour);
//   var year = date.getFullYear();
//   console.log("year : ", year);
//   var month = date.getMonth(); // beware: January = 0; February = 1, etc.
//   console.log("month : ", month);
//   var day = date.getDate();
//   console.log("day : ", day);
//   var dayOfWeek = date.getDay(); // Sunday = 0, Monday = 1, etc.
//   var milliSeconds = date.getMilliseconds();
//   console.log(date);
// }

// var sr = 16841 ;
// console.log(typeof(contactsList[0].Number) , contactsList[0].Email.toLowerCase() );
// console.log( 'old sr : ',sr);
// var dd = sr.toLowerCase()
// console.log( 'new sr : ',sr);
// console.log( 'dd for new sr : ',dd);
