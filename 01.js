const $slide = document.querySelector(".slide");
let slideWidth = $slide.clientWidth;

// 슬라이드 전체를 선택해 값을 변경해주기 위해 슬라이드 전체 선택
let $introSlide = document.querySelectorAll(".intro__slide"); 

// 현재 슬라이드 위치가 슬라이드 개수를 넘기지 않게 하기 위한 변수
const maxSlide = $introSlide.length;


// 버튼 클릭할 때 마다 현재 슬라이드가 어디인지 알려주기 위한 변수
let tdSlide = 1;

// 슬라이드 버튼 생성
const $slideButton = document.querySelector(".slide__button");

for (let i = 0; i < maxSlide; i++) {
  if (i === 0) $slideButton.innerHTML += `<li class="active">•</li>`;
  else $slideButton.innerHTML += `<li>•</li>`;
}

const $slideButtonItem = document.querySelectorAll(".slide__button > li");

// 무한 슬라이드를 위해 start, end 슬라이드 복사하기
const startSlide = $introSlide[0];
const endSlide = $introSlide[$introSlide.length - 1];

// 엘리먼트 생성
const startElem = document.createElement(startSlide.tagName);
const endElem = document.createElement(endSlide.tagName);

// 엘리먼트에 클래스 적용 동일하게 하기
endSlide.classList.forEach((c) => endElem.classList.add(c));
endElem.innerHTML = endSlide.innerHTML;
startSlide.classList.forEach((c) => startElem.classList.add(c));
startElem.innerHTML = startSlide.innerHTML;

// 각 복제한 엘리먼트를 각 위치에 추가하기
$introSlide[0].before(endElem);
$introSlide[$introSlide.length - 1].after(startElem);

// 슬라이드 전체를 선택해 값을 변경해주기 위해 슬라이드 전체 선택하기
$introSlide = document.querySelectorAll(".intro__slide");
let offset = slideWidth * tdSlide;
$introSlide.forEach((i) => {
  i.setAttribute("style", `left: ${-offset}px`);
});

function nextEventMove () {
  tdSlide++;
  
  // 마지막 슬라이드 넘기지 않게 하기 위한 함수
  if(tdSlide <= maxSlide) {
    const offset = slideWidth * tdSlide;

    $introSlide.forEach((i) => {
      i.setAttribute("style", `left:${-offset}px`);
    });

    $slideButtonItem.forEach((i) => i.classList.remove("active"));
    $slideButtonItem[tdSlide -1].classList.add("active");
  } else {
    // 무한 슬라이드 기능
    tdSlide = 0;
    let offset = slideWidth * tdSlide;
    $introSlide.forEach((i) => {
      i.setAttribute("style", `transition: ${0}s; left: ${-offset}px`);
    });
    tdSlide++;
    offset = slideWidth * tdSlide;
    // 각 슬라이드 아이템의 left에 offset 적용
    setTimeout(() => {
      // 각 슬라이드 아이템의 left에 offset 적용
      $introSlide.forEach((i) => {
        i.setAttribute("style", `transition: ${0.15}s; left: ${-offset}px`);
      });
    }, 0);

    $slideButtonItem.forEach((i) => i.classList.remove("active"));
    $slideButtonItem[tdSlide -1].classList.add("active");
  }
}

function prevEventMove () {
  tdSlide--;

  if(tdSlide > 0) {
    const offset = slideWidth * tdSlide;

    $introSlide.forEach((i) => {
      i.setAttribute("style", `left:${-offset}px`);
    });

    $slideButtonItem.forEach((i) => i.classList.remove("active"));
    $slideButtonItem[tdSlide -1].classList.add("active");
  } else {
    tdSlide = maxSlide + 1;
    let offset = slideWidth * tdSlide;
    // 각 슬라이드 아이템의 left에 offset 적용
    $introSlide.forEach((i) => {
      i.setAttribute("style", `transition: ${0}s; left: ${-offset}px`);
    });
    tdSlide--;
    offset = slideWidth * tdSlide;
    setTimeout(() => {
      // 각 슬라이드 아이템의 left에 offset 적용
      $introSlide.forEach((i) => {
        // i.setAttribute("style", `transition: ${0}s; left: ${-offset}px`);
        i.setAttribute("style", `transition: ${0.15}s; left: ${-offset}px`);
      });
    }, 0);
    $slideButtonItem.forEach((i) => i.classList.remove("active"));
    $slideButtonItem[tdSlide -1].classList.add("active");
  }
}

