
class Api {

 get(query = null) {
  const promiseData = new Promise((resolve) => {
   resolve({
      "meals" : [
        {
        "strMeal": "Apam balik",
        "strMealThumb": "https://www.themealdb.com/images/media/meals/adxcbq1619787919.jpg",
        "idMeal": "53049"
        },
        {
        "strMeal": "Apple & Blackberry Crumble",
        "strMealThumb": "https://www.themealdb.com/images/media/meals/xvsurr1511719182.jpg",
        "idMeal": "52893"
        },
        {
        "strMeal": "Apple Frangipan Tart",
        "strMealThumb": "https://www.themealdb.com/images/media/meals/wxywrq1468235067.jpg",
        "idMeal": "52768"
        },
        {
        "strMeal": "Bakewell tart",
        "strMealThumb": "https://www.themealdb.com/images/media/meals/wyrqqq1468233628.jpg",
        "idMeal": "52767"
        },
      ],
    });
  });
    return promiseData;
  }
}
module.exports = new Api();