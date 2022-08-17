const jsonData = './js/poo.json';

const pooOptionsHolder = document.querySelector('.js-poo-options');
const pooSectionELs = document.querySelectorAll('.js-panel');
const step01Form = document.querySelector('.js-poo-step-01');
const startBtn = step01Form.querySelector('button');
const step02EL = document.querySelector('.js-poo-step-02');
const step02Btn = step02EL.querySelector('button');
const resultEL = document.querySelector('.js-poo-result');
const restartBtnEL = resultEL.querySelector('.js-poo-restart');
const POOP_TEXTURE = 'textures';

// let selectedPooColour = '';

const capitalize = (str) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

function fadeOut(el) {
  el.style.opacity = 1;
  (function fade() {
    if ((el.style.opacity -= 0.1) < 0) {
      el.style.display = 'none';
    } else {
      requestAnimationFrame(fade);
    }
  })();
}

function fadeIn(el, display) {
  el.style.opacity = 0;
  el.style.display = display || 'block';
  (function fade() {
    let val = parseFloat(el.style.opacity);
    if (!((val += 0.1) > 1)) {
      el.style.opacity = val;
      requestAnimationFrame(fade);
    }
  })();
}

const fetchPoo = async () => {
  const res = await fetch(jsonData);
  const pooData = await res.json();
  // console.log(pooData);
  // pooData.forEach((dat) => {
  // console.log(dat);
  // if (dat.hasOwnProperty('texture')) {
  //   console.log(dat.texture);
  // }
  // });
  return pooData;
};

const generatePooOptions = async () => {
  const pooData = await fetchPoo();
  const html = pooData
    .map(
      (poo) => `
      <input type="radio" name="poocolor" 
        id="${poo.colour}" 
        value="${poo.colour}" />
      <label class="color-label color-label--${poo.colour}" for="${poo.colour}">
        ${capitalize(poo.colour)}
      </label>
      `
    )
    .join('');
  pooOptionsHolder.innerHTML = html;

  pooOptionsHolder.addEventListener('click', (e) => {
    const checkedRadioInputs = pooOptionsHolder.querySelectorAll(
      'input[name="poocolor"]:checked'
    );

    if (checkedRadioInputs.length) {
      startBtn.textContent = 'Next';
      startBtn.disabled = false;
    }
  });

  step01Form.addEventListener('submit', (event) => {
    checkStep01(event, pooData);
  });
};

const showResult = (e, color, texturetype = '') => {
  console.log(e);
  console.log(color);
  console.log(`🚽 ${texturetype}`);

  if ($('.js-texture-options.slick-initialized')[0]) {
    $('.js-texture-options').slick('unslick');
    console.log('slick unslicked');
  }

  if (!Object.getOwnPropertyDescriptor(color, POOP_TEXTURE)) {
    console.log('❌ No Texture');
    if ('content' in document.createElement('template')) {
      const container = document.querySelector('.js-poo-result');
      const resultCard = container.querySelector('.result-card');

      const tmpl = document
        .getElementById('resultTemplate')
        .content.cloneNode(true);

      tmpl
        .querySelector('.color-label')
        .classList.add(`color-label--${color.colour}`);

      const colourWord = capitalize(color.colour);
      tmpl.querySelector('.color-label span').innerText = colourWord;

      tmpl.querySelector('.result-card-content h5').innerText =
        color.result.heading;
      tmpl.querySelector('.result-card-content p').innerText =
        color.result.copy;

      // container.appendChild(tmpl);
      const slickContainer = step02EL.querySelector('.js-texture-options');
      if (slickContainer) {
        slickContainer.innerHTML = '';
      }
      if (resultCard) {
        resultCard.remove();
      }
      container.prepend(tmpl);
    } else {
      console.error('Your browser does not support templates');
    }
  } else {
    console.log('✅ Got Texture');
    // console.log(Array.isArray(color));
    console.log(color);
    const result = color.result.find((obj) => obj.type === texturetype);
    console.log(result);
    // !!
    if ('content' in document.createElement('template')) {
      const container = document.querySelector('.js-poo-result');
      const resultCard = container.querySelector('.result-card');

      const tmpl = document
        .getElementById('resultTemplate-good')
        .content.cloneNode(true);

      tmpl.querySelector('img').setAttribute('src', `./images/poo-meter/${result.image}`);

      tmpl.querySelector('.result-card-content h5').innerText = result.heading;
      tmpl.querySelector('.result-card-content p').innerText = result.copy;

      // container.appendChild(tmpl);
      const slickContainer = step02EL.querySelector('.js-texture-options');
      if (slickContainer) {
        slickContainer.innerHTML = '';
      }
      if (resultCard) {
        resultCard.remove();
      }
      container.prepend(tmpl);
    } else {
      console.error('Your browser does not support templates');
    }
  }

  pooSectionELs.forEach((section) => {
    section.style.display = 'none';
  });
  fadeIn(resultEL);
};

