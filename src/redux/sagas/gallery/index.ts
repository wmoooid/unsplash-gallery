import { transition_time } from '@/src/constants';
import { GalleryAction } from '@/types/actions';
import { SearchResponseData, SearchResponseDataResults } from '@/types/search';
import { LocationChangeAction, LOCATION_CHANGE } from 'connected-next-router';
import { apply, call, delay, fork, put, select, take, takeEvery, takeLeading } from 'redux-saga/effects';
import {
  FULFILL_GALLERY,
  FULFILL_GALLERY_SUCCESS,
  GET_GALLERY,
  GET_GALLERY_FAILURE,
  GET_GALLERY_SUCCESS,
  SET_LOADING_FADE,
  SET_LOADING_NONE,
  SHIFT_GALLERY,
  SHIFT_GALLERY_RETURN,
  SHIFT_GALLERY_SUCCESS,
} from '../../reducers/gallery/actions';
import { selectGallery } from '../../reducers/gallery/selectors';

const withDescription = (item: SearchResponseDataResults) => item.description;

function* getGallery({ payload }: GalleryAction) {
  const response: Response = yield call(
    fetch,
    `https://api.unsplash.com/search/photos?query=${payload.name.slice(1)}&page=${payload.page}&client_id=${
      process.env.NEXT_PUBLIC_CLIENT_ID
    }`,
  );

  if (response.ok) {
    const data: SearchResponseData = yield apply(response, response.json, []);

    yield put({
      type: GET_GALLERY_SUCCESS,
      payload: {
        data: data.results.filter(withDescription),
      },
    });

    yield delay(transition_time);

    yield put({
      type: SET_LOADING_FADE,
    });

    yield delay(transition_time);

    yield put({
      type: SET_LOADING_NONE,
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
  let newList = [...state.data];
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

  if (newList.length <= 5) {
    yield put({
      type: FULFILL_GALLERY,
    });
  }
}

export function* fulfillGalery() {
  const state: GalleryAction['payload'] = yield select(selectGallery);
  let newList = [...state.data];

  const response: Response = yield call(
    fetch,
    `https://api.unsplash.com/search/photos?query=${state.name.slice(1)}&page=${state.page + 1}&client_id=${
      process.env.NEXT_PUBLIC_CLIENT_ID
    }`,
  );

  const data: SearchResponseData = yield apply(response, response.json, []);
  const dataWithDescription = data.results.filter(withDescription);
  // newList = [...newList, ...dataWithDescription];

  yield put({
    type: FULFILL_GALLERY_SUCCESS,
    payload: {
      data: dataWithDescription,
      page: state.page + 1,
    },
  });
}

export default function* gallerySaga() {
  yield fork(getGalleryOnRouterEnter);
  yield takeEvery(GET_GALLERY, getGallery);
  yield takeLeading(SHIFT_GALLERY, shiftGallery);
  yield takeLeading(FULFILL_GALLERY, fulfillGalery);
}
