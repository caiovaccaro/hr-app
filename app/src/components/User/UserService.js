import { baseApiUrl } from "../../config";

if (process.env.IS_BROWSER) {
  require('whatwg-fetch');
}

const UserService = {
  API: baseApiUrl,
  USER: "users",

  async getAll() {
    if (typeof window === "undefined") return false;

    const response = await fetch(
      this.API + this.USER, {
        method: 'GET',
        headers: {
          ContentType: "application/json"
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

  async getSingle(id) {
    if (typeof window === "undefined") return false;

    const response = await fetch(
      this.API + this.USER + '/' + id, {
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

  async deleteSingle(id) {
    if (typeof window === "undefined") return false;

    const response = await fetch(
      this.API + this.USER + '/' + id, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json"
        }
      });

    if (response.ok) {
      return response;
    } else {
      return Promise.reject({
        status: response.status,
        statusText: response.statusText,
        response: JSON.stringify(response)
      });
    }
  },

  async createSingle(userData) {
    if (typeof window === "undefined") return false;

    const response = await fetch(
      this.API + this.USER, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
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

  async updateSingle(id, userData) {
    if (typeof window === "undefined") return false;

    const response = await fetch(
      this.API + this.USER + '/' + id, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
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

  async uploadImage(image) {
    if (typeof window === "undefined") return false;

    const data = new FormData();
    data.append('profilepic', image);

    const response = await fetch(
      '/upload', {
        method: 'POST',
        body: data
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

export default UserService;
