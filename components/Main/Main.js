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
  className: 'meals-grid_wrapper mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mt-12',
});

const likeApiHandler = (resultant, id) => resultant.filter((each) => each.item_id === id);

const mealContainer = () => {
  (async () => {
    const resultant = await Api.get('getting_meal');
    // if (typeof resultant === 'string') {
    //   // a
    // }
    const { meals } = resultant;
    ListContainer.textContent = '';
    const likeResultant = await Api.get({ type: 'like' });

    meals.forEach((eachList) => {
      const list = List({
        className: 'meals-grid_wrapper-list card w-full shadow-xl rounded-lg pb-8 overflow-hidden my-3',
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
        className: 'checkbox-wrapper mt-2',
        for: `like-count-${eachList.idMeal}`,
      });

      const iTag = Wrapper({
        component: 'i',
        className: 'fa-solid fa-heart icon',
      });

      const [likeObj] = likeApiHandler(likeResultant, eachList.idMeal);

      const counterP = Paragraph({
        className: 'counter',
        textContent: `(${likeObj ? likeObj.likes : 0})`,
      });

      const input = Input({
        type: 'checkbox',
        className: 'like-checkbox',
        id: `like-count-${eachList.idMeal}`,
        name: `like-count-${eachList.idMeal}`,
        onclick: (e) => (async () => {
          if (e.target.checked) {
            await Api.post({ item_id: eachList.idMeal, type: 'like' }, true);
            let counter = Number(counterP.textContent.replace('(', '').replace(')', '').trim());
            counter += 1;
            counterP.textContent = `(${counter})`;
          }
        })(),
      });

      label.append(input, iTag);

      div4.append(label, counterP);

      const btn = Button({
        className: 'comment-btn py-2 px-10 border border-orange-700 rounded-full text-orange-700 hover:bg-orange-700 hover:text-orange-100 text-lg',
        textContent: 'comments',
        onclick: () => popUpFunction(eachList.idMeal),
      });

      div3.append(div4, btn);

      article.append(div1, h2, div3);

      list.append(article);

      ul.append(list);
      const mealsCounter = document.querySelector('.meal-item__counter');
      mealsCounter.textContent = ul.children.length;
    });
  })();
  return ul;
};

const Main = () => mealContainer();

export default Main;