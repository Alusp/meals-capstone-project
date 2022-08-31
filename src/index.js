import "./style.css"
import Api from "../modules/Api";

const getData = new Api();
(async () => {
  const { meals } = await getData.get();
  meals.forEach((each) => {
    console.log(each.idMeal);
  })
})();