import Api from '../../modules/Api.js';
import './Popup.css';

const popUpFunction = async (id) => {
  const overlay = document.getElementById('overlay');
  overlay.classList.remove('disable');
  const resultant = await Api.get(`search_meal=${id}`);
  const [meals] = resultant.meals;
  overlay.textContent = '';
  overlay.innerHTML = `
    <div class="modalWindow">
    <div id="recipe"> 
      <button id="hide-recipe"> X</button>
      <img src=${meals.strMealThumb} class="ingredient-img">
      <div class="foodname">
        <h2>${meals.strMeal}</h2>
      </div>
      <ul class="ingredients"></ul>
      <div class="people-comment">
        <h2 class="comment-heading">Comments( <span class="counter">0</span> )</h2>
      </div>
      <div class="commentlist">
        <ul class="commentUnorderedList"></ul>
      </div>
      <div class="commenttext">
        <h2>Add a comment</h2>
      </div>
      <form class="forms" id=${id}>
        <input type="text" placeholder="Enter your name" id="comment-name" />
        <textarea id="commentsms" name="message" rows="4" cols="50" placeholder="Your insights" required></textarea>
        <button class="combutton" type="submit">Comment</button>
      </form>
    </div>
  </div>
  `;
  const recipe = document.getElementById('recipe');
  recipe.style.display = 'block';

  const parent = document.querySelector('.ingredients');

  const hideRecipe = document.getElementById('hide-recipe');
  const ingredients = Object.keys(meals).filter((each) => each.includes('strIngredient') && meals[each] !== '' && meals[each] !== null);

  ingredients.forEach((each) => {
    const child = document.createElement('li');
    child.className = 'ingredient-list';
    child.textContent = meals[each];
    parent.appendChild(child);
  });

  hideRecipe.addEventListener('click', () => {
    recipe.style.display = 'none';
    overlay.classList.add('disable');
  });
};

export default popUpFunction;