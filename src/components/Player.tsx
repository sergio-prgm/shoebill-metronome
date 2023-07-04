import * as Tone from 'tone'
import { Frequency } from 'tone/build/esm/core/type/Units'
import { createEffect, createSignal } from 'solid-js'

function Player() {
  const [toggleMetro, setToggleMetro] = createSignal(false)
  const [gain, setGain] = createSignal<Tone.Gain<'gain'>>()
  const [synths, setSynths] = createSignal<Tone.PolySynth[]>()
  const [toggle, setToggle] = createSignal(Date.now())
  // const router = useRouter()

  // . Try making index a state variable
  createEffect(() => {
    console.log('%cStarting new Metronome', 'color:blue', Tone.Transport.state)
    setGain(new Tone.Gain(0.3).toDestination())
    setSynths([
      new Tone.PolySynth(),
      new Tone.PolySynth(),
      new Tone.PolySynth() // Added for subdivisions
    ])
    console.log(toggle())
  })

  const fs = () => console.log(Boolean(gain()), Boolean(synths()))

  createEffect(() => {
    if (gain() && synths()) synths()?.forEach(synth => synth.chain(gain() || new Tone.Gain(0.3).toDestination()))
  })
  // synths[0].oscillator.type = 'fmtriangle'
  // synths[1].oscillator.type = 'fmsine'

  const presets = {
    inputs: [
      [0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
      [1],
      [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1] // Added for subdivisions
    ],
    notes: ['A4', 'A5', 'F3']
  }

  let index = 0
  // [ ] To make the subdivisions, different inputs[] might have to be created (mainly one for triplets)

  const repeat = (time: number) => {
    const step = index % (Number(Tone.Transport.timeSignature) * 2)

    // Iterate through the synths/sounds to play
    for (let i = 0; i < 2; i++) { // Change the 2 to a 3 to make duplet subdivisions
      if (synths()) {
        const synth = synths()?.[i]
        const note = presets.notes[i]
        // let row = rows[i
        const inputArr = presets.inputs[i]
        const input = inputArr
          ? inputArr[step]
          : 0
        if (input) synth?.triggerAttackRelease(note as Frequency, '32n', time)
      }
    }
    index++
  }

  const scheduleMetro = () => {
    const id = Tone.Transport.scheduleRepeat(repeat, '8n')
    return id
  }

  // timeSignature

  const handleMetro = () => {
    fs()
    if (!toggleMetro()) {
      setToggle(Date.now())
      if (Tone.Transport.state === 'started') return
      scheduleMetro()
      Tone.start()
      // Tone.Transport.stop()
      Tone.Transport.start()
      console.log("state", Tone.Transport.state)
    } else {
      console.log("hello??")
      Tone.Transport.cancel().toggle()
    }
    setToggleMetro(!toggleMetro())
  }

  Tone.Transport.cancel().stop()

  // createEffect(() => {
  //   router.events.on('routeChangeStart', () => {
  //     Tone.Transport.cancel().stop()
  //   })
  // })

  const handleWorks = () => {
    const synth = new Tone.Synth().toDestination()
    synth.triggerAttackRelease("C5", "8n")
  }

  return (<>
    <button class='
        py-3 rounded uppercase text-xl font-semibold
        bg-violet-600 dark:bg-violet-200
        text-slate-50 dark:text-slate-700
        hover:bg-violet-700 dark:hover:bg-violet-300
        active:bg-violet-800 dark:active:bg-violet-400'
      id='start-stop'
      onClick={handleMetro}
    >
      {toggleMetro() ? 'Stop' : 'Start'}
    </button>
  </>)
}

export default Player