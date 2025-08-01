import { router } from '@inertiajs/react';
import React from 'react';

interface ItemBox {
  image: string;
  price?: number;
  id: string;
  address: string;
}

export function ItemBox({ image, price, id, address  }: ItemBox) {
  
  const [isLoaded, setIsLoaded] = React.useState(false);

  const handleImageLoad = (): any => {
      setIsLoaded(true);
  }

  return (
    <div className="flex flex-col h-full">
      <div className="overflow-hidden rounded-t-lg aspect-[4/4]" onClick={() => router.visit(`/items/${address}/${id}`)}>

        {!isLoaded && (
          <div role="status" className='w-full h-full flex items-center justify-center'>
            <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
          </div>
        )}

        <img className='full object-cover transform transition-transform scale-105
          duration-500 hover:scale-110 h-full w-full'
          src={ image }
          onLoad={handleImageLoad}
          style={{ display: isLoaded ? 'block' : 'none' }}>
        </img>


      </div>
      <div className="flex h-1/6 items-center justify-center">
        <svg className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" 
            image-rendering="optimizeQuality" shape-rendering="geometricPrecision" 
            text-rendering="geometricPrecision" viewBox="0 0 784.37 1277.39"><g fill-rule="nonzero">
              <path fill="#ffffffff" d="m392.07 0-8.57 29.11v844.63l8.57 8.55 392.06-231.75z"/>
              <path fill="#8C8C8C" d="M392.07 0 0 650.54l392.07 231.75V472.33z"/>
              <path fill="#ffffffff" d="m392.07 956.52-4.83 5.89v300.87l4.83 14.1 392.3-552.49z"/>
              <path fill="#8C8C8C" d="M392.07 1277.38V956.52L0 724.89z"/>
              <path fill="#141414" d="m392.07 882.29 392.06-231.75-392.06-178.21z"/>
              <path fill="#393939" d="m0 650.54 392.07 231.75V472.33z"/></g>
        </svg>
        <span className='flex pl-1 py-5'> { price } </span> 
      </div>
    </div>
  );
}