//@flow

// Since Components only access directly properties and observers from Stores,
// all public methods that change them (state) are exported here and called Actions.
export default class Actions {
  constructor(rootStore: any) {
    this.rootStore = rootStore;
    this._setActions();
  }

  rootStore: any;

  /**
   * Action that triggers a user search.
   * @type Function
   * */
  searchUser: Function;

  /**
   * Action that gets all user data.
   * @type Function
   * */
  getUsersData: Function;

  /**
   * Action that deletes a single user given its id.
   * @type Function
   * */
  deleteUser: Function;

  /**
   * Action that gets a single user given its id.
   * @type Function
   * */
  getUser: Function;

  /**
   * Action that updates a single user given its id.
   * @type Function
   * */
  updateUser: Function;

  /**
   * Action that create a new user.
   * @type Function
   * */
  createUser: Function;

  /**
   * Action to get users comments.
   */
  getComments: Function;

  /**
   * Action to create a comment.
   */
  createComment: Function;

  /**
   * Action to upload image.
   */
  uploadImage: Function;

  /**
   * Action to create an activity log.
   */
  setActivity: Function;

  /**
   * Private method to setup store actions once rootStore have been set.
   * @type Function
   * */
  _setActions() {
    this.getUsersData = this.rootStore.userStore.getUsersData;
    this.searchUser = this.rootStore.userStore.searchUser;
    this.deleteUser = this.rootStore.userStore.deleteUser;
    this.getUser = this.rootStore.userStore.getUser;
    this.updateUser = this.rootStore.userStore.updateUser;
    this.createUser = this.rootStore.userStore.createUser;
    this.getComments = this.rootStore.userStore.getComments;
    this.createComment = this.rootStore.userStore.createComment;
    this.uploadImage = this.rootStore.userStore.uploadImage;
    this.setActivity = this.rootStore.activityStore.setActivity;
  }
}
