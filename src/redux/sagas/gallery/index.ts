import { transition_time } from '@/src/constants';
import { GalleryAction } from '@/types/actions';
import { TopicsResponseData } from '@/types/topics';
import { LocationChangeAction, LOCATION_CHANGE } from 'connected-next-router';
import { apply, call, delay, fork, put, select, take, takeEvery, takeLeading } from 'redux-saga/effects';
import {
  GET_GALLERY,
  GET_GALLERY_FAILURE,
  GET_GALLERY_SUCCESS,
  SHIFT_GALLERY,
  SHIFT_GALLERY_RETURN,
  SHIFT_GALLERY_SUCCESS,
} from '../../reducers/gallery/actions';
import { selectGallery } from '../../reducers/gallery/selectors';

function* getGallery({ payload }: GalleryAction) {
  const response: Response = yield call(
    fetch,
    `https://api.unsplash.com/topics${payload.name}/photos?page=1&client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}`,
  );

  if (response.ok) {
    const data: TopicsResponseData[] = yield apply(response, response.json, []);

    yield put({
      type: GET_GALLERY_SUCCESS,
      payload: {
        data: data,
      },
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
    const action: LocationChangeAction = yield take(LOCATION_CHANGE);

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
    payload: {
      data: newList,
    },
  });

  yield delay(transition_time);

  yield put({
    type: SHIFT_GALLERY_RETURN,
    payload: {
      data: newList,
    },
  });
}

export default function* gallerySaga() {
  yield fork(getGalleryOnRouterEnter);
  yield takeEvery(GET_GALLERY, getGallery);
  yield takeLeading(SHIFT_GALLERY, shiftGallery);
}
