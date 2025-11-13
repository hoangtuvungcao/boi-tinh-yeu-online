document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('nav a[data-target]');
  const pages = document.querySelectorAll('.page');
  const resultDiv = document.getElementById('result');
  const audio = document.getElementById('bgMusic');
  let audioStarted = false;

  const messages = [
    'Hai bạn sinh ra là để ở bên nhau! 💘',
    'Tình cảm cần thêm chút thời gian vun đắp nhé! 🌸',
    'Một chút duyên, một chút nợ – hãy trân trọng nhau hơn! 💞',
    'Tình bạn hay tình yêu? Hãy để con tim trả lời! 💗'
  ];

  function activatePage(pageId) {
    pages.forEach((page) => {
      page.classList.toggle('active', page.id === pageId);
    });

    navLinks.forEach((link) => {
      link.classList.toggle('active', link.dataset.target === pageId);
    });
  }

  function startAudio() {
    if (!audio || audioStarted) return;

    const playPromise = audio.play();
    if (playPromise && typeof playPromise.then === 'function') {
      playPromise
        .then(() => {
          audioStarted = true;
        })
        .catch(() => {
          // trình duyệt chặn autoplay – sẽ thử lại sau tương tác khác.
        });
    } else {
      audioStarted = true;
    }
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const targetPage = link.dataset.target;
      if (targetPage) {
        activatePage(targetPage);
      }
      startAudio();
    });
  });

  document.body.addEventListener(
    'pointerdown',
    () => {
      startAudio();
    },
    { once: true }
  );

  // thử phát nhạc ngay khi trang tải xong; nếu bị chặn sẽ thử lại khi người dùng tương tác.
  startAudio();

  window.loveCalculate = function loveCalculate() {
    const name1 = document.getElementById('name1').value.trim();
    const name2 = document.getElementById('name2').value.trim();

    if (!name1 || !name2) {
      resultDiv.textContent = 'Hãy nhập đầy đủ tên của cả hai nhé! 💕';
      return;
    }

    const combined = `${name1.toLowerCase()}${name2.toLowerCase()}`;
    let hash = 0;

    for (let i = 0; i < combined.length; i += 1) {
      hash = (hash + combined.charCodeAt(i) * (i + 1)) % 101;
    }

    const score = hash === 0 ? 1 : hash; // đảm bảo không ra 0%
    const message = messages[score % messages.length];
//phần cũ
    resultDiv.innerHTML = `
      💕 Độ hợp giữa <b>${name1}</b> và <b>${name2}</b> là
      <span style="color:#e91e63">${score}%</span> 💕<br>${message}
    `;
//
    resultDiv.innerHTML = `
      💕 Độ hợp giữa <b>${name1}</b> và <b>${name2}</b> là
      <span style="color:#e91e63">${score}%</span> 💕<br>${message}
    `;

    startAudio();
  };

  function createHeart() {
    const heartsContainer = document.querySelector('.hearts');
    if (!heartsContainer) return;

    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.animationDuration = `${4 + Math.random() * 4}s`;
    heartsContainer.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 7000);
  }

  setInterval(createHeart, 800);
});