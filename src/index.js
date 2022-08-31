import "./style.css"
import Api from "../modules/Api";

const getData = Api;
const { meals } = getData.get();
meals.forEach((each) => {
  console.log(each.idMeal);
})