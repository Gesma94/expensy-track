export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  WALLETS: {
    ROOT: '/wallets',
    PATHS: {
      NAME: ':name'
    },
    NAME: function (name?: string) {
      return `/${this.ROOT}/${name ?? this.PATHS.NAME}`;
    }
  },
  CATEGORIES: {
    ROOT: '/categories'
  }
};
