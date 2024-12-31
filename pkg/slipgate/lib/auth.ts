import { cookies } from "next/headers";
import type { AuthProvider, Session } from "./auth-types.ts";
import { GoogleAuthProvider } from "./providers/google-auth-provider.ts";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  maxAge: 60 * 60 * 24 * 7, // 1 week
};

export class Auth {
  private provider: AuthProvider;

  constructor(provider: AuthProvider) {
    this.provider = provider;
  }

  getSignInUrl(): string {
    return this.provider.getSignInUrl();
  }

  async getSession(): Promise<Session | null> {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;

    if (accessToken === undefined) {
      return null;
    }

    const user = await this.provider.getUser(accessToken);

    return {
      user,
      access_token: accessToken,
    };
  }

  async signInCallback(code: string) {
    const { access_token, id_token } = await this.provider.getTokens(code);

    const cookieStore = await cookies();

    cookieStore.set("access_token", access_token, cookieOptions);
    cookieStore.set("session", id_token, cookieOptions);
  }

  async signOut() {
    const cookieStore = await cookies();

    cookieStore.delete("access_token");
    cookieStore.delete("session");
  }
}

// Export a default instance with Google provider
export const auth = new Auth(
  new GoogleAuthProvider({
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    redirectUri: `${process.env.APP_URL}/auth/login/callback`,
  }),
);
