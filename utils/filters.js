import user_account from "../fixtures/user-data.json";

export function filterAccounts(credential) {
  return user_account.filter((data) => data.credential === credential);
}

export function findAccount(credential) {
  return user_account.find((data) => data.credential === credential);
}

export const filters = {
  validAccounts: filterAccounts("valid credential"),
};

export const finds = {
  lockedUsername: findAccount("locked username"),
  incorrectedUsername: findAccount("incorrect username"),
  incorrectedPassword: findAccount("incorrect password"),
  emptyUsername: findAccount("empty username"),
  emptyPassword: findAccount("empty password"),
};