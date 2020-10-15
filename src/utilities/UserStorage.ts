import LocalStorageWorker from '@utils/LocalStorageWorker';

export default class UserStorage {
  storageWorker: LocalStorageWorker;

  // main key that use for store
  storageKey: string;

  data: any;

  constructor(storageKey: string) {
    this.storageWorker = new LocalStorageWorker();

    this.storageKey = storageKey;

    this.data = {};
  }

  clear() {
    // remove data by key from storage
    this.storageWorker.add(this.storageKey, '');

    // or remove with key
    //this.storageWorker.remove(this.storageKey);
  }

  // save to storage (save as JSON string)
  save() {
    // var jsonEmails = JSON.stringify(this.addresses);
    // this.storageWorker.add(this.storageKey, jsonEmails);
  }
}
