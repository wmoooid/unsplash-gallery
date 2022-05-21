export interface TopicsResponse {
  config: {};
  data: TopicsResponseData[];
  headers: {};
  status: number;
  statusText: string;
}

export interface TopicsResponseData {
  id: string;
  created_at: string;
  updated_at: string;
  promoted_at: null;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description: string | null;
  alt_description: null;
  urls: { raw: string; full: string; regular: string; small: string; thumb: string; small_s3: string };
  links: { self: string; html: string; download: string; download_location: string };
  categories: any[];
  likes: number;
  liked_by_user: boolean;
  current_user_collections: any[];
  sponsorship: null;
  topic_submissions: { architecture: { status: string; approved_on: string } };
  user: {
    id: string;
    updated_at: string;
    username: string;
    name: string;
    first_name: string;
    last_name: string;
    twitter_username: null;
    portfolio_url: null;
    bio: null;
    location: string;
    links: {
      self: string;
      html: string;
      photos: string;
      likes: string;
      portfolio: string;
      following: string;
      followers: string;
    };
    profile_image: { small: string; medium: string; large: string };
    instagram_username: string;
    total_collections: number;
    total_likes: number;
    total_photos: number;
    accepted_tos: boolean;
    for_hire: boolean;
    social: { instagram_username: string; portfolio_url: null; twitter_username: null; paypal_email: null };
  };
}
