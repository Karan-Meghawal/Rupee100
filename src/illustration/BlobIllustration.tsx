const BlobIllustration = ({ color }: { color: string }) => (
  <svg
    id="visual"
    viewBox="0 0 900 600"
    width="900"
    height="600"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    version="1.1"
  >
    <g transform="translate(498.86459742521333 276.55176747335975)">
      <path
        d="M135.9 -140.7C162.4 -109.4 160.7 -54.7 151 -9.7C141.4 35.4 123.7 70.7 97.2 112.7C70.7 154.7 35.4 203.4 -14.5 217.9C-64.3 232.3 -128.7 212.7 -178.7 170.7C-228.7 128.7 -264.3 64.3 -253.2 11.2C-242 -42 -183.9 -83.9 -133.9 -115.2C-83.9 -146.6 -42 -167.3 6.4 -173.7C54.7 -180 109.4 -172 135.9 -140.7"
        fill={color}
      ></path>
    </g>
  </svg>
);

export default BlobIllustration;
