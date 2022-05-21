export interface GalleryAction {
  payload: {
    name: string;
    isLoading: boolean;
    isError: boolean;
    data: TopicsResponseData[];
    nextImg: TopicsResponseData;
    prevImg: TopicsResponseData;
    nextImgStyle: {};
    prevImgStyle: string;
  };
  type: string;
}
