import "whatwg-fetch";
import { baseApiUrl } from "../../../config";

const UserService = {
  API: baseApiUrl,
  USER: "users",

  async getAll() {
    if (typeof window === "undefined") return false;

    const response = await fetch(
      this.API + this.USER, {
        method: 'GET',
        headers: {
          Accept: "application/json"
        }
      }).catch(function(ex) {
        return { err: ex };
      });

    if (typeof response.text === 'undefined') return {};

    return await response.json();
  },

  async getSingle(id) {
    if (typeof window === "undefined") return false;

    const response = await fetch(
      this.API + this.USER + '/' + id, {
        method: 'GET',
        headers: {
          Accept: "application/json"
        }
      }).catch(function(ex) {
        return { err: ex };
      });

    if (typeof response.text === 'undefined') return {};

    return await response.json();
  },

  async deleteSingle(id) {
    if (typeof window === "undefined") return false;

    const response = await fetch(
      this.API + this.USER + '/' + id, {
        method: 'DELETE',
        headers: {
          Accept: "application/json"
        }
      }).catch(function(ex) {
        return { err: ex };
      });

    if (typeof response.text === 'undefined') return {};

    return await response.json();
  },

  async createSingle(userData) {
    if (typeof window === "undefined") return false;

    const response = await fetch(
      this.API + this.USER, {
        method: 'POST',
        headers: {
          Accept: "application/json"
        },
        body: JSON.stringify(userData)
      }).catch(function(ex) {
        return { err: ex };
      });

    if (typeof response.text === 'undefined') return {};

    return await response.json();
  },

  async updateSingle(id, userData) {
    if (typeof window === "undefined") return false;

    const response = await fetch(
      this.API + this.USER + '/' + id, {
        method: 'PUT',
        headers: {
          Accept: "application/json"
        },
        body: JSON.stringify(userData)
      }).catch(function(ex) {
        return { err: ex };
      });

    if (typeof response.text === 'undefined') return {};

    return await response.json();
  }
};

export default UserService;
