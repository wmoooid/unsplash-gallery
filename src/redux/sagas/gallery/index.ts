import { LOCATION_CHANGE } from 'connected-next-router';
import { AnyAction } from 'redux';
import { apply, call, fork, put, select, take, takeEvery } from 'redux-saga/effects';
import { initialGalleryState } from '../../reducers/gallery';
import {
  GET_GALLERY,
  GET_GALLERY_FAILURE,
  GET_GALLERY_SUCCESS,
  SHIFT_GALLERY,
  SHIFT_GALLERY_SUCCESS,
} from '../../reducers/gallery/actions';
import { selectGallery } from '../../reducers/gallery/selectors';

export interface GalleryAction {
  payload: {
    name: string;
    isLoading: boolean;
    isError: boolean;
    data: TopicsResponseData[];
  };
  type: string;
}

interface TopicsResponse {
  config: {};
  data: TopicsResponseData[];
  headers: {};
  status: number;
  statusText: string;
}

function* getGallery({ payload }: GalleryAction) {
  const response: Response = yield call(
    fetch,
    `https://api.unsplash.com/topics${payload.name}/photos?page=1&client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}`,
  );

  if (response.ok) {
    const data: TopicsResponse = yield apply(response, response.json, []);

    yield put({
      type: GET_GALLERY_SUCCESS,
      payload: data,
    });
  } else {
    yield put({
      type: GET_GALLERY_FAILURE,
      payload: response.status,
    });
  }
}

export function* getGalleryOnRouterEnter() {
  while (true) {
    const action: AnyAction = yield take(LOCATION_CHANGE);

    yield put({
      type: GET_GALLERY,
      payload: {
        name: action.payload.location.pathname,
      },
    });
  }
}

export function* shiftGallery() {
  const state: GalleryAction['payload'] = yield select(selectGallery);
  const newList = [...state.data];
  newList.shift();

  yield put({
    type: SHIFT_GALLERY_SUCCESS,
    payload: newList,
  });
}

export default function* gallerySaga() {
  yield fork(getGalleryOnRouterEnter);
  yield takeEvery(GET_GALLERY, getGallery);
  yield takeEvery(SHIFT_GALLERY, shiftGallery);
}

interface TopicsResponseData {
  id: string;
  created_at: string;
  updated_at: string;
  promoted_at: null;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description: null;
  alt_description: null;
  urls: { raw: string; full: string; regular: string; small: string; thumb: string; small_s3: string };
  links: { self: string; html: string; download: string; download_location: string };
  categories: never[];
  likes: number;
  liked_by_user: boolean;
  current_user_collections: never[];
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
