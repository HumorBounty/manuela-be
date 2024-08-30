export interface User {
  firstName: string;
  lastName: string;
  email: string;
  username?: string;
  name?: string;
  token?: string;
  password: string;
  type: string;
  isVerified: number;
  createdAt?: number;
}

export interface GoogleSigninRequest {
  email: string;
  firstName: string;
  image: string;
  isVerified: number;
  username?: string;
  lastName: string;
  name: string;
  token: string;
  type: "google";
}

export interface GoogleVerificationPayload {
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
  sub: string;
}

export interface TokenDetails {
  userId?: string;
  accessToken?: string;
  email?: string;
  role?: "USER";
  profileId?: string;
}

export interface UserProfile {
  userId: any;
  profileId?: string;
  role: string;
  email?: string;
  firstName: string;
  lastName: string;
  createdAt: Date | string;
  profileImage: {
    originalImage: string;
    thumbnailImage: string;
  };
}
