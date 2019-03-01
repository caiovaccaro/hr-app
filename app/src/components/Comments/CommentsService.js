import "whatwg-fetch";
import { baseApiUrl } from "../../../config";

const CommentsService = {
  API: baseApiUrl,
  COMMENTS: "comments",

  async getAll(userId) {
    if (typeof window === "undefined") return false;

    const response = await fetch(
      this.API + '/users/' + userId + '/' + this.COMMENTS, {
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
      this.API + this.COMMENTS + '/' + id, {
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
      this.API + this.COMMENTS + '/' + id, {
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
      this.API + this.COMMENTS, {
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
      this.API + this.COMMENTS + '/' + id, {
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

export default CommentsService;
