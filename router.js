import HomePage from './pages/home.js';
import AboutPage from './pages/about.js';
import ContactPage from './pages/contact.js';
import NotFoundPage from './pages/404.js';
import NotepadPage from './pages/notepad.js';

const routes = {
  "/": HomePage,
  "/about": AboutPage,
  "/contact": ContactPage,
  "/notepads/:id": NotepadPage,
  "/404": NotFoundPage,
};

function navigate(path) {
  window.history.pushState({}, path, window.location.origin + path);
  updateContent();
}

async function updateContent() {
  const path = window.location.pathname;
  const parts = path.split("/");

  if (parts[1] === "notepads" && parts.length === 3) {
    const notepadId = parts[2];
    const component = await routes["/notepads/:id"](notepadId);
    document.getElementById("app").innerHTML = component;
  } else {
    const route = routes[path] || routes["/404"];
    const component = await route();
    document.getElementById("app").innerHTML = component;
  }
}

async function handleInitialLoad() {
  const path = window.location.pathname;
  const parts = path.split("/");

  if (parts[1] === "notepads" && parts.length === 3) {
    await updateContent();
  }
}

window.onpopstate = async () => await updateContent();
window.addEventListener('DOMContentLoaded', handleInitialLoad);


export { navigate, updateContent };
