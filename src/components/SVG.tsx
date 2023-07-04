interface Props {
  color: string
  height: number
  width: number
}

function PlusSVG({ color, height, width }: Props) {
  return <svg
    id="e3N5x6kXpIM1" xmlns="http://www.w3.org/2000/svg"
    xmlns-xlink="http://www.w3.org/1999/xlink" viewBox="0 0 30 30"
    shape-rendering="geometricPrecision" text-rendering="geometricPrecision"
    height={height} width={width} class-name='mx-auto'
  >
    <path
      d="M1.38015,15.95157c11.440675,0,11.440675,0,22.881351,0"
      transform="matrix(0-1.197286-6.525074 0 119.085174 30.35019)"
      fill={color} stroke={color} stroke-width="1"
    />
    <path d="M1.38015,15.95157c11.440675,0,11.440675,0,22.881351,0"
      transform="matrix(1.197286 0 0-6.525074-.350194 119.085182)"
      fill={color} stroke={color} stroke-width="1"
    />
  </svg>
}

function MinusSVG({ color, height, width }: Props) {
  return <svg
    id="eRAWB2TbEPh1" xmlns="http://www.w3.org/2000/svg"
    xmlns-xlink="http://www.w3.org/1999/xlink" viewBox="0 0 30 30"
    shape-rendering="geometricPrecision" text-rendering="geometricPrecision"
    height={height} width={width} class-name='mx-auto'
  >
    <path
      id="eRAWB2TbEPh1-s-path1"
      d="M1.38015,15.95157c11.440675,0,11.440675,0,22.881351,0"
      transform="matrix(1.197286 0 0-6.525074-.350194 119.085182)"
      fill={color} stroke={color} stroke-width="1"
    />
  </svg>
}

export { PlusSVG, MinusSVG }