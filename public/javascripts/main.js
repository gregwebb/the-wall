
window.onload = function set() {
available = document.querySelectorAll(".action-button-comment");
available.forEach(function (el) {
  el.addEventListener("click", setForm);
});
}

let i=0;
function setForm(button) {
let postId = button.target.name;
 var f = document.getElementById(postId);
 i++;
 if (i===1) {
setForm(button);
}
else {
    i===0;
}
 if (f.style.display === "none") {
   f.style.display = "block";
   } else {
      f.style.display = "none";
    }
}   

function showForm() {
    var f = document.getElementById("edit-post");
    if (f.style.display === "none") {
      f.style.display = "block";
    } else {
      f.style.display = "none";
    }
  }