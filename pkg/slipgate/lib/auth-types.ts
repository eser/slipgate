export type AuthUser = {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  hd: string;
};

export type Session = {
  user: AuthUser;
  access_token: string;
};

export type AuthProviderConfig = {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
};

export interface AuthProvider {
  getSignInUrl(): string;
  getTokens(code: string): Promise<{ access_token: string; id_token: string }>;
  getUser(access_token: string): Promise<AuthUser>;
}
