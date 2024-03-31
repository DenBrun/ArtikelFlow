'use client'
import { useContext } from 'react';


function Tabs({ sharedStateContext, options, alignment }) {
    const { sharedState, setSharedState } = useContext(sharedStateContext);

    const handleTabClick = (tabName) => {
        setSharedState(tabName);
    };

    return (
        <div className={`flex gap-2`}>
            {options.map((option, index) => (
                <button
                    key={index}
                    className={`font-normal max-md:text-sm pb-2 border-b-2 rounded-t-md ${alignment == 'center' ? 'px-3' : alignment == 'right'? 'pr-1 pl-4' : 'pr-4 pl-1'} ${sharedState === option.value ? 'border-blue-500' : 'border-gray-300'}`}
                    onClick={() => handleTabClick(option.value)}
                >
                    {option.label}
                </button>
            ))}
        </div>
    );
}

export default Tabs;