// 브라우저 화면이 조정될 때 마다 slideWidth를 변경하기 위해
window.addEventListener("resize", () => {
  slideWidth = $slide.clientWidth;
})

// 각 슬라이드버튼 클릭 시 해당 슬라이드로 이동하기
for(let i = 0; i < maxSlide; i++) {
  $slideButtonItem[i].addEventListener("click", () => {
    tdSlide = i + 1;

    const offset = slideWidth * tdSlide;

    $introSlide.forEach((i) => {
      i.setAttribute("style", `left:${-offset}px`);
    });

    $slideButtonItem.forEach((i) => i.classList.remove("active"));
    $slideButtonItem[tdSlide -1].classList.add("active");
  })
}


let startPoint = 0;
let endPoint = 0;

// PC 드래그 이벤트
$slide.addEventListener("mousedown", (e) => {
  startPoint = e.pageX;
});

$slide.addEventListener("mouseup", (e) => {
  endPoint = e.pageX;
  if(startPoint < endPoint) {
    prevEventMove ();
  } else if(startPoint > endPoint) {
    nextEventMove ();
  }
});

// 모바일 스와이프 이벤트
$slide.addEventListener("touchstart", (e) => {
  startPoint = e.touches[0].pageX;
});
$slide.addEventListener("touchend", (e) => {
  endPoint = e.changedTouches[0].pageX;
  if(startPoint < endPoint) {
    prevEventMove ();
  } else if(startPoint > endPoint) {
    nextEventMove ();
  }
});

//자동 슬라이드 루프 시작
let slideIntervar = setInterval(() => {
  nextEventMove ();
}, 3000);

// 슬라이드에 마우스가 올라간 경우 루프 멈추기
$slide.addEventListener("mouseover", () => {
  clearInterval(slideIntervar);
});

// 슬라이드에서 마우스가 나온 경우 루프 재시작하기
$slide.addEventListener("mouseout", () => {
  slideIntervar = setInterval(() => {
    nextEventMove ();
  }, 3000);
});


// 데이터 받아오기
async function fetchItems() {
  try {
    const response = await fetch("data.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error fetching data:", error);
  }
}

// 아이템 생성 및 화면에 표시하는 함수
function createItemElement(item) {
    const itemElement  = document.createElement("li");
    itemElement.classList.add("goods__item");

    const solidElement = document.createElement("div");
    solidElement.classList.add("goods__solid");
    itemElement.appendChild(solidElement);
    
    const imageElement = document.createElement("img");
    imageElement.src = item.goods.image.medium;
    solidElement.appendChild(imageElement);

    const titleElement = document.createElement("h2");
    titleElement.textContent = item.goods.title; 
    itemElement.appendChild(titleElement);
    
    const textElement = document.createElement("p");
    textElement.textContent = item.goods.text; 
    itemElement.appendChild(textElement);

    const pricesElement = document.createElement("dl");
    pricesElement.classList.add("goods__price");
    itemElement.appendChild(pricesElement);

    const perElement = document.createElement("dt");
    perElement.textContent = item.goods.per; 
    pricesElement.appendChild(perElement);

    const priceElement = document.createElement("dd");
    priceElement.textContent = item.goods.price;
    pricesElement.appendChild(priceElement);

    return itemElement;
}

// 전역 변수
let totalItemCount = 0; // 전체 아이템 개수
let initialItemCount = 16; // 초기에 보여지는 아이템 개수
let initialItemCountM = 12; // 초기에 모바일에 보여지는 아이템 개수
let currentRowCount = 1; // 현재 표시된 줄의 개수

