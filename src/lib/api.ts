/**
 * API Services
 * 
 * This file contains functions for interacting with the DEV.to API.
 * It uses environment variables for API key and base URL configuration.
 */

// Load environment variables
const API_KEY = import.meta.env.VITE_DEV_TO_API_KEY || '';
const BASE_URL = import.meta.env.VITE_DEV_TO_API_BASE_URL || 'https://dev.to/api';

// Check if API key is missing and warn in development
if (!API_KEY && import.meta.env.DEV) {
  console.warn('DEV.to API key is missing. Set VITE_DEV_TO_API_KEY in your .env file.');
}

export interface DevArticle {
  id: number;
  title: string;
  description: string;
  published_at: string;
  tag_list: string[];
  url: string;
  comments_count: number;
  public_reactions_count: number;
  user: {
    name: string;
    username: string;
    twitter_username?: string;
    profile_image: string;
  };
}

export interface DevVideo {
  id: number;
  title: string;
  path: string;
  cloudinary_video_url: string;
  video_duration_in_minutes: string;
  video_source_url: string;
  user: {
    name?: string;
  };
}

export interface FetchArticlesParams {
  page?: number;
  per_page?: number;
  tag?: string;
  username?: string;
  state?: "fresh" | "rising" | "all";
  top?: number; // Add support for top articles
}

/**
 * Fetch articles from DEV.to API
 * Supports filtering by tag, username, and pagination
 */
export const fetchArticles = async (params: FetchArticlesParams) => {
  const queryParams = new URLSearchParams();
  queryParams.append('api_key', API_KEY);
  
  // Add optional parameters if they exist
  if (params.page) queryParams.append('page', params.page.toString());
  if (params.per_page) queryParams.append('per_page', params.per_page.toString());
  if (params.tag) queryParams.append('tag', params.tag);
  if (params.username) queryParams.append('username', params.username);
  if (params.state) queryParams.append('state', params.state);
  if (params.top) queryParams.append('top', params.top.toString());

  const response = await fetch(`${BASE_URL}/articles?${queryParams}`);
  if (!response.ok) {
    throw new Error('Failed to fetch articles');
  }
  return response.json() as Promise<DevArticle[]>;
};

/**
 * Fetch videos from DEV.to API
 * Supports pagination
 */
export const fetchVideos = async (params: {
  page?: number;
  per_page?: number;
}) => {
  const queryParams = new URLSearchParams();
  queryParams.append('api_key', API_KEY);
  
  // Add optional parameters if they exist
  if (params.page) queryParams.append('page', params.page.toString());
  if (params.per_page) queryParams.append('per_page', params.per_page.toString());

  const response = await fetch(`${BASE_URL}/videos?${queryParams}`);
  if (!response.ok) {
    throw new Error('Failed to fetch videos');
  }
  return response.json() as Promise<DevVideo[]>;
};

interface PublishArticleParams {
  title: string;
  body_markdown: string;
  published?: boolean;
  series?: string | null;
  main_image?: string | null;
  canonical_url?: string | null;
  description?: string;
  tags?: string;
  organization_id?: number | null;
}

/**
 * Publish an article to DEV.to
 * Requires authentication via API key
 */
export const publishArticle = async (params: PublishArticleParams) => {
  const response = await fetch(`${BASE_URL}/articles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': API_KEY,
    },
    body: JSON.stringify({
      article: {
        ...params,
        published: params.published ?? false
      }
    })
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || 'Failed to publish article');
  }

  return response.json();
};

export interface DevComment {
  type_of: string;
  id_code: string;
  created_at: string;
  body_html: string;
  user: {
    name: string;
    username: string;
    twitter_username?: string;
    github_username?: string;
    profile_image: string;
    profile_image_90: string;
  };
  children: DevComment[];
}

interface ProfileImage {
  type_of: string;
  image_of: string;
  profile_image: string;
  profile_image_90: string;
}

/**
 * Fetch comments for a specific article
 */
export const fetchArticleComments = async (articleId: string): Promise<DevComment[]> => {
  const response = await fetch(`${BASE_URL}/comments?a_id=${articleId}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch comments');
  }

  return response.json();
};

/**
 * Fetch a user's profile image by username
 * Falls back to a default image if not found
 */
export const fetchProfileImage = async (username: string): Promise<ProfileImage> => {
  const response = await fetch(`${BASE_URL}/profile_images/${username}`, {
    headers: {
      'api_key': API_KEY
    }
  });

  if (!response.ok) {
    return {
      type_of: "profile_image",
      image_of: username,
      profile_image: "https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/1/f451a206-11c8-4e3d-8936-143d0a7e65bb.png",
      profile_image_90: "https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/1/f451a206-11c8-4e3d-8936-143d0a7e65bb.png"
    };
  }

  return response.json();
};

/**
 * Fetch a specific comment by its ID
 */
export const fetchCommentById = async (id: string): Promise<DevComment> => {
  const response = await fetch(`${BASE_URL}/comments/${id}`, {
    headers: {
      'api_key': API_KEY
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch comment');
  }

  return response.json();
}; 