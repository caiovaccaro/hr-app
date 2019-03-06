//@flow
import UsersStore from "./components/User/UsersStore";
import ActivityStore from "./components/Activity/ActivityStore";

// Stores are holders of data and application logic.
// They feed the components with observable data.
export default class RootStore {
  // Domain specific data are loaded in domain stores, such as Search and Filter.
  /**
   * @type Class<UserStore>
   */
  userStore: any;

  constructor() {
    // They are instantiated here, at the Root Store to be loaded through the main Provider.
    this.userStore = new UsersStore();
    this.activityStore = new ActivityStore();
  }
}
