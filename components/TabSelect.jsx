'use client'

import { useLevelState  } from './LevelProvider';

function DifficultyTabs() {
    const { levelState, setLevelState } = useLevelState();

    const handleTabClick = (tabName) => {
        setLevelState(tabName);
    };

    return (
        <div className="flex text-left">
            <button
                className={`pr-4 font-normal max-md:text-sm pb-2 mr-1 border-b-2 rounded-t-md ${levelState === 'Intermediate' ? 'border-blue-500' : 'border-gray-300'}`}
                onClick={() => handleTabClick('Intermediate')}
            >
                Intermediate
            </button>
            <button
                className={`pr-4 font-normal max-md:text-sm pb-2 mx-1 border-b-2 rounded-t-md ${levelState === 'Advanced' ? 'border-blue-500' : 'border-gray-300'}`}
                onClick={() => handleTabClick('Advanced')}
            >
                Advanced
            </button>
        </div>
    );
}

export default DifficultyTabs;
