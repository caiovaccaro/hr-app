import { baseApiUrl } from "../../config";

if (process.env.IS_BROWSER) {
  require('whatwg-fetch');
}

const CommentsService = {
  API: baseApiUrl,
  COMMENTS: "comments",

  async getAll(userId) {
    if (typeof window === "undefined") return false;

    const response = await fetch(
      this.API + '/users/' + userId + '/' + this.COMMENTS, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json"
        }
      });

    if (response.ok) {
      return await response.json();
    } else {
      return Promise.reject({
        status: response.status,
        statusText: response.statusText,
        response: JSON.stringify(response)
      });
    }
  },

  async createSingle(data) {
    if (typeof window === "undefined") return false;

    const response = await fetch(
      this.API + this.COMMENTS, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

    if (response.ok) {
      return await response.json();
    } else {
      return Promise.reject({
        status: response.status,
        statusText: response.statusText,
        response: JSON.stringify(response)
      });
    }
  }
};

export default CommentsService;
