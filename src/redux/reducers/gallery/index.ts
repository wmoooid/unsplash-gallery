import { GET_GALLERY, GET_GALLERY_SUCCESS, GET_GALLERY_FAILURE, SHIFT_GALLERY, SHIFT_GALLERY_SUCCESS } from './actions';

export const initialGalleryState = {
  name: '',
  isLoading: false,
  isError: false,
  data: [],
};

export function galleryReducer(state = initialGalleryState, action: any) {
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
        data: action.payload,
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
      };
    }

    case SHIFT_GALLERY_SUCCESS: {
      return {
        ...state,
        data: action.payload,
      };
    }

    default:
      return state;
  }
}
