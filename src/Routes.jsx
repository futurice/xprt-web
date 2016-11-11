let MenuRoutes = {
  '/': 'routeHome',
  '/lectures': 'routeLecture',
  '/sessions': 'routeFeedback'
};

let MiscRoutes = {
  '/login': 'routeLogin',
  '/sessions/:id': 'routeFeedbackDetails',
  '/preferences': 'routePreferences',
  '/logout': 'routeLogout'
};

export { MenuRoutes, MiscRoutes };
