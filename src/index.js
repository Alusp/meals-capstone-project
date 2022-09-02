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
  const allMenuItem = document.querySelectorAll('.meals-grid_wrapper-list');
  if (getNode.textContent === 'Most Liked') {
    allMenuItem.forEach((each) => {
      const counter = each.querySelector('.counter');
      if (counter.textContent === '(0)') {
        each.classList.add('display-none');
      }
    });
  } else if (getNode.textContent.includes('Meals')) {
    allMenuItem.forEach((each) => {
      const counter = each.querySelector('.counter');
      if (counter.textContent === '(0)') {
        each.classList.remove('display-none');
      }
    });
  }
});