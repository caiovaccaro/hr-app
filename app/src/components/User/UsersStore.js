//@flow
import { observable, action } from "mobx";
import UserService from "./UserService";
import CommentsService from "../Comments/CommentsService";

export default class UsersStore {
  rootStore: any;

  @observable users = [];

  @action.bound
  async getUsersData() {
    if (typeof window === 'undefined') return false;

  	const data = await UserService.getAll().catch((err) => {
      console.log("Não foi possível ler os usuários.", err);
      return;
    });

    if (data) {
      this.users = data.users;
    }
  }

  async getComments(userId) {
    if (typeof window === 'undefined') return false;
    if (!userId) return false;

  	const data = await CommentsService.getAll(userId).catch((err) => {
      console.log("Não foi possível ler os comentários.", err);
      return;
    });

    if (data) {
      return data;
    }
  }

  async createComment(data) {
    if (typeof window === 'undefined') return false;

    const response = await CommentsService.createSingle({ comment: data }).catch((err) => {
      console.log("Não foi possível criar o comentário ", err);
      return;
    });

    if (response && response.comment) {
      return response.comment;
    }
  }

  @action.bound
  async deleteUser(id) {
    if (typeof window === 'undefined') return false;
    if (!id) return false;

    // eslint-disable-next-line no-restricted-globals
    const confirmed = confirm("Tem certeza que quer deletar este usuário?");

    if (confirmed) {
      const response = await UserService.deleteSingle(id).catch((err) => {
        console.log("Não foi possível deletar o usuário " + id, err);
        return;
      });

      this.getUsersData();
      return response;
    }
  }

  async getUser(id) {
    if (typeof window === 'undefined') return false;
    if (!id) return false;

    const response = await UserService.getSingle(id).catch((err) => {
      console.log("Não foi possível visualizar o usuário " + id, err);
      return;
    });

    if (response && response.user) {
      return response.user;
    }
  }

  async updateUser(id, data) {
    if (typeof window === 'undefined') return false;
    if (!id) return false;

    const response = await UserService.updateSingle(id, { user: data }).catch((err) => {
      console.log("Não foi possível atualizar o usuário " + id, err);
      return;
    });

    if (response && response.user) {
      return response.user;
    }
  }

  async createUser(data) {
    if (typeof window === 'undefined') return false;

    const response = await UserService.createSingle({ user: data }).catch((err) => {
      console.log("Não foi possível criar o usuário ", err);
      return;
    });

    if (response && response.user) {
      return response.user;
    }
  }

  async uploadImage(image) {
    if (typeof window === 'undefined') return false;

    const response = await UserService.uploadImage(image).catch((err) => {
      console.log("Não foi possível enviar a imagem ", err);
      return;
    });

    if (response && response.public_id) {
      return response.url;
    }
  }
}
