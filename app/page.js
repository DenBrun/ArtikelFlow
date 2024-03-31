import Image from "next/image";
import Card from '@/components/Card';
import Banner from '@/components/Banner';
import TabSelect from '@/components/TabSelect';
import { notFound } from 'next/navigation'
import { LevelProvider, LevelContext } from "@/components/LevelProvider";
import { ViewPreferenceProvider, ViewPreferenceContext } from "@/components/ViewPreferenceProvider";


export default async function Home() { 
  const word = await fetch(process.env.URL + '/api/random_word', {cache: 'no-store'}).then(response => response.json())
  .catch(error => {
    console.log(error);
    return notFound()
  });

  return (
    <main className="flex min-h-screen md:flex-col flex-col-reverse lg:items-center lg:justify-between justify-center py-24 sm:px-20 px-5 dark dark:bg-black dark:text-white">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <Banner/>        
        <div className="fixed bottom-0 left-0 flex h-32 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>
      <ViewPreferenceProvider>
        <LevelProvider>
          <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[380px] sm:before:w-[480px] before:-translate-x-[10%] before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[180px] sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 after:dark:from-sky-900 after:dark:via-[#0141ff] before:lg:h-[360px] before:opacity-55 w-full justify-center flex-1 sm:m-0 mt-20" >
            <Card word={word} />
          </div>
      
          <div className="grid max-w-5xl w-full min-[930px]:grid-cols-3 grid-cols-2">
            <div
              className="flex flex-col rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 max-xs:col-span-2"
            >
              <h2 className={`mb-3 md:text-2xl text-xl font-semibold`}>
                Vocabulary{" "}
              </h2>
              <TabSelect sharedStateContext={LevelContext} options={[
                    { label: 'Intermediate', value: 'Intermediate' },
                    { label: 'Advanced', value: 'Advanced' }]}
                    alignment={'left'} 
              />
            </div>

            <div
              className="flex flex-col min-[930px]:items-center max-xs:items-start items-end rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 max-xs:col-span-2"
            >
              <h2 className={`mb-3 md:text-2xl text-xl font-semibold`}>
                Show translation{" "}
              </h2>
              <TabSelect sharedStateContext={ViewPreferenceContext} options={[
                    { label: 'Hint', value: 'Hint' },
                    { label: 'Always', value: 'Always' }]} 
                    alignment={'center'} 
              />
            </div>

            <a
              href="https://github.com/DenBrun"
              className="flex flex-col group min-[930px]:items-end items-start rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 col-span-2 min-[930px]:col-auto max-sm:hidden"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h2 className={`mb-3 md:text-2xl text-xl font-semibold`}>
                GitHub{" "}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  -&gt;
                </span>
              </h2>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50 min-[930px]:text-right text-teft`}>
                Visit my GitHub to see more projects.
              </p>
            </a>
          </div>
        </LevelProvider>
      </ViewPreferenceProvider>
    </main>
  );
}
