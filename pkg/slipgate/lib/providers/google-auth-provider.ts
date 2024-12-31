import { AuthProvider, AuthProviderConfig, AuthUser } from "../auth-types";

export class GoogleAuthProvider implements AuthProvider {
  private config: AuthProviderConfig;
  private readonly SCOPE = "openid email profile";

  constructor(config: AuthProviderConfig) {
    this.config = config;
  }

  getSignInUrl(): string {
    const params = new URLSearchParams({
      client_id: this.config.clientId,
      redirect_uri: this.config.redirectUri,
      response_type: "code",
      scope: this.SCOPE,
      prompt: "select_account",
    });

    return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  }

  async getTokens(code: string) {
    const url = "https://oauth2.googleapis.com/token";
    const values = {
      code,
      client_id: this.config.clientId,
      client_secret: this.config.clientSecret,
      redirect_uri: this.config.redirectUri,
      grant_type: "authorization_code",
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const data = await response.json();

    return data;
  }

  async getUser(access_token: string): Promise<AuthUser> {
    const response = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const data = await response.json();

    return data as AuthUser;
  }
} 
