export const setLoginCookie = (cookieName, CookieObj, expirationDays) => {
  const expirationDate = new Date();
  expirationDate.setTime(
    expirationDate.getTime() + expirationDays * 24 * 60 * 60 * 1000,
  );

  const expires = expirationDate.toUTCString();
  const cookieData = CookieObj ? JSON.stringify(CookieObj) : null;

  document.cookie = `${cookieName}=${cookieData};expires=${expires};path=/`;
};

export const getLoginCookieUser = (cookieName) => {
  const loggedUser = document.cookie
    ?.split(';')
    ?.find((cookie) => cookie.indexOf(cookieName) !== -1)
    ?.replace('=', '|divideThis|')
    ?.split('|divideThis|')[1];
  return loggedUser ? JSON.parse(loggedUser) : null;
};
