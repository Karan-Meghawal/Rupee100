const regex = {
  alphabet: /^[a-zA-Z /s]+$/,
  number: /^\d+$/,
  alphaNumeric: /^[a-zA-Z0-9 /s]+$/,
  youTube:
    /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:embed\/|v\/|watch\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
};

export default regex;
