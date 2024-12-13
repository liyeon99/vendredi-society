gsap.defaults({
  ease: "none",
});
const lenis = new Lenis();

lenis.on("scroll", (e) => {
  console.log(e);
});

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
$(document).ready(function () {
  // 커서
  let mouseCursor = document.querySelector(".cursor");
  let links = document.querySelectorAll("a, button");

  // 목표
  let targetX = 0,
    targetY = 0;
  // 현재
  let currentX = 0,
    currentY = 0;
  const followSpeed = 0.1; // 커서 속도

  // 커서의 left값과 top값을 커서의 XY 좌표값과 일치시킴
  function cursor(e) {
    targetX = e.clientX;
    targetY = e.clientY;
  }

  // 마우스 이동 시 cursor 함수 호출
  window.addEventListener("mousemove", cursor);

  // 커서에 애니메이션 적용
  // https://developer.mozilla.org/ko/docs/Web/API/Window/requestAnimationFrame
  function animateCursor() {
    currentX += (targetX - currentX) * followSpeed;
    currentY += (targetY - currentY) * followSpeed;

    // 스크롤 위치를 포함하여 커서 위치를 설정
    mouseCursor.style.left = currentX + "px";
    mouseCursor.style.top = currentY + "px";

    // 반복
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // 링크 및 버튼 호버 효과
  links.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      mouseCursor.classList.add("cursor-hover");
    });
    link.addEventListener("mouseleave", () => {
      mouseCursor.classList.remove("cursor-hover");
    });
  });

  // header
  $(".btn-menu .open");

  $(".btn-menu .open").click(function (e) {
    $(".header").addClass("active");
    $(".header .group-sub").addClass("active");
    $("body").addClass("hidden");
  });

  $(".btn-menu .close").click(function (e) {
    $(".header .group-sub").removeClass("active");
    $(".header").removeClass("active");
    $("body").removeClass("hidden");
  });

  $(".sub-item a").click(function (e) {
    $(".header .group-sub").removeClass("active");
    $(".header").removeClass("active");
    $("body").removeClass("hidden");
  });

  gsap.set(".header .nav", { autoAlpha: 0 });
  gsap.set(".sc-intro .group-intro .headline .box", { yPercent: 100 });
  gsap.set(".sc-intro .group-intro .top-area .space img", { yPercent: -150 });
  ScrollTrigger.create({
    trigger: ".sc-intro",
    start: "-1% top",
    end: "bottom bottom",
    // markers:true,
    onEnter: function () {
      gsap.to(".sc-intro .group-intro .headline .box", {
        yPercent: 0,
        duration: 1,
      });
      gsap.to(".sc-intro .group-intro .top-area .space img", {
        yPercent: 0,
        ease: "power3.out",
        delay: 0.4,
        duration: 1,
      });
      gsap.to(".header .nav", {
        autoAlpha: 1,
        duration: 1,
        delay: 0.4,
      });
    },
  });

  ScrollTrigger.create({
    trigger: ".sc-intro .group-intro .top-area",
    start: "bottom top",
    end: "bottom bottom",
    markers: false,
    onEnter: function () {
      $(".header .nav").removeClass("active");
      $(".header .nav").addClass("convert");
    },
    onLeaveBack: function () {
      $(".header .nav").addClass("active");
      $(".header .nav").removeClass("convert");
    },
  });

  let mm = gsap.matchMedia();
  mm.add(`(max-width: 766px)`, () => {
    ScrollTrigger.create({
      trigger: ".sc-intro .group-change",
      start: "top top",
      end: "bottom bottom",
      markers: false,
      onEnter: function () {
        $(".header .nav").addClass("convert");
      },
      onLeaveBack: function () {
        $(".header .nav").removeClass("convert");
      },
    });
    ScrollTrigger.create({
      trigger: ".sc-intro .group-right",
      start: "top top",
      end: "bottom bottom",
      markers: false,
      onEnter: function () {
        $(".header .nav").removeClass("convert");
      },
      onLeaveBack: function () {
        $(".header .nav").addClass("convert");
      },
    });
  });

  const sections = [
    { trigger: ".sc-project", toggleClass: "remove" },
    { trigger: ".sc-rule", toggleClass: "add" },
    { trigger: ".sc-part", toggleClass: "remove" },
    { trigger: ".group-desole", toggleClass: "add" },
    { trigger: ".sc-free", toggleClass: "remove" },
    { trigger: ".sc-type", toggleClass: "add" },
    { trigger: ".sc-company", toggleClass: "remove" },
  ];
  
  sections.forEach((section) => {
    ScrollTrigger.create({
      trigger: section.trigger,
      start: "top top",
      end: "bottom bottom",
      markers: false,
      onEnter: function () {
        if (section.toggleClass === "add") {
          $(".header .nav").addClass("convert");
        } else {
          $(".header .nav").removeClass("convert");
        }
      },
      onLeaveBack: function () {
        if (section.toggleClass === "add") {
          $(".header .nav").removeClass("convert");
        } else {
          $(".header .nav").addClass("convert");
        }
      },
    });
  });
  
  mm.add(`(min-width: 767px)`, () => {
    const introBottom = gsap.timeline({
      scrollTrigger: {
        trigger: ".sc-intro .group-intro",
        start: "top top",
        end: "bottom bottom",
        scrub: 0,
        markers: false,
      },
    });

    gsap.set(".sc-intro .group-intro .media-wrap .box", { yPercent: 500 });
    gsap.set(".sc-intro .group-intro .media-wrap .box2", { rotate: 20 });
    gsap.set(".sc-intro .group-intro .media-wrap .box3", { rotate: -20 });
    introBottom
      .to(".sc-intro .group-intro .top-area", 1, { "--height": 0 }, "a")
      .to(".sc-intro .group-intro .bottom-area", 1, { "--width": 0 }, "a+=0.5")
      .to(
        ".sc-intro .group-intro .media-wrap .box1",
        1.2,
        {
          xPercent: 30,
          yPercent: -400,
          rotate: 30,
        },
        "a+=0.2"
      )
      .to(
        ".sc-intro .group-intro .media-wrap .box2",
        1.2,
        {
          xPercent: 20,
          yPercent: -300,
          rotate: -30,
        },
        "a+=0.3"
      )
      .to(
        ".sc-intro .group-intro .media-wrap .box3",
        1.2,
        {
          xPercent: -90,
          yPercent: -300,
          rotate: 20,
        },
        "a+=0.3"
      );

    const introRight = gsap.timeline({
      scrollTrigger: {
        trigger: ".sc-intro .group-right",
        start: "top top",
        end: "+=100%",
        scrub: 0,
        //markers: true,
        pin: true,
        pinSpacing: false,
        invalidateOnRefresh: true,
        onEnter: function () {
          $(".header .nav").removeClass("convert");
        },
        onLeaveBack: function () {
          $(".header .nav").addClass("convert");
        },
      },
    });

    introRight.to(".sc-intro .group-right", {
      x: 0,
    });

    const introRight2 = gsap.timeline({
      scrollTrigger: {
        trigger: ".sc-intro .group-intro",
        start: `100%+=${window.innerHeight} 0%`,
        endTrigger: ".group-garder",
        end: "top bottom",
        scrub: 0,
      },
    });

    introRight2.to(".sc-intro .group-right p .char", {
      opacity: 1,
      stagger: 1,
    });

    const introGarder = gsap.timeline({
      scrollTrigger: {
        trigger: ".sc-intro .group-garder",
        start: "-10% top",
        end: "bottom -50%",
        scrub: 1,
        markers: false,
        onLeaveBack: function () {
          $(".sc-intro .group-garder").removeClass("on");
        },
      },
    });
    $(".sc-intro .group-garder .char").each(function (i, el) {
      gsap.set(this, { x: 1655 * (i + 1), rotate: 25 * (i + 1) });
    });

    introGarder
      .to(".sc-intro .group-garder svg", { rotate: 0 }, "a")
      .to(
        ".sc-intro .group-garder .char",
        {
          rotate: 0,
          x: 0,
          stagger: 0.001,
          onComplete: function () {
            $(".sc-intro .group-garder").addClass("on");
          },
        },
        "a"
      )
      .to(
        ".sc-intro .group-garder svg",
        {
          rotate: -180,
          scale: 4,
          onReverseComplete: function () {
            $(".sc-intro .group-garder").removeClass("on");
            $(".header .nav").removeClass("convert");
          },
          onComplete: function () {
            $(".header .nav").addClass("convert");
          },
        },
        "b"
      )
      .to(".sc-intro .group-garder h3", { scale: 1.5 }, "b")
      .to(".sc-intro .group-garder .char", {
        visibility: "hidden",
        stagger: 0.1,
      });

    const introChange = gsap.timeline({
      scrollTrigger: {
        trigger: ".sc-intro .group-change",
        start: "top center",
        end: "bottom bottom",
        scrub: 0,
        markers: false,
      },
    });
    introChange.to(".sc-intro .group-change .line", {
      "--wordY": "0",
      stagger: 0.1,
      duration: 0.1,
      ease: "power2.out",
    });



    const btnWilbi = $(".sc-project .btn-wilbi .txt-wrap span");

    btnWilbi.each(function (index, span) {
      gsap.set(span, {
        yPercent: (index + 1) * 20,
        rotate: (index + 1) * 10,
      });
    });
    
    const btnOtio = $(".sc-project .btn-otio .txt-wrap span");
    
    btnOtio.each(function (index, span) {
      gsap.set(span, {
        yPercent: 80 - index * 20,
        rotate: -40 + index * 10,
      });
    });

    const project = gsap.timeline({
      scrollTrigger: {
        trigger: ".sc-project",
        start: "top top",
        end: "bottom bottom",
        scrub: 0,
      },
    });

    $(".sc-project .btn-wilbi .txt-wrap span").each(function (index, span) {
      project.to(span, {
        yPercent: -(index + 1) * 20,
        rotate: -(index + 1) * 10,
      }, 'a');
    });
    
    $(".sc-project .btn-otio .txt-wrap span").each(function (index, span) {
      project.to(span, {
        yPercent: -(80 - index * 20),
        rotate: 40 - index * 10,
      }, 'b');
    });
    gsap.set('.sc-project .hori2',{xPercent:-50})
    
    const project2 = gsap.timeline({
      scrollTrigger: {
        trigger: ".sc-project",
        start: "top center",
        end: "bottom bottom",
        scrub: 0,
        markers:false,
        onEnter:function(){
          $('.sc-project .hori-wrap').addClass('fixed');
        },
        onEnterBack:function(){
          $('.sc-project .hori-wrap').addClass('fixed');
        },
        onLeave:function(){
          $('.sc-project .hori-wrap').removeClass('fixed');
        },
        onLeaveBack: () => {
          $('.sc-project .hori-wrap').removeClass('fixed');
        },
      },
    });

    project2
    .to('.sc-project .hori1',{xPercent:-10,yPercent:-110,rotate:-30},'a')
    .to('.sc-project .hori2',{xPercent:20,yPercent:-120,rotate:50},'a')
    .to('.sc-project .hori3',{xPercent:10,yPercent:-180,rotate:40},'a')
    .to('.sc-project .hori-wrap',{yPercent:100},'a')
    
    ScrollTrigger.create({
      trigger: ".sc-part",
      start: "top center",
      end: "bottom center",
      onUpdate: (self) => {
        const index = Math.floor(self.progress * (181 - 1));

        seq1.setCurrentIndex(index);
        // self.progress*3
        //
        // $(".part-wrap").removeClass("on");
        // if (index < 60) {
        //   $(".part-wrap1").addClass("on");
        // } else if (index >= 60 && index < 120) {
        // 	$(".part-wrap2").addClass("on");
        // } else if (index >= 120) {
        // 	$(".part-wrap3").addClass("on");
        // }

        // 초기화
        $(".part-wrap").removeClass("on");

        // index 값에 따라 처리
        const sections = [
          { min: 0, max: 60, class: ".part-wrap1" },
          { min: 60, max: 120, class: ".part-wrap2" },
          { min: 120, max: Infinity, class: ".part-wrap3" },
        ];

        // 반복문으로 클래스 추가
        sections.forEach((section) => {
          if (index >= section.min && index < section.max) {
            $(section.class).addClass("on");
          }
        });
      },
    });

    ScrollTrigger.create({
      trigger: ".sc-vous",
      start: "top 20%",
      end: "bottom bottom",
      // markers:true,
      onEnter: function () {
        gsap.to(".trans1, .trans2", { top: "-120%" });
      },
      onLeaveBack: function () {
        gsap.to(".trans1, .trans2", { top: 0 });
      },
    });
    gsap.set(".sc-free .tant span", {
      y: 94,
      rotate: -8.7636,
      scale: "1,1.4",
      opacity: 0,
    });
    const free = gsap.timeline({
      scrollTrigger: {
        trigger: ".sc-free",
        start: "top -40%",
        end: "bottom bottom",
        scrub: 0,
        markers: false,
        onUpdate: (self) => {
          const index = Math.floor(self.progress * (141 - 1));
          seq2.setCurrentIndex(index);
        },
      },
    });

    free
      .to(".sc-free .clip", {
        "--width": "100%",
        "--height": "100%",
        "border-radius": 0,
        duration: 3,
      })
      .to(".sc-free .clip-area .up", { "--y": "-80vh", duration: 2 }, "-=0.1")
      .to(".sc-free .tant span", {
        y: 0,
        rotate: 0,
        scale: "1,1",
        opacity: 1,
        stagger: 1,
        // stagger: {
        // 	each:1,
        // 	amount:1,
        // },
      })
      .to(
        ".sc-free .tant",
        {
          "--line": "100%",
          duration: 20,
        },
        "<"
      );
    const company = gsap.timeline({
      scrollTrigger: {
        trigger: ".sc-company",
        start: "top 20%",
        end: "bottom bottom",
        scrub: 0,
        markers: false,
      },
    });


    gsap.set('.sc-company .card-item:nth-child(1)',{xPercent:32,yPercent:10,rotate:20})
    gsap.set('.sc-company .card-item:nth-child(2)',{xPercent:-45,yPercent:11,rotate:-20})
    gsap.set('.sc-company .card-item:nth-child(3)',{xPercent:-34,yPercent:-12,rotate:11})
    gsap.set('.sc-company .card-item:nth-child(4)',{xPercent:46,yPercent:-16,rotate:-18})
    gsap.set('.sc-company .card-item:nth-child(5)',{xPercent:47,yPercent:15,rotate:-20})
    gsap.set('.sc-company .card-item:nth-child(6)',{xPercent:44,yPercent:13,rotate:12})
    company
    .to(".sc-company .card-list", {
      xPercent: -100,
      x: function () {
        return window.outerWidth;
      },
    },'a')
    .to('.sc-company .card-item:nth-child(1)',{xPercent:-32,yPercent:-10,rotate:-20,},'a')
    .to('.sc-company .card-item:nth-child(2)',{xPercent:45,yPercent:-11,rotate:20},'a')
    .to('.sc-company .card-item:nth-child(3)',{xPercent:34,yPercent:12,rotate:-11},'a')
    .to('.sc-company .card-item:nth-child(4)',{xPercent:-46,yPercent:16,rotate:18},'a')
    .to('.sc-company .card-item:nth-child(5)',{xPercent:-47,yPercent:-15,rotate:20},'a')
    .to('.sc-company .card-item:nth-child(6)',{xPercent:-44,yPercent:-13,rotate:-12},'a')
  });

  gsap.set('.sc-fait .tab-item',{autoAlpha:0,'perspective':'900px',y:-146.875,})
  gsap.set('.sc-fait .tab-item button',{rotateX:70})
  
  const faq = gsap.timeline({
    scrollTrigger: {
      trigger: ".sc-fait",
      start: "top 10%",
      end: "bottom bottom",
      scrub: 0,
      markers: false,
    },
  });

  faq
  .to('.sc-fait .tab-item',{autoAlpha:1,y:0,stagger:0.1,})
  .to('.sc-fait .tab-item button',{rotateX:0,stagger: 0.1},'<')
  const footer = gsap.timeline({
    scrollTrigger: {
      trigger: ".footer",
      start: "top 10%",
      end: "bottom bottom",
      scrub: 0,
      markers: false,
      onEnter: function () {
        $(".header .nav").addClass("convert");
      },
      onLeaveBack: function () {
        $(".header .nav").removeClass("convert");
      },
    },
  });
  footer.to(".footer h3 span", { "--y": 0 });

  $(".sc-fait .tab-item button").click(function (e) {
    e.preventDefault();
    const tabName = $(this).parent().data("tab");
    console.log(tabName);
    $(this).parent().addClass("active").siblings().removeClass("active");
    $(tabName).addClass("on").siblings().removeClass("on");
  });
}); // document ready

let headerOriginalTxt = new SplitType(".header .sub-item .original", {type: "chars",});
let headerDummyTxt = new SplitType(".header .sub-item .dummy", {type: "chars",});
let introRightTxt = new SplitType(".sc-intro .group-right p", {type: "chars",});
let introChangeTxt = new SplitType(".sc-intro .group-change .ok", {type: "line",});

$(".sc-intro .group-right .line").each(function () {
  $(this).css({
    display: "inline-block",
    width: "auto",
  });
});
$(".btn-top").click(function (e) {
$("html, body").animate({ scrollTop: 0 }, 400);
  return false; // 클릭 시 기본 동작 방지
});
