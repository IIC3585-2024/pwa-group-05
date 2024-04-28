import { updateContent } from './router.js';
import { registerServiceWorker } from './swManager.js';

import './ui.js';


registerServiceWorker();

updateContent();