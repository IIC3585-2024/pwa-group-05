import { updateContent } from './router.js';
import { registerServiceWorker } from './swManager.js';
import { requestNotificationPermission, setupFireBase } from './firebase.js';

import './ui.js';


registerServiceWorker();

setupFireBase();
updateContent();
requestNotificationPermission();