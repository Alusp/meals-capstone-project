import {
  List, Paragraph, ChildText, Button,
  Input, Form,
} from '../../HOC/HtmlElements.js';

import Api from '../../modules/Api.js';

import './Main.css';

const UnorderList = document.querySelector('.playerList');
const sectionForm = document.querySelector('.section-form');

const delay = (time) => new Promise((resolve) => {
  setTimeout(resolve, time);
});

const msg = Paragraph({
  className: 'messages',
});

sectionForm.insertAdjacentElement('beforeend', msg);

const scoreBoardHandler = (onLoad = true) => {
  (async () => {
    const msg = document.querySelector('.messages');
    const resultant = await Api.get();
    if (typeof resultant === 'string') {
      msg.textContent = resultant;
      msg.classList.add('warning');
      await delay(5000);
      msg.classList.remove('warning');
      return false;
    }
    const { result } = resultant;
    msg.textContent = onLoad ? 'Score Added Successfully' : 'List Updated Successfully ';
    msg.className = 'messages';
    msg.classList.add('success');
    UnorderList.textContent = '';
    result.forEach((eachList, index) => {
      const list = List({
        className: 'player',
        id: `playerID-${index + 1}`,
      });

      const paragraph = Paragraph({
        className: 'player_detail',
        textContent: `${eachList.user}: `,
      });

      const span = ChildText({
        className: 'score',
        textContent: eachList.score,
      });

      paragraph.append(span);
      list.append(paragraph);
      UnorderList.append(list);
    });
    await delay(2000);
    msg.classList.remove('success');
    return true;
  })();
};

const Main = () => {
  const refreshContainer = document.querySelector('.section-refresh_container');

  const errorMessage = Paragraph({
    className: 'player_detail',
    textContent: '!! Please Add Some Data !!',
  });

  const button = Button({
    textContent: 'Refresh',
    className: 'refresh-btn',
    onclick: () => {
      scoreBoardHandler(false);
      if (UnorderList.children.length < 1) {
        UnorderList.append(errorMessage);
      }
    },
  });
  refreshContainer.appendChild(button);

  const playerNameInput = Input({
    type: 'text',
    className: 'input',
    placeholder: 'Your name',
    ariaLabel: 'please enter yourname',
  });

  const playerScoreInput = Input({
    type: 'number',
    className: 'input',
    placeholder: 'Your score',
    ariaLabel: 'please try to attempy wisely',
  });

  const submit = Input({
    type: 'submit',
    className: 'input submit-btn',
    value: 'Submit',
    ariaLabel: 'please submit button to check result',
  });

  const form = Form({
    className: 'form',
    onsubmit: (e) => {
      e.preventDefault();
      const user = playerNameInput.value;
      const score = playerScoreInput.value;
      (async () => {
        const resultant = await Api.post({ user, score });
        if (typeof resultant === 'string') {
          msg.textContent = resultant;
          msg.classList.add('warning');
          await delay(5000);
          msg.classList.remove('warning');
          return false;
        }
        form.reset();
        scoreBoardHandler();
        return true;
      })();
    },
  });

  form.append(
    playerNameInput,
    playerScoreInput,
    submit,
  );
  if (UnorderList.children.length < 1) {
    const msg = document.querySelector('.messages');
    errorMessage.textContent = 'please wait...';
    msg.textContent = 'please wait...';
    msg.classList.add('process');
    UnorderList.append(errorMessage);
  }
  scoreBoardHandler(false);
  sectionForm.append(form);
};

export default Main;