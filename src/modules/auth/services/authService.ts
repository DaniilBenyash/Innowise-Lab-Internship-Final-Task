type Token = {
  sub: number;
  role: "Admin" | "User";
};

interface IAuthService {
  setAccessToken: (value: string) => void;
  getAccessToken: () => string;
  removeAccessToken: () => void;
  isAuth: () => boolean;
  parseToken: () => Token;
  getID: () => string;
  getRole: () => string;
  logOut: () => void;
  attachObserverCallback: (callback: () => void) => void;
  detachObserverCallback: () => void;
}

class AuthService implements IAuthService {
  private KEY_NAME: string;
  observerCallback: () => void;

  constructor() {
    this.KEY_NAME = "ACCESS_TOKEN";
    this.observerCallback;
  }

  setAccessToken(token: string) {
    localStorage.setItem(this.KEY_NAME, token);
    this.observerCallback();
  }

  getAccessToken() {
    return localStorage.getItem(this.KEY_NAME);
  }

  removeAccessToken() {
    localStorage.removeItem(this.KEY_NAME);
  }

  isAuth() {
    return !!this.getAccessToken();
  }

  logOut() {
    localStorage.removeItem(this.KEY_NAME);
    this.observerCallback();
  }

  parseToken() {
    const [, payload] = this.getAccessToken().split(".");
    return JSON.parse(atob(payload));
  }

  getID() {
    if (!this.getAccessToken()) return "";
    return String(this.parseToken().sub);
  }

  getRole() {
    if (!this.getAccessToken()) return "";
    return this.parseToken().role;
  }

  attachObserverCallback(callback: () => void) {
    this.observerCallback = callback;
  }

  detachObserverCallback() {
    this.observerCallback = null;
  }
}

export const authService = new AuthService();
