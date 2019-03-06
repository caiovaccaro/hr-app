//@flow
import { observable, action } from "mobx";

export default class Activity {
  rootStore: any;

  @observable activities = [];

  @action.bound
  setActivity(data) {
    const now = new Date();

    let activityName;
    let activity = {
      name: "",
      value: data.comment ? data.comment.value : "",
      picture: data.userPicture,
      id: data.userId,
      date: now.getDate() + '/' + now.getMonth()
    }

    if (data.user && data.user.name) {
      activityName = "Nome alterado.";
    }
    if (data.user && data.user.picture) {
      activityName = "Foto alterada.";
    }
    if (data.comment) {
      activityName = "Comentário adicionado.";
    }

    activity.name = activityName;

    this.activities.unshift(activity);
  }
}
