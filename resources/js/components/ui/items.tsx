import { router } from '@inertiajs/react';

interface ItemBox {
  image: string;
  price?: number;
  id: string;
  address: string;
}

export function ItemBox({ image, price, id, address  }: ItemBox) {
  return (
    <div className="flex flex-col h-full">
      <div className="overflow-hidden" onClick={() => router.visit(`/items/${address}/${id}`)}>
        <img className='full object-cover transform transition-transform duration-500 hover:scale-110'
            src={ image }></img>
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
        <span className='flex flex pl-1'> { price } </span> 
      </div>
    </div>
  );
}