class Api {
  constructor() {
    this.like_url = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/0TcGatzACGyS9TB2cu04/likes/';
    this.comment_url = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/0TcGatzACGyS9TB2cu04/comments/';
    this.meal_url = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert';
  }

  promisedData = (obj = null) => {
    const option = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(obj),
    };
    return (async () => {
      let dataHolder;
      try {
        dataHolder = await (await fetch(this.meal_url, obj ? option : [])).json();
      } catch (err) {
        dataHolder = new Error('Oops ! Something went wrong ...').message;
      }
      return dataHolder;
    })();
  }

  get = async () => {
    const data = await this.promisedData();
    return data;
  }

  post = async (obj) => {
    let data;
    if (obj.user !== '' && obj.score !== '') {
      data = await this.promisedData(obj);
    } else {
      data = new Error('Please fill the form, before submission ...').message;
    }
    return data;
  }
}

export default new Api();
