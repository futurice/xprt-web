let MenuRoutes = {
  '/': 'routeHome',
  '/lectures': 'routeLecture',
  '/experts': 'routeExpert'
};

let MiscRoutes = {
  '/login': 'routeLogin',
  '/sessions/:id': 'routeFeedbackDetails',
  '/lectures/:id': 'routeLecturesDetails',
  '/experts/:id': 'routeExpertsDetails',
  '/preferences': 'routePreferences',
  '/logout': 'routeLogout'
};

export { MenuRoutes, MiscRoutes };
