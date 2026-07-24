fetch("bilder.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })

  .then((jsonData) => {
    const channelList = document.getElementById("channels");
    const video = document.getElementById("video");
    const channelName = document.getElementById("channelName");

    const playerEl = document.getElementById("player");

    let hls;

    

    /* --------------------------------------------------------------*/

    jsonData.forEach((channel) => {
      const div = document.createElement("div");
      div.className = "channel";
      div.innerText = channel.name;
      div.innerHTML = `<img src="${channel.icon}" class="channel-icon">${channel.name}`;
      div.onclick = () => {
        playStream(channel.url, channel.name, channel.type, channel.icon);
      };

      channelList.appendChild(div);

      function playStream(url, name, type,icon) {
        channelName.innerHTML = `<img src="${icon}" class="player-icon">${name}`;

        const ytPlayer = document.getElementById("ytPlayer");

        // Skjul begge to
        video.style.display = "none";
        ytPlayer.style.display = "none";

        

        if (type === "youtube") {
          // Stopp iptv video
          video.pause();
          video.removeAttribute("src");
          video.load();

          if (hls) {
            hls.destroy();
          }

          ytPlayer.style.display = "block";

          
          ytPlayer.src = "";
          ytPlayer.src = `https://www.youtube.com/embed/${url}?autoplay=1`;
        } else {
          ytPlayer.src = "";

          video.style.display = "block";

          if (hls) {
            hls.destroy();
          }

          if (Hls.isSupported()) {
            hls = new Hls({
              enableWorker: true,
              lowLatencyMode: true,
            });

            hls.loadSource(url);
            hls.attachMedia(video);
          } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
            video.src = url;
          }

          
        }
        hls.on(Hls.Events.ERROR, function(event, data) {
    console.log("HLS ERROR:", data);
});

        if (video.canPlayType("application/vnd.apple.mpegurl")) {
               video.src = url;
                video.play();
          } else if (Hls.isSupported()) {
          hls = new Hls();
          hls.loadSource(url);
          hls.attachMedia(video);
          }
      }
      
    });

    /* --------------------------------------------------------------*/

    function updateClock() {
      const now = new Date();
      const display = now.toLocaleTimeString();
      document.getElementById("clock").textContent = display;
    }

    // Oppdater klokken hvert sekund
    setInterval(updateClock, 1000);

    // Initialiser umiddelbart
    updateClock();
  });

/* --------------------------------------------------------------*/

function tilbake() {
  window.location.href = "index.html";
}

/* --------------------------------------------------------------*/
