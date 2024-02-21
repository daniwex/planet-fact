let mobileNav = document.querySelector('.mobile-nav-list')
let openbtn = document.getElementById('open-nav')
console.log(openbtn)
mobileNav.style.display = "none"
openbtn.addEventListener('click', ()=>{
  mobileNav.style.display = "block"
  console.log(true)
})

let planetModes = Array.from(document.querySelectorAll(".planet-mode"));
let planetText = Array.from(
  document.querySelectorAll(".planet-text")[0].children
);
let planetImage = document.getElementsByClassName("planet-image")[0].children;
let test;
let classname = planetModes
  .map((element) => element.getAttribute("class"))
  .filter((element) => element.startsWith("active"));
classname = classname[0].split(" ")[0];
let planetName = classname.split("-")[1];
if (window.innerWidth <= 600) {
  planetModes.forEach(
    (element) =>
      (element.children[1].innerText =
        element.children[1].innerText.split(" ").length == 1
          ? element.children[1].innerText.split(" ")[0]
          : element.nextElementSibling === null
          ? element.children[1].innerText.split(" ")[0]
          : element.children[1].innerText.split(" ")[1])
  );
}
planetModes.forEach((element) => {
  element.addEventListener("click", (e) => {
    removeClass(planetModes, classname);
    element.classList.add(classname);
    test = element.children[1].innerText.slice().toLowerCase();
    if (test == "internal structure" || test == "structure") {
      let el = planetText.filter((element) => element.dataset.item == "2")[0];
      addClassFormatted(planetText, "hidden", el);
      let parent = planetImage[0].parentElement;
      planetImage[0].src = `./assets/planet-${planetName}-internal.svg`;
      if (parent.children.length > 1) {
        parent.removeChild(parent.children[1]);
      }
    }
    if (test == "overview") {
      let el = planetText.filter((element) => element.dataset.item == "1")[0];
      addClassFormatted(planetText, "hidden", el);
      let parent = planetImage[0].parentElement;
      planetImage[0].src = `./assets/planet-${planetName}.svg`;
      if (parent.children.length > 1) {
        parent.removeChild(parent.children[1]);
      }
    }
    if (test == "surface geology" || test == "surface") {
      let el = planetText.filter((element) => element.dataset.item == "3")[0];
      addClassFormatted(planetText, "hidden", el);
      planetImage[0].src = `./assets/planet-${planetName}.svg`;
      let parent = planetImage[0].parentElement;
      if(parent.children.length > 1){
        return
      }
      let image = document.createElement("img");
      let properties = {
        position: "absolute",
        left: "50%",
        width: "130px",
        height: "158px",
        bottom: "0",
      };
      image.src = `./assets/geology-${planetName}.png`;
      image.style.position = properties.position;
      image.style.left = properties.left;
      image.style.width = properties.width;
      image.style.height = properties.height;
      image.style.bottom = properties.bottom;
      image.style.transform =
        planetName == "saturn"
          ? "translateX(-50%) translateY(clamp(-100%,17%, 80%))"
          : "translateX(-50%) translateY(50%)";
      parent.appendChild(image);
    }
  });
});

function removeClass(array, item) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].classList.contains(item)) {
      array[i].classList.remove(item);
    }
  }
}

function addClassFormatted(array, classname, element) {
  element.classList.remove(classname);
  for (let i = 0; i < array.length; i++) {
    if (array[i] != element) {
      array[i].classList.add(classname);
    }
  }
}

