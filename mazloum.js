
function toggleMenu() {
  document.getElementById("menu").classList.toggle("show");
}

function toggleTipp(event) {
  event.preventDefault();
  document.getElementById("tippMenu").classList.toggle("show");
}


function showTvMessage(event) {
  event.preventDefault();

  Swal.fire({
    title: "Velkommen til Mazloum online-TV",
    text: "Arabiske / Norske kanaler",
    width:400,
    imageUrl: "../image/mazlogo.png",
    imageWidth: 200,
    imageHeight: 200,
    imageAlt: "TV"
  }).then(() => {
    window.location.href = "../tv/tv.html";
  });
}