const checkStep01 = (e, pData) => {
  e.preventDefault();
  console.log(pData);

  const formData = new FormData(e.target);
  const formProps = Object.fromEntries(formData);

  const selectedPooColour = formProps.poocolor;
  console.log(`💩 : ${selectedPooColour}`);

  if (!selectedPooColour) {
    alert('Please select poo colour');
    return;
  }

  // const pooData = await fetchPoo();
  // console.log(pooData);

  const poo = pData.find((element) => element.colour === selectedPooColour);
  console.log(poo);

  // if (!Object.prototype.hasOwnProperty.call(poo, 'texture')) {
  if (!Object.getOwnPropertyDescriptor(poo, POOP_TEXTURE)) {
    console.log('No Texture');
    showResult(e, poo);
    return;
  }

  checkStep02(poo);
};

const checkStep02 = (poo) => {
  console.log('Step 02!');
  console.log(poo);
  const { textures } = poo;
  let selectedTexture = 'type-01';
  // const textures = Object.entries(poo.textures);

  console.log(textures);

  if ('content' in document.createElement('template')) {
    const container = step02EL.querySelector('.js-texture-options');
    textures.forEach((texture) => {
      const tmpl = document
        .getElementById('step02-template')
        .content.cloneNode(true);
      tmpl
        .querySelector('.texture-option')
        .setAttribute('data-texturetype', `${texture.type}`);
      tmpl.querySelector('h5').innerText = texture.title;
      tmpl.querySelector('p').innerText = texture.copy;
      tmpl.querySelector('img').setAttribute('src', `./images/poo-meter/${texture.image}`);
      container.appendChild(tmpl);
    });
  } else {
    console.error('Your browser does not support templates');
  }

  $('.js-texture-options').slick({
    arrows: false,
    slidesToShow: 1,
    centerMode: true,
    centerPadding: '25%',
  });

  $('.js-texture-options').on('afterChange', () => {
    const dataId = $('.slick-current').attr('data-texturetype');
    selectedTexture = dataId;
  });

  pooSectionELs.forEach((section) => {
    section.style.display = 'none';
  });
  fadeIn(step02EL);

  // $('.js-texture-options').on(
  //   'beforeChange',
  //   (event, slick, currentSlide, nextSlide) => {
  //     const CurrentSlideDom = $(slick.$slides.get(currentSlide));
  //     const NextSlideDom = $(slick.$slides.get(nextSlide));

  //     console.log(CurrentSlideDom);
  //     console.log(NextSlideDom);
  //   }
  // );

  // console.log(selectedTexture);

  step02Btn.addEventListener('click', (event) => {
    // const selectedTexture =
    //   step02EL.querySelector('.slick-active').dataset.texturetype;
    showResult(event, poo, selectedTexture);
  });
};

const restart = () => {
  const radioBtns = step01Form.querySelectorAll('input[type=radio]:checked');
  radioBtns.forEach((radioBtn) => {
    radioBtn.checked = false;
  });

  pooSectionELs.forEach((section) => {
    section.style.display = 'none';
  });
  fadeIn(step01Form);
  startBtn.textContent = 'Identify poo colour';
  startBtn.disabled = true;
};

generatePooOptions();

restartBtnEL.addEventListener('click', restart);
