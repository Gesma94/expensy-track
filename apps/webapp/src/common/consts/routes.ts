export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  WALLETS: {
    ROOT: '/wallets',
    PATHS: {
      ID: ':id'
    },
    ID: function (id?: string) {
      return `${this.ROOT}/${id ?? this.PATHS.ID}`;
    }
  },
  CATEGORIES: {
    ROOT: '/categories'
  },
  LABELS: {
    ROOT: '/labels'
  },
  BUDGETS: {
    ROOT: '/budgets',
    CREATE: function () {
      return `${this.ROOT}/create`;
    }
  }
};
