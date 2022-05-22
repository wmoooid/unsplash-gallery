import { card_hold, card_move } from '@/src/constants';
import { GalleryAction } from '@/types/actions';
import {
  GET_GALLERY,
  GET_GALLERY_SUCCESS,
  GET_GALLERY_FAILURE,
  SHIFT_GALLERY,
  SHIFT_GALLERY_SUCCESS,
  SHIFT_GALLERY_RETURN,
} from './actions';

export const initialGalleryState = {
  name: '',
  isLoading: false,
  isError: false,
  data: [],
  nextImg: {},
  prevImg: {},
  nextImgStyle: card_hold,
  prevImgStyle: 'background-image',
  descrStyle: 'photo-description-animation roll-in',
  infoStyle: 'photo-description-info fade-in',
};

export function galleryReducer(state = initialGalleryState, action: GalleryAction) {
  switch (action.type) {
    case GET_GALLERY: {
      return {
        ...state,
        name: action.payload.name,
        isLoading: true,
      };
    }

    case GET_GALLERY_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        data: action.payload.data,
        prevImg: action.payload.data[0],
        nextImg: action.payload.data[1],
      };
    }

    case GET_GALLERY_FAILURE: {
      return {
        ...state,
        isError: true,
        isLoading: false,
      };
    }

    case SHIFT_GALLERY: {
      return {
        ...state,
        nextImgStyle: card_move,
        prevImgStyle: 'background-image dark',
        descrStyle: 'photo-description-animation',
        infoStyle: 'photo-description-info',
      };
    }

    case SHIFT_GALLERY_SUCCESS: {
      return {
        ...state,
        data: action.payload.data,
      };
    }

    case SHIFT_GALLERY_RETURN: {
      return {
        ...state,
        prevImg: action.payload.data[0],
        nextImg: action.payload.data[1],
        nextImgStyle: card_hold,
        prevImgStyle: 'background-image',
        descrStyle: 'photo-description-animation roll-in',
        infoStyle: 'photo-description-info fade-in',
      };
    }

    default:
      return state;
  }
}
