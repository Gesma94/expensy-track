export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  WALLET: {
    ROOT: '/wallet',
    PATHS: {
      NAME: ':name'
    },
    NAME: function (name?: string) {
      return `/wallet/${name ?? this.PATHS.NAME}`;
    }
  }
};
