/**
 * result.js - 결과 페이지 자바스크립트
 * 제작: 김시영, 이민서
 */

// 1. 계산 결과 화면에 뿌려주는 함수
function showResults() {
  // index.html에서 저장했던 스크린타임 가져오기 (없으면 기본값 4시간)
  let savedHours = localStorage.getItem('screenTimeHours');
  let h = 4;
  if (savedHours) {
    h = parseFloat(savedHours);
  }

  // 최저시급 (2024년 기준 대충 만원이라 치고 9860원)
  let minWage = 9860;
  // 책 한 권 읽는 데 걸리는 시간 (대충 6시간)
  let bookHours = 6;

  // 1) 오늘 내 시간
  document.getElementById('displayHours').textContent = h;

  // 2) 1주일 (7일)
  let weekH = Math.round(h * 7);
  document.getElementById('weekHours').textContent = weekH;

  // 3) 1달 (30일)
  let monthH = Math.round(h * 30);
  let monthWage = Math.round(monthH * minWage);
  document.getElementById('monthHours').textContent = monthH;
  // 알바비는 밑에서 애니메이션으로 처리할 거라 숫자 안 넣음

  // 4) 1년 (365일)
  let yearH = Math.round(h * 365);
  let yearBooks = Math.round(yearH / bookHours);
  document.getElementById('yearHours').textContent = yearH.toLocaleString('ko-KR');
  document.getElementById('yearBooks').textContent = yearBooks;

  // 5) 10년 (3650일)
  let decadeH = Math.round(h * 365 * 10);
  document.getElementById('decadeHours').textContent = decadeH.toLocaleString('ko-KR');

  // 스크롤 할 때 애니메이션들 실행하기 위한 준비
  window.addEventListener('scroll', function () {
    let scrollY = window.scrollY; // 지금 얼마나 스크롤 내렸는지

    // 자전거 애니메이션 (1주일 섹션 쯤 왔을 때)
    let weekSection = document.getElementById('week');
    if (weekSection && scrollY > weekSection.offsetTop - 500) {
      document.getElementById('bikeIcon').classList.add('riding');
    }

    // 알바비 카운터 애니메이션 (1달 섹션 쯤 왔을 때)
    let monthSection = document.getElementById('month');
    let wageEl = document.getElementById('monthWage');
    // 한번만 실행되게 클래스 하나 붙여두기
    if (monthSection && scrollY > monthSection.offsetTop - 500 && !wageEl.classList.contains('done')) {
      wageEl.classList.add('done'); // 실행 완료 도장 쾅!
      animateWage(wageEl, monthWage);
    }

    // 책 떨어지는 애니메이션 (1년 섹션 쯤 왔을 때)
    let yearSection = document.getElementById('year');
    let canvas = document.getElementById('booksCanvas');
    if (yearSection && scrollY > yearSection.offsetTop - 500 && !canvas.classList.contains('done')) {
      canvas.classList.add('done');
      dropBooks(yearBooks);
    }
  });
}

// 2. 알바비 숫자 다라락 올라가는 함수
function animateWage(element, targetNum) {
  let current = 0;
  let step = targetNum / 50; // 50번만에 올라가게 쪼개기

  let timer = setInterval(function () {
    current += step;
    if (current >= targetNum) {
      current = targetNum;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current).toLocaleString('ko-KR');
  }, 30);
}

// 3. 외부 물리엔진 라이브러리(Matter.js) 써서 책 떨어뜨리는 함수
function dropBooks(bookCount) {
  // 컴터 렉 걸릴까봐 폰 많이 본 사람도 최대 60권만 떨어지게 제한
  if (bookCount > 60) bookCount = 60;

  // 물리엔진 세팅 (구글링해서 가져온 코드 응용)
  let Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      Bodies = Matter.Bodies,
      Composite = Matter.Composite;

  let engine = Engine.create();
  let canvas = document.getElementById('booksCanvas');

  let render = Render.create({
    canvas: canvas,
    engine: engine,
    options: {
      width: 600,
      height: 300,
      background: 'transparent',
      wireframes: false // 색깔 칠해지게 만들기
    }
  });

  // 바닥이랑 양쪽 벽 만들기 (책 밖으로 안 떨어지게 막아둠)
  let ground = Bodies.rectangle(300, 325, 600, 50, { isStatic: true, render: { fillStyle: '#E8F5E9' } });
  let wallLeft = Bodies.rectangle(-25, 150, 50, 300, { isStatic: true });
  let wallRight = Bodies.rectangle(625, 150, 50, 300, { isStatic: true });
  
  Composite.add(engine.world, [ground, wallLeft, wallRight]);

  // 책 떨어뜨리기 (시간차 공격)
  let colors = ['#2E8B57', '#FF8C00', '#D9534F', '#333333', '#5CB85C'];
  let count = 0;

  let dropTimer = setInterval(function () {
    if (count >= bookCount) {
      clearInterval(dropTimer);
      return;
    }

    // x좌표 랜덤으로 만들어서 떨어뜨리기
    let randomX = Math.floor(Math.random() * 400) + 100; // 100 ~ 500 사이
    let randomColor = colors[count % colors.length];

    // 네모 상자(책) 만들기
    let book = Bodies.rectangle(randomX, -20, 40, 20, {
      restitution: 0.5, // 튕기는 정도 (통통!)
      render: { fillStyle: randomColor }
    });

    Composite.add(engine.world, book);
    count++;
  }, 100); // 0.1초마다 한 권씩 투하

  Render.run(render);
  let runner = Runner.create();
  Runner.run(runner, engine);
}

// 페이지 다 로딩되면 실행
window.onload = function () {
  showResults();
};