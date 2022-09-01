import {
  List, Paragraph, Button,
  ListContainer, Wrapper,
  Image, SecondaryHeading, Input,
} from '../../HOC/HtmlElements.js';

import Api from '../../modules/Api.js';
import popUpFunction from '../Popup/Popup.js';

import './Main.css';

const ul = ListContainer({
  component: 'ul',
  className: 'meals-grid_wrapper',
});

// const delay = (time) => new Promise((resolve) => {
//   setTimeout(resolve, time);
// });

// sectionForm.insertAdjacentElement('beforeend', msg);

const mealContainer = () => {
  (async () => {
    const resultant = await Api.get('getting_meal');
    if (typeof resultant === 'string') {
      // a
    }
    const { meals } = resultant;
    ListContainer.textContent = '';
    meals.forEach((eachList) => {
      const list = List({
        className: 'meals-grid_wrapper-list',
        id: `meal-card-${eachList.idMeal}`,
      });

      const article = Wrapper({
        component: 'article',
        className: 'meals-grid_wrapper-article',
      });

      const div1 = Wrapper({
        component: 'div',
        className: 'meals-grid_wrapper-article__img-wrapper',
      });

      const img = Image({
        src: eachList.strMealThumb,
        className: 'img',
        alt: 'meals',
      });

      div1.append(img);

      const h2 = SecondaryHeading({
        className: 'meal-title',
        textContent: eachList.strMeal,
      });

      const div3 = Wrapper({
        component: 'div',
        className: 'user_interaction',
      });

      const div4 = Wrapper({
        component: 'div',
        className: 'like-wrapper',
      });

      const label = Wrapper({
        component: 'label',
        className: 'checkbox-wrapper',
        for: `like-count-${eachList.idMeal}`,
      });

      const iTag = Wrapper({
        component: 'i',
        className: 'fa-solid fa-heart icon',
      });

      const counterP = Paragraph({
        className: 'counter',
        textContent: '(0)',
      });

      const input = Input({
        type: 'checkbox',
        className: 'like-checkbox',
        id: `like-count-${eachList.idMeal}`,
        name: `like-count-${eachList.idMeal}`,
        onclick: (e) => (async () => {
          if (e.target.checked) {
            await Api.post({ item_id: eachList.idMeal, type: 'like' }, true);
            const getCounter = Number(counterP.textContent.replace('(', '').replace(')', '').trim());
            // counterP.textContent = getCounter + 1;
          }
        })(),
      });

      label.append(input, iTag);

      div4.append(label, counterP);

      const btn = Button({
        className: 'comment-btn',
        textContent: 'comments',
        onclick: () => popUpFunction(eachList.idMeal),
      });

      div3.append(div4, btn);

      article.append(div1, h2, div3);

      list.append(article);

      ul.append(list);
    });
  })();
  return ul;
};

const Main = () => mealContainer();

export default Main;