interface ItemBox {
  className?: string;
}

export function ItemBox({ className }: ItemBox) {
  return (
    <div className={className}>
      <div className="flex flex-col h-full w-full overflow-hidden rounded-lg select-none">
        <div className="flex items-center justify-center dark:bg-white/80 bg-black/80">
          <img
            className="w-full object-contain select-none"
            src="https://done3d.com/wp-content/uploads/2018/11/Guns_Pack_3.png"
            draggable="false" alt="Item"
          />
        </div>
        <div className="flex-col bg-black/30 flex p-2 bg-black/80 text-white">
          <span className="font-bold text-xl">MP5</span>
            <span className="font-bold text-sm dark:text-white/80">M9K Weapon</span>
        </div>
        <div className="absolute bottom-2 right-2 gap-[1px] dark:bg-white/20 bg-black/80 border-1 rounded-full">
          <span className="font-bold text-xl dark:text-green-300 text-white px-4">50k</span>
        </div>
      </div>
    </div>
  );
}