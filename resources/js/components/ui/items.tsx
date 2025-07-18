interface ItemBox {
  className?: string;
  item?: {
    id: number;
    name: string;
    description?: string;
    price: number;
    quantity: number;
    category?: string;
    image_url?: string;
  }
}

export function ItemBox({ className, item }: ItemBox) {
  return (
    <div className={className}>
      <div className="flex flex-col h-full w-full overflow-hidden select-none">
        <div className="flex items-center justify-center">
          <img
            className="w-full object-cover select-none aspect-video h-32 rounded-tl-lg rounded-tr-lg"
            src={item?.image_url || 'https://port2flavors.com/wp-content/uploads/2022/07/placeholder-614.png'}
            draggable="false" alt="Item"
          />
        </div>
        <div className="flex-col flex p-2 dark:text-white">
          {item && <span className="font-bold text-xl">{item.name}</span>}
            <span className="font-bold text-sm dark:text-white/80">{item?.description}</span>
        </div>
        <div className="absolute bottom-2 right-2 gap-[1px] dark:bg-white/20 bg-black/80 border-1 rounded-full">
          <span className="font-bold text-xl dark:text-green-300 text-white px-4">${item?.price.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}