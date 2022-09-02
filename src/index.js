import './style.css';
import Main from '../components/Main/Main.js';

const menuParent = document.querySelector('.nav-menu_ul');

const allMenu = document.querySelectorAll('.nav-menu_option');
const root = document.querySelector('#root');
root.append(Main());

menuParent.addEventListener('click', (e) => {
  allMenu.forEach((each) => each.classList.remove('active'));
  e.target.classList.add('active');
  const getNode = e.target;
  if (getNode.textContent === 'Most Liked') {
    const allMenuItem = document.querySelectorAll('.meals-grid_wrapper-list');
    allMenuItem.forEach((each) => {
      const counter = each.querySelector('.counter');
      if (counter.textContent === '(0)') {
        each.remove();
      }
    });
  } else if (getNode.textContent.includes('Meals')) {
    root.append(Main());
  }
});