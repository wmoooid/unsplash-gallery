export interface GalleryAction {
  payload: {
    name: string;
    page: number;
    isLoading: boolean;
    isError: boolean;
    data: TopicsResponseData[];
    nextImg: TopicsResponseData;
    prevImg: TopicsResponseData;
    nextImgStyle: {};
    prevImgStyle: string;
    descrStyle: string;
    infoStyle: string;
  };
  type: string;
}
