const refs = {
  list: document.querySelector('.product-list__list'),
  pages: document.querySelectorAll('[data-page]'),
  pageOne: document.querySelector('[data-page]'),
};

const BASE_URL = 'http://localhost:3000';

refs.pageOne.classList.add('pagination--active');

refs.pages.forEach(el => {
  el.addEventListener('click', () => {
    refs.pages.forEach(el => el.classList.remove('pagination--active'));
    const page = el.dataset.page;
    el.classList.add('pagination--active');

    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
    const sort = params._sort_;
    const category = params.category;

    fetch(`${BASE_URL}/products/?category=${category}&page=${page}&_sort_=${sort !== 'default' ? sort : 'default'}`)
      .then(res => res.json())
      .then(res => {
        const params = new URLSearchParams(window.location.search);
        params.set('page', page);
        window.history.replaceState({}, '', `${window.location.pathname}?${params}`);

        const markup = res.map(el => renderProduct(el)).join('');

        refs.list.innerHTML = markup;
      });
  });
});

export function renderProduct(product) {
  const { image_url, category, old_price, isNew, id, raiting, title, price } = product;
  const markup = `
  <li class="product-list__item" data-id="{{ id }}">
    <div class="thumb">
      <img src="${image_url}" alt="${category}">
      ${
        old_price && isNew
          ? `<div class="thumb__discount thumb__discount--both"><span class="thumb__discount-number">-20%</span></div>
          <div class="thumb__discount thumb__discount--both-new" > <span class="thumb__discount-number">new</span></div> `
          : isNew
          ? `<div class="thumb__discount thumb__discount--sale"><span class="thumb__discount-number">new</span></div>`
          : old_price
          ? `<div class="thumb__discount"><span class="thumb__discount-number">-20%</span></div>`
          : ''
      }        
      <button class="thumb__like-btn">
        <svg fill="none" viewBox="0 0 15 15" width="15px" height="14px">
          <path
            d="m13.673 1.9387c-0.8674-0.86745-2.028-1.3451-3.2683-1.3451-1.0678 0-2.0765 0.35414-2.89 1.0061-0.82518-0.65197-1.8351-1.0061-2.8924-1.0061-1.2461 0-2.4097 0.47789-3.2772 1.3451-0.86745 0.86727-1.3451 2.0281-1.3451 3.2682 0 1.2403 0.47769 2.4009 1.3451 3.2682l5.7734 5.7734c0.1052 0.1054 0.24334 0.1581 0.38147 0.1581 0.13778 0 0.27554-0.0525 0.38095-0.1574l5.778-5.7604c0.8649-0.88433 1.341-2.0466 1.341-3.2728 0-1.2376-0.4698-2.3998-1.327-3.2772zm-0.7807 5.7905-5.3918 5.3751-5.3924-5.3922c-0.66349-0.66367-1.029-1.5534-1.029-2.5052s0.36548-1.8415 1.029-2.5052c0.66366-0.66349 1.5565-1.029 2.5142-1.029 0.94245 0 1.8371 0.36709 2.5185 1.0333 0.21114 0.20666 0.54982 0.20485 0.75864-0.0043 0.66367-0.66349 1.5532-1.029 2.5052-1.029 0.9519 0 1.8415 0.36548 2.5007 1.0246 0.6548 0.66996 1.0154 1.5644 1.0154 2.5185 0 0.94262-0.3668 1.837-1.0285 2.5133z"
            fill="#000"
          />
        </svg>
      </button>
      <ul class="thumb__buttons-list">
        <li class="thumb__button-item">
          <button class="thumb__button">
            <svg viewBox="0 0 15 15" width="14.5px" height="14.5px">
              <path
                d="m4.2826 2.5224c2.001-1.2832 4.5557-1.2275 6.4805 0.03222l-0.5947 0.07325c-0.32815 0.04101-0.55959 0.33984-0.52151 0.66797 0.03809 0.30175 0.2959 0.52441 0.59181 0.52441 0.0234 0 2.1211-0.25781 2.1211-0.25781 0.1582-0.02051 0.3017-0.09961 0.3984-0.22559s0.1406-0.28418 0.1201-0.44238l-0.2548-2.0479c-0.0411-0.32812-0.3428-0.5625-0.668-0.51856-0.3281 0.041016-0.5596 0.33984-0.5186 0.66797l0.0791 0.62402c-2.3232-1.5791-5.4433-1.6699-7.8779-0.10546-2.8447 1.8252-4.0283 5.4346-2.8154 8.584 0.090821 0.2373 0.38672 0.4746 0.77344 0.3428 0.31348-0.1084 0.46289-0.46584 0.34277-0.77345-1.0078-2.6221-0.02343-5.625 2.3438-7.1455z"
              />
              <path
                d="m14.179 4.9336c-0.0909-0.2373-0.3867-0.47461-0.7735-0.34277-0.3134 0.1084-0.4629 0.46582-0.3427 0.77344 1.0107 2.6221 0.0234 5.625-2.3438 7.1455-2.001 1.2832-4.5556 1.2276-6.4805-0.0322l0.59473-0.0732c0.32812-0.041 0.55957-0.3399 0.52148-0.668-0.03808-0.3018-0.2959-0.5244-0.5918-0.5244-0.02343 0-2.1211 0.2578-2.1211 0.2578-0.1582 0.0205-0.30176 0.0996-0.39844 0.2256s-0.14062 0.2842-0.12011 0.4424l0.25488 2.0478c0.04101 0.3281 0.34277 0.5625 0.66797 0.5186 0.32812-0.041 0.55957-0.3399 0.51855-0.668l-0.0791-0.624c2.3262 1.5762 5.4463 1.667 7.8838 0.1025 2.8389-1.8222 4.0225-5.4316 2.8096-8.581z"
              />
            </svg>
          </button>
        </li>
        <li class="thumb__button-item">
          <button class="thumb__button-add-to-card">
            <svg fill="none" viewBox="0 0 13 15" width="12.5px" height="15px">
              <path
                d="m12.701 14.374-0.9128-10.165c-0.0249-0.27759-0.2575-0.49022-0.5362-0.49022h-1.8823v-0.84894c0-1.5822-1.2871-2.8694-2.8692-2.8694-1.582 0-2.869 1.2872-2.869 2.8694v0.84894h-1.8836c-0.27868 0-0.51133 0.21263-0.53624 0.49022l-0.91635 10.205c-0.013496 0.1506 0.036897 0.2999 0.1389 0.4114 0.10201 0.1116 0.24622 0.1751 0.39733 0.1751h11.337 0.0014c0.2974 0 0.5384-0.241 0.5384-0.5384 0-0.0299-0.0025-0.0594-0.0072-0.088zm-7.9927-11.504c0-0.98842 0.804-1.7926 1.7923-1.7926 0.98834 0 1.7924 0.80414 1.7924 1.7926v0.84894h-3.5847v-0.84894zm-3.2878 11.054 0.81965-9.1281h1.3914v0.96279c0 0.29733 0.24099 0.53839 0.5384 0.53839s0.53839-0.24106 0.53839-0.53839v-0.96279h3.5847v0.96279c0 0.29733 0.24098 0.53839 0.53839 0.53839s0.53839-0.24106 0.53839-0.53839v-0.96279h1.39l0.8197 9.1281h-10.159z"
                fill="#fff"
              />
            </svg>
            Add to cart
          </button>
        </li>
        <li class="thumb__button-item">
          <a href="product/${id}" class="thumb__button">
            <svg fill="none" viewBox="0 0 15 15" width="15px" height="15px">
              <path
                d="m14.502 13.655-3.2256-3.2256c0.9111-1.1045 1.4062-2.4785 1.4062-3.9258 0-1.6524-0.6416-3.2022-1.8105-4.3711-1.166-1.1689-2.7188-1.8105-4.3682-1.8105-1.6494 0-3.2022 0.6416-4.3711 1.8105-1.1689 1.166-1.8105 2.7188-1.8105 4.3711 0 1.6494 0.6416 3.2021 1.8105 4.3711 1.166 1.166 2.7188 1.8105 4.3711 1.8105 1.4502 0 2.8242-0.4951 3.9258-1.4062l3.2256 3.2227c0.2343 0.2343 0.6123 0.2343 0.8467 0 0.2343-0.2344 0.2343-0.6124 0-0.8467zm-11.523-3.6299c-0.94336-0.94044-1.4619-2.1914-1.4619-3.5215 0-1.3301 0.51855-2.584 1.459-3.5244s2.1914-1.459 3.5244-1.459c1.3301 0 2.584 0.51855 3.5244 1.459 0.9404 0.94043 1.459 2.1914 1.459 3.5244 0 1.3301-0.5186 2.584-1.459 3.5244-0.94044 0.9405-2.1944 1.459-3.5244 1.459-1.3301 0-2.5811-0.5185-3.5215-1.4619z"
                fill="#000"
              />
            </svg>
          </a>
        </li>
      </ul>
    </div>
    <div class="raiting">
      <div class="clip-star"></div>
      <div class="clip-star"></div>
      <div class="clip-star"></div>
      ${
        raiting === 3
          ? `<div class="clip-star clip-star--empty"></div>
          <div class="clip-star clip-star--empty"></div>`
          : raiting === 4
          ? `<div class="clip-star"></div>
          <div class="clip-star clip-star--empty"></div>`
          : raiting === 5
          ? `<div class="clip-star"></div>
          <div class="clip-star"></div>`
          : ''
      }
    </div>
    <p class="card-item__text">${title}</p>
    <p class="card-item__price">${price}
      ${old_price ? `<span class="card-item__price card-item__old-price">${old_price}</span>` : ''}
    </p>
  </li>
  `;

  return markup;
}
