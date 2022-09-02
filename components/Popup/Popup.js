import Api from '../../modules/Api.js';
import './Popup.css';

const commentCreationFunction = (obj) => {
  const commentList = document.createElement('li');
  commentList.className = 'commentUsers';
  const { creation_date: creationDate, username, comment } = obj;
  commentList.textContent = `${creationDate} ${username} : ${comment}`;
  return commentList;
};

const commentCounterHandler = async (id, addNew = false) => {
  const commentCounter = document.querySelector('.comment-heading .counter');
  const commentContainer = document.querySelector('.commentUnorderedList');
  try {
    const result = await Api.get(`commenting_meal=${id}`);
    let counter = 0;
    result.forEach((each) => {
      commentContainer.append(commentCreationFunction(each));
      if (!addNew) {
        counter = Number(commentCounter.textContent);
      }
      counter += 1;
      commentCounter.textContent = counter;
    });
  } catch (err) {
    commentContainer.textContent = 'Comment Not Found !!';
  }
};

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

  const commentContainer = document.querySelector('.commentUnorderedList');
  const parent = document.querySelector('.ingredients');

  const hideRecipe = document.getElementById('hide-recipe');

  const ingredients = Object.keys(meals).filter((each) => each.includes('strIngredient') && meals[each] !== '' && meals[each] !== null);
  const formComment = document.querySelector('.forms');

  const commentCounter = document.querySelector('.comment-heading .counter');

  // try {
  //   const result = await Api.get(`commenting_meal=${id}`);
  //   result.forEach((each) => {
  //     commentContainer.append(commentCreationFunction(each));
  //     let counter = Number(commentCounter.textContent);
  //     counter += 1;
  //     commentCounter.textContent = counter;
  //   });
  // } catch (err) {
  //   commentContainer.textContent = 'Comment Not Found !!';
  // }
  commentCounterHandler(id);
  
  formComment.addEventListener('submit', (e) => {
    e.preventDefault();
    const { id } = e.target;
    (async () => {
      const commentContainer = document.querySelector('.commentUnorderedList');
      const commentCounter = document.querySelector('.comment-heading .counter');
      const username = document.querySelector('#comment-name').value;
      const comment = document.querySelector('#commentsms').value;
      const resultant = await Api.post({
        username,
        comment,
        item_id: id,
        type: 'comment',
      });
      commentContainer.textContent = '';
      commentCounterHandler(id, true);
    })();
    e.target.reset();
  });

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