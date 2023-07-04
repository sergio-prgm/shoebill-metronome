import * as Tone from 'tone'
import { createSignal, createEffect } from 'solid-js'

import Player from './Player'
import { PlusSVG, MinusSVG } from './SVG'

// TODO make bpm and ts react to Tone and not the other way around

interface MetronomeProps {
  baseBPM?: number
  baseTS?: number
}

function Metronome({ baseBPM, baseTS }: MetronomeProps) {
  if (typeof baseBPM === 'number') {
    Tone.Transport.bpm.value = baseBPM
    if (baseBPM < 20) baseBPM = 120
  }

  return <>
    <BPM baseBPM={baseBPM} />
    <Player />
    <TimeSignature baseTS={baseTS} />
  </>
}

export default Metronome

function BPM({ baseBPM = 120 }) {
  const [bpm, setBpm] = createSignal(baseBPM)
  const maxBPM = 280
  const minBPM = 20
  const BPMValue = Tone.Transport.bpm?.value

  createEffect(() => {
    Tone.Transport.bpm.value = bpm()
  })

  return (<>
    <div class='w-full text-center font-bold mb-3' id="bpm-display">
      <span class='text-6xl' id="tempo">{(BPMValue || bpm()).toFixed(0)}</span>
      <span class='dark:text-violet-300 text-violet-500' id="bpm">BPM</span>
    </div>
    <div class='text-sm uppercase text-center mb-6' id="tempo-text">vivace</div>
    <div class='flex grow-0 justify-between items-center gap-2 mb-4' id="tempo-settings">
      <button
        onClick={(e) => { bpm() > minBPM && setBpm(bpm => bpm - 1) }}
        class='bg-slate-800 hover:bg-slate-700 rounded-full p-2'
        id="adjust-tempo decrease"
      >
        <MinusSVG color='white' height={20} width={20} />
        {/* <img src='/SVG/Minus.svg' alt='Minus icon' width={20} height={20}/> */}
      </button>
      <input type="range" min={minBPM} max={maxBPM} step="1"
        onInput={e => setBpm(Number.parseInt((e.target as HTMLInputElement).value))}
        class=''
        value={BPMValue}
      />
      <button
        onClick={(e) => { bpm() < maxBPM && setBpm(bpm => bpm + 1) }}
        class='bg-slate-800 hover:bg-slate-700 rounded-full p-2'
        id="adjust-tempo increase">
        <PlusSVG color='white' height={20} width={20} />
        {/* <img src='/SVG/Plus.svg' alt='Plus icon' width={20} height={20}/> */}
      </button>
    </div>
  </>)
}

function TimeSignature({ baseTS = 4 }) {
  const [ts, setTs] = createSignal(baseTS)
  const maxTS = 9
  const minTS = 2

  createEffect(() => {
    Tone.Transport.timeSignature = ts()
    // console.log(Tone.Transport.timeSignature)
  })

  return (<>
    <div class='flex grow-0 justify-between items-center gap-2 mt-4' id="timesignature">
      <button
        onClick={() => ts() > minTS && setTs(ts => ts - 1)}
        class='bg-slate-800 hover:bg-slate-700 rounded-full p-2'
        id="adjust-tempo decrease"
      >
        <MinusSVG color='white' height={20} width={20} />
        {/* <img src='/SVG/Minus.svg' alt='Minus icon' width={20} height={20}/> */}
      </button>
      <div class="measure-count">{ts()}</div>
      <button
        onClick={() => ts() < maxTS && setTs(ts => ts + 1)}
        class='bg-slate-800 hover:bg-slate-700 rounded-full p-2'
        id="adjust-tempo decrease"
      >
        <PlusSVG color='white' height={20} width={20} />
        {/* <img src='/SVG/Plus.svg' alt='Minus icon' width={20} height={20}/> */}
      </button>
    </div>
    <span class="beats-per-measure">Beats per measure</span>
  </>)
}