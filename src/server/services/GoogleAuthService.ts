import { google, oauth2_v2 } from 'googleapis';
import { Injectable } from '@nestjs/common';
import { GoogleAuth } from 'google-auth-library';

type AccessType = 'offline' | 'online';

const GOOGLE_AUTH_ENDPOINT = 'https://accounts.google.com/o/oauth2/v2/auth';

@Injectable()
export class GoogleAuthService {

  private clientId: string;
  private clientSecret: string;
  private auth: oauth2_v2.Oauth2;

  constructor() {
    this.clientId = process.env.googleClientId || '';
    this.clientSecret = process.env.googleClientSecret || '';

    this.auth = google.oauth2({ version: 'v2' });
  }

  getRequestUrl(
    redirectUri: string,
    scopes: string[],
    accessType: AccessType = 'offline',
    includeGrantedScopes: boolean = true,
    responseType: string = 'code',
    state = '',
  ): URL {
    const scope = scopes.join(' ');
    const queryParams = {
      scope,
      state,
      include_granted_scopes: includeGrantedScopes,
      access_type: accessType,
      client_id: this.clientId,
      redirect_uri: redirectUri,
      response_type: responseType,
    };

    const url = new URL(GOOGLE_AUTH_ENDPOINT);
    Object.keys(queryParams).forEach((key: string) => url.searchParams.append(key, queryParams[key]));

    return url;
  }
}
