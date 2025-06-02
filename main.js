"use strict";

// ▼ header start ▼
{
  // headerH2のstyle
  function headerH2Style(element, opacity, translateY) {
    element.style.opacity = opacity;
    element.style.transform = `translateY(${translateY})`;
  }

  // loadが完了したらheaderH2が下からふわっと表示
  window.addEventListener('load', () => {
    const headerH2 = document.querySelector('header h2');
    headerH2Style(headerH2, '1', '0');

    const headerH3 = document.querySelector('header h3');
    headerH3.style.color = 'yellow';
  });
}
// ▲ header end ▲

// ▼ reviews start ▼
{
  // itemのstyle
  function itemStyle(element, opacity, translateY) {
    element.style.opacity = opacity;
    element.style.transform = `translateY(${translateY})`;
    element.classList.add('stop');
  }

  // min-width800の時に発火
  function itemDelay(element, delay) {
    element.style.transitionDelay = delay;
  }

  // scrollAnimationの返し値
  function scrollAnimation(element) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    return rect.top < windowHeight && !element.classList.contains('stop');
  }

  // isWidthOver800の返し値(min-width:800pxのときのみ)
  function isWidthOver800() {
    const windowWidth = window.innerWidth;
    return windowWidth > 800;
  }

  // itemの位置までscrollしたら発火
  window.addEventListener('scroll', () => {
    const reviewsItem = document.querySelectorAll('.reviews-item');
    reviewsItem.forEach((item, index) => {
      if (scrollAnimation(item)) {
        if (isWidthOver800()) {
          itemDelay(item, `${index * .3}s`)
        }
        itemStyle(item, '1', '0');
      }
    });
  });
}
// ▲ reviews end ▲

// ▼ form start ▼
{
  const form = document.querySelector('form');
  const select = document.getElementById('select');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const tel = document.getElementById('tel').value.trim();
    const selectValue = select.value;

    if (name && email && tel && selectValue) {
      const result = confirm('送信しますか？');
      if (result) {
        form.submit();
      }
    } else {
      alert('必須項目を入力してください');
    }
  });


}
// ▲ form end ▲

// ▼ overlay start ▼
{
  // overlayのstyle
  function overlayStyle(element, opacity, translateY) {
    element.style.opacity = opacity;
    element.style.transform = `translateY(${translateY})`;
  }

  // scrollIntervalの返し値
  function scrollInterval() {
    const header = document.querySelector('header');
    const form = document.querySelector('form');

    const headerRect = header.getBoundingClientRect();
    const formRect = form.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    return headerRect.bottom < 0 && !(formRect.top < windowHeight && formRect.bottom > 0);
  }

  // headerとform以外の位置にscrollされていたらoverlayが下からふわっと出る
  window.addEventListener('scroll', () => {

    const overlay = document.querySelector('.overlay');

    if (scrollInterval()) {
      overlayStyle(overlay, '1', '0');
    } else {
      overlayStyle(overlay, '0', '100px');
    }
  })
}

{
  // formScrollの関数
  function formScroll() {
    const form = document.querySelector('form');

    form.scrollIntoView({
      block: 'start',
      behavior: 'smooth'
    });
  }

  // preventDefaultの関数
  function preventDefault(element) {
    element.preventDefault();
  }

  const headerA = document.querySelector('header a');
  const overlay = document.querySelector('.overlay');

  // headerAをクリックしたら発火
  headerA.addEventListener('click', (e) => {
    preventDefault(e);
    formScroll();
  });

  // overlayをクリックしたら発火
  overlay.addEventListener('click', (e) => {
    preventDefault(e);
    formScroll();
  });
}
// ▲ overlay end ▲