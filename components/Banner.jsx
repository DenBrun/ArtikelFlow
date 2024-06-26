'use client';

import { useState, useEffect } from 'react';

const Banner = () => {
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        function handleResize() {
        setIsSmallScreen(window.innerWidth < 640);
        }
        handleResize();
        window.addEventListener('resize', handleResize);
        // Remove event listener on component unmount
        return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <div className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          {isSmallScreen ? 
          <>
          <a href="https://github.com/DenBrun" target="_blank" rel="noopener noreferrer">
            <h2 className=''>
            Visit my <span className='font-mono underline underline-offset-4 decoration-blue-500 tracking-wider'>{'GitHub'}</span>
            {" "} to see more projects 
            </h2>
          </a>
          </>
          : (
            <>Tip: Use keys&nbsp;
              <span className="font-mono font-bold">[1, 2, 3]</span>
              &nbsp;for faster selection
            </>
          )}
    </div>
  )
}

export default Banner;