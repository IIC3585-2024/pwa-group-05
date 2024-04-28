const routes = {
  '/': './pages/index.js',
  '/notepads/:id': './pages/notepad.js',
  '*': './pages/404.js'
};

function router() {
  const path = window.location.pathname;
  for (const route in routes) {
    if (route === '*') continue;
    
    const regex = new RegExp(`^${route.replace(/:\w+/g, "([^/]+)")}$`);
    const match = path.match(regex);

    if (match) {
      const params = match.slice(1);
      const templateUrl = routes[route];
      loadTemplate(templateUrl, [...params]);
      updateBrowserHistory(route, params);
      return;
    }
  }

  loadTemplate(routes['*']);
  updateBrowserHistory('/404');
}

async function loadTemplate(templateUrl, params = []) {
  try {
    const module = await import(templateUrl);
    const template = module.default;
    const htmlPromise = template(params);
    const html = await htmlPromise;
    document.getElementById('app').innerHTML = html;
  } catch (error) {
    console.error('Error loading template:', error);
  }
}



function updateBrowserHistory(route, params = []) {
  const url = route.replace(/:\w+/g, () => params.shift());
  window.history.pushState({}, '', url);
}

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });

  router();
});

export function navigateTo(url) {
  window.history.pushState({}, "", url);
  router();
}

export default router;
