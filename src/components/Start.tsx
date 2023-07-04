import * as Tone from "tone"

export default function Start() {
  const synth = new Tone.Synth().toDestination()

  const handleClick = () => synth.triggerAttackRelease("C4", "8n")

  return (
    <button onclick={handleClick}>
      Start the music
    </button>
  )
}