// 초기 화면 로딩 함수
async function loadInitialScreen() {
  try {
    const data = await fetchItems();
    totalItemCount = data.length; // 전체 아이템 개수 설정

    const container = document.getElementById('goods__roll');

    for (let i = 0; i < totalItemCount; i++) {
      const item = data[i];
      const itemElement = createItemElement(item);
      container.appendChild(itemElement);

      // 초기에 보여지는 아이템 개수에 따라 숨김 클래스 추가
      if (i >= initialItemCount) {
        itemElement.classList.add('hidden');
      }
    }

    // 초기 버튼 위치 설정
    const button = document.getElementById('goods__button');
    const containerHeight = container.offsetHeight;
    button.style.top = containerHeight + 'px';

    button.addEventListener('click', showNextLine); // showNextLine() 함수 호출
  } catch (error) {
    console.error('Error loading initial screen:', error);
  }
}

// 모바일 초기 화면 로딩 함수
async function loadInitialScreenM() {
  try {
    const data = await fetchItems();
    totalItemCount = data.length; // 전체 아이템 개수 설정

    const container = document.getElementById('goods__roll-m');

    for (let i = 0; i < totalItemCount; i++) {
      const item = data[i];
      const itemElement = createItemElement(item);
      container.appendChild(itemElement);

      // 초기에 보여지는 아이템 개수에 따라 숨김 클래스 추가
      if (i >= initialItemCountM) {
        itemElement.classList.add('hidden');
      }
    }

    // 초기 버튼 위치 설정
    const button = document.getElementById('goods__button');
    const containerHeight = container.offsetHeight;
    button.style.top = containerHeight + 'px';

    button.addEventListener('click', showNextLineM); // showNextLineM() 함수 호출
  } catch (error) {
    console.error('Error loading initial screen:', error);
  }
}

// 다음 줄 보여주는 함수 (PC)
function showNextLine() {
  const items = document.getElementsByClassName('goods__item');
  const button = document.getElementById('goods__button');

  // 초기 아이템 16개를 8개씩 보여줌
  const currentRowItems = document.querySelectorAll('.goods__item.hidden:nth-child(n+' + (initialItemCount + (currentRowCount - 1) * 8) + '):nth-child(-n+' + (initialItemCount + currentRowCount * 8) + ')');

  currentRowCount++;

  for (let i = 0; i < currentRowItems.length; i++) {
    currentRowItems[i].classList.remove('hidden');
  }

  // 남은 아이템 개수에 따라 버튼 표시 여부 결정
  const remainingItemsCount = totalItemCount - initialItemCount - (currentRowCount - 1) * 8;
  if (remainingItemsCount <= 0) {
    button.style.display = 'none';
  }

  // 버튼 위치 조정
  const container = document.getElementById('goods__roll');
  const containerHeight = container.offsetHeight;
  button.style.top = containerHeight + 'px';
}

// 모바일 다음 줄 보여주는 함수
function showNextLineM() {
  const items = document.getElementsByClassName('goods__item');
  const button = document.getElementById('goods__button');

  // 초기 아이템 12개를 12개씩 보여줌
  const currentRowItems = document.querySelectorAll('.goods__item.hidden:nth-child(n+' + (initialItemCountM + (currentRowCount - 1) * 12) + '):nth-child(-n+' + (initialItemCountM + currentRowCount * 12) + ')')

  currentRowCount++;

  for (let i = 0; i < currentRowItems.length; i++) {
    currentRowItems[i].classList.remove('hidden');
  }

  // 남은 아이템 개수에 따라 버튼 표시 여부 결정
  const remainingItemsCount = totalItemCount - initialItemCountM - (currentRowCount - 1) * 12;
  if (remainingItemsCount <= 0) {
    button.style.display = 'none';
  }

  // 버튼 위치 조정
  const container = document.getElementById('goods__roll-m');
  const containerHeight = container.offsetHeight;
  button.style.top = containerHeight + 'px';
}

// 모든 아이템을 한 번에 보여주는 함수
function showAllItems() {
  const items = document.getElementsByClassName('goods__item');
  const button = document.getElementById('goods__button');

  // 모든 아이템 숨김 상태 제거
  for (let i = 0; i < items.length; i++) {
    items[i].classList.remove('hidden');
  }

  // 버튼 숨김
  button.style.display = 'none';
}

function showNextLine() {
  showAllItems();
}

function showNextLineM() {
  showAllItems();
}

loadInitialScreen();
loadInitialScreenM();

window.onscroll = function() {
  let topButton = document.getElementById("topButton");

  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    topButton.style.display = "block";
  } else {
    topButton.style.display = "none";
  }
};
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}