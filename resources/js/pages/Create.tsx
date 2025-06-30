import React from "react";
import { useForm, Head } from '@inertiajs/react';
import { CircleX, Check } from "lucide-react";

type AddItemModProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AddItemMod( { isOpen, onClose }: AddItemModProps ) {
    if (!isOpen) return null;

    const { data, setData, post, processing, errors } = useForm({
    name: '',
    description: '',
    price: 0,
    quantity: 0,
    category: '',
    image_url: '',
  });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    post(route('items.store'));
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center p-12 z-50 bg-black/30 backdrop-blur-sm">

        <form onSubmit={submit} className="aspect-[1/1.5] bg-white rounded-lg p-2 shadow-xl">
            <div className="flex justify-between w-full">
                <span className="text-black font-bold text-2xl">Add Item</span>
                <CircleX onClick={onClose} stroke="#000000" className="hover:stroke-gray-500 cursor-pointer" />
            </div>
            <hr className="h-px bg-[#1b1b1d]/30 border-0"></hr>

            <div className="flex flex-col gap-3 w-full h-full">
                <div className="flex flex-col pt-2">
                    <span className="text-black font-bold text-lg">Name:</span>
                    <input
                        type="text"
                        value={data.name}
                        onChange={e => setData('name', e.target.value)}
                        className="text-black w-64 h-10 border rounded-lg p-2"
                        placeholder="Enter item name"
                    />
                </div>
                <div className="flex flex-col">
                    <span className="text-black font-bold text-lg">Description:</span>
                    <textarea
                        value={data.description}
                        onChange={e => setData('description', e.target.value)}
                        className="text-black w-64 rows-2 border rounded-lg p-2"
                        placeholder="Enter item description"
                    />
                </div>
                <div className="flex flex-col">
                    <span className="text-black font-bold text-lg">Price:</span>
                    <input
                        type="number"
                        value={data.price}
                        onChange={e => setData('price', parseFloat(e.target.value) || 0)}
                        className="text-black w-64 h-10 border rounded-lg p-2"
                        placeholder="Enter item price"
                    />
                </div>
                <div className="flex flex-col">
                    <span className="text-black font-bold text-lg">Image Url:</span>
                    <input
                        type="text"
                        value={data.image_url}
                        onChange={e => setData('image_url', e.target.value)}
                        className="text-black w-64 h-10 border rounded-lg p-2"
                        placeholder="Enter item URL"
                    />
                </div>
                <button type="submit" disabled={processing} className="flex justify-end p-2">
                    <Check stroke="#000000" size="32" className="hover:stroke-gray-500 cursor-pointer pl-2 pb-2" />
                </button>
            </div>
        </form>
    </div>
  );
}