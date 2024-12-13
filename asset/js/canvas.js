// 캔버스 및 이미지 설정 함수
function setupCanvas(canvasId, imagePath, totalImages) {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext('2d');
  const images = [];
  let currentIndex = 0;

  // 이미지 로드 함수
  function preloadImages() {
    let loadedImagesCount = 0;

    for (let i = 0; i < totalImages; i++) {
      const img = new Image();
      img.src = `${imagePath}/${String(i).padStart(3, '0')}.webp`;
      images.push(img);

      img.onload = () => {
        loadedImagesCount++;
        if (loadedImagesCount === totalImages) {
          updateImage();
        }
      };
    }
  }

  // 이미지 업데이트 함수
  function updateImage() {
    if (!images[currentIndex]) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const img = images[currentIndex];
    const imgRatio = img.width / img.height;

    let newWidth = canvas.width;
    let newHeight = canvas.width / imgRatio;

    if (newHeight > canvas.height) {
      newHeight = canvas.height;
      newWidth = canvas.height * imgRatio;
    }

    const offsetX = (canvas.width - newWidth) / 2;
    const offsetY = (canvas.height - newHeight) / 2;

    ctx.drawImage(img, offsetX, offsetY, newWidth, newHeight);
  }
  // 외부 접근 반환 함수
  return {
    preloadImages,
    updateImage,
    setCurrentIndex(index) {
      currentIndex = index;
      updateImage();
    }
  };
}

const seq1 = setupCanvas('seq1Canvas', './asset/images/webp/seq1', 181);
const seq2 = setupCanvas('seq2Canvas', './asset/images/webp/seq2', 141);

// 이미지 호출
seq1.preloadImages();
seq2.preloadImages();





// const canvas = document.querySelector('#canvas');
// const ctx = canvas.getContext('2d');

// canvas.width = 1004;
// canvas.height = 1214;

// const frameCount = 45;

// const currentFrame = (idx) => {
//   return `https://www.apple.com/105/media/us/airpods-max/2020/996b980b-3131-44f1-af6c-fe72f9b3bfb5/anim/turn/large/large_${idx.toString().padStart(4, '0')}.jpg`;
// }; // 리턴 필수

// const images = [];
// const card = {
//   frame: 0,
// };

// for (let i = 0; i < frameCount; i++) {
//   const img = new Image();
//   img.src = currentFrame(i + 1);
//   images.push(img);
// }

// gsap.to(card, {
//   frame: frameCount - 1,
//   snap: 'frame',
//   ease: 'none',
//   scrollTrigger: {
//     trigger: '.canvas-area',
//     scrub: 1,
//     start: 'top top',
//     end: 'bottom center',
//     // pin: true,
//     // markers: true
//   },
//   onUpdate: render,
//   // duration: 4,
// });

// images[0].onload = render;

// function render() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   ctx.drawImage(images[card.frame], 0, 0);
// }