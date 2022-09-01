class Api {
  constructor() {
    this.like_url = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/0TcGatzACGyS9TB2cu04/likes/';
    this.comment_url = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/0TcGatzACGyS9TB2cu04/comments/';
    this.meal_url = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert';
    this.search_meal = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
  }

  promisedData = (obj = null, post = false) => {
    const option = (obj) => {
      const opt = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(obj),
      };
      return opt;
    };

    return (async () => {
      let dataHolder;
      try {
        let url = this.meal_url;
        if (!post) {
          if (typeof obj === 'string') {
            if (obj.includes('search_meal')) {
              const id = obj.split('=')[1];
              url = this.search_meal + id;
              obj = null;
            } else if (obj.includes('commenting_meal')) {
              const id = obj.split('=')[1];
              url = `${this.comment_url}?item_id=${id}`;
              obj = null;
            } else {
              obj = null;
            }
          } else if (obj.type === 'comment') {
            const id = obj.item_id;
            url = `${this.comment_url}?item_id=${id}`;
          } else {
            url = this.like_url;
            obj = null;
          }
          dataHolder = await (await fetch(url, obj ? option(obj) : [])).json();
        } else if (obj.type === 'comment') {
          url = this.comment_url;
          delete obj.type;
          dataHolder = await (await fetch(url, obj ? option(obj) : [])).text();
        } else if (obj.type === 'like') {
          url = this.like_url;
          delete obj.type;
          dataHolder = await (await fetch(url, obj ? option(obj) : [])).text();
        }
      } catch (err) {
        dataHolder = new Error('Oops ! Something went wrong ...').message;
      }
      return dataHolder;
    })();
  }

  get = async (query = null) => {
    const data = await this.promisedData(query);
    return data;
  }

  post = async (obj, like = false) => {
    let data;
    if (like) {
      data = await this.promisedData(obj, like);
    } else if (obj.username !== '' && obj.comment !== '') {
      data = await this.promisedData(obj, like);
    } else {
      data = new Error('Please fill the form, before submission ...').message;
    }
    return data;
  }
}

export default new Api();
