import './style.css';
import Api from '../modules/Api.js';

const getData = new Api();
(async () => {
  const { meals } = await getData.get();
  meals.forEach((each) => {
    console.log(each.idMeal);
  });
})();