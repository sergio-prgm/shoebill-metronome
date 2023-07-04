import Start from "~/components/Start";
import Metronome from "~/components/Metronome";
import Player from "~/components/Player";

export default function Home() {
  return (
    <main class='h-screen px-2 sm:px-4 max-w-2xl mx-auto'>
      {/* <Header /> */}
      <div class="dark:text-slate-100 text-slate-600 text-center">
        {/* <h1>Metronome</h1> */}
        <div class="m-0 mt-60 flex justify-center items-center w-full" id='container'>
          <div id="metronome" class='flex flex-col w-[500px] justify-between'>
            <Metronome />
            {/* <Player /> */}
            {/* <Start /> */}
          </div>
        </div>
      </div>
    </main>
  );
}
