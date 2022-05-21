export const transition_time = 500;
export const card_mb = 64;
export const card_gap = 30;
export const card_width = 285;
export const card_height = 435;
export const card_center = `calc(50vw - ${card_width / 2}px)`;
export const card_hold = {
  width: card_width,
  height: card_height,
  bottom: card_mb,
  left: card_center,
  borderRadius: '20px',
};
export const card_move = {
  width: '100%',
  height: '100%',
  bottom: 0,
  left: 0,
  borderRadius: '0px',
  willChange: 'width, height, bottom, left, border-radius',
  transition: `all ${transition_time}ms ease-in-out`,
};
