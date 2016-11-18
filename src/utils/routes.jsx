let MenuRoutes = {
  '/': 'routeHome',
  '/lectures': 'routeLecture',
  '/experts': 'routeExpert',
  '/teachers': 'routeTeacher'
};

let MiscRoutes = {
  '/login': 'routeLogin',
  '/sessions/:id': 'routeFeedbackDetails',
  '/lectures/:id': 'routeLecturesDetails',
  '/lecture/new': 'routeLectureNew',
  '/experts/:id': 'routeExpertsDetails',
  '/teachers/:id': 'routeExpertsDetails',
  '/preferences': 'routePreferences',
  '/logout': 'routeLogout'
};

export { MenuRoutes, MiscRoutes };
