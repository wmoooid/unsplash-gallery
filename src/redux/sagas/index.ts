import { all, spawn } from 'redux-saga/effects';
import gallerySaga from './gallery';

export default function* rootSaga() {
  const sagas = [gallerySaga];

  yield all(sagas.map((s) => spawn(s)));
}
