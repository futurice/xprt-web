let MenuRoutes = {
  '/': 'routeHome',
  '/lectures': 'routeLecture'
};

let MiscRoutes = {
  '/login': 'routeLogin',
  '/sessions/:id': 'routeFeedbackDetails',
  '/lectures/:id': 'routeLecturesDetails',
  '/preferences': 'routePreferences',
  '/logout': 'routeLogout'
};

export { MenuRoutes, MiscRoutes };
