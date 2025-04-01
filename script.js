document.addEventListener("DOMContentLoaded", function () {
  const menuLinks = document.querySelectorAll(".menu a");
  const mainContent = document.getElementById("main-content");

  menuLinks.forEach(link => {
      link.addEventListener("click", function (event) {
          event.preventDefault(); // Ngăn chuyển trang
          const page = this.getAttribute("data-target") + ".html";

          // Xóa class active khỏi tất cả menu
          menuLinks.forEach(l => l.classList.remove("active"));
          this.classList.add("active");

          // Load trang con bằng Fetch API
          fetch("pages/" + page)
              .then(response => response.text())
              .then(html => {
                  mainContent.innerHTML = html;
              })
              .catch(error => console.log("Lỗi tải trang:", error));
      });
  });

  // Mặc định load trang home
  fetch("pages/home.html")
      .then(response => response.text())
      .then(html => {
          mainContent.innerHTML = html;
      });
});


function playSong(audioSrc, songTitle) {
  // Dừng tất cả các audio đang phát
  document.querySelectorAll('audio').forEach(audio => {
    audio.pause();
    audio.currentTime = 0;
  });

  // Tạo hoặc sử dụng phần tử audio đã có sẵn
  let audioPlayer = document.getElementById('audio-player');
  if (!audioPlayer) {
    audioPlayer = document.createElement('audio');
    audioPlayer.id = 'audio-player';
    document.body.appendChild(audioPlayer);
  }

  // Đặt nguồn âm thanh và phát
  audioPlayer.src = audioSrc;
  audioPlayer.play();

  // Hiển thị thanh điều khiển
  const audioPlayerContainer = document.querySelector('.audio-player');
  audioPlayerContainer.style.display = 'block'; // Hiển thị thanh điều khiển

  // Cập nhật thông tin bài hát đang phát
  const nowPlayingInfo = document.getElementById('song-title');
  if (nowPlayingInfo) {
    nowPlayingInfo.textContent = songTitle;  // Cập nhật tên bài hát
  }

  // Xử lý khi bài hát kết thúc
  audioPlayer.addEventListener('ended', () => {
    audioPlayerContainer.style.display = 'none'; // Ẩn thanh điều khiển khi bài hát kết thúc
    console.log('Bài hát đã kết thúc.');
  });
}

// Dừng bài hát
function pauseSong() {
  let audioPlayer = document.getElementById('audio-player');
  if (audioPlayer) {
    audioPlayer.pause();
    document.querySelector('.audio-player').style.display = 'none'; // Ẩn thanh khi dừng nhạc
  }
}



