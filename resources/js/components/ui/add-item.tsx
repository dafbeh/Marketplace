interface AddItem {
  className?: string;
}

export function AddItem({ className }: AddItem) {
  return (
    <div className={className}>
      <div className="flex absolute inset-0 overflow-hidden rounded-lg">
        <div className="flex items-center justify-center w-full h-full bg-green-300/90 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-1/2 w-1/2" width="800" height="800" fill="none" viewBox="0 0 24 24"><path stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 12h12m-6-6v12"/></svg>
        </div>
      </div>
    </div>
  );
}