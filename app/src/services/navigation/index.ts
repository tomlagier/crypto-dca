export const paths = {
  HOME: '/',
  WALLETS: '/wallets',
  TRANSACTIONS: '/transactions',
  PORTFOLIO: '/portfolio'
};

export const pathFromIndex = (i: number) =>
  Object.entries(paths)[i][1];

export const indexFromPath = (path: string) =>
  Object.values(paths).indexOf(path);
