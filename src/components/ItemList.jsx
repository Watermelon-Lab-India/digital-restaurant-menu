import React from 'react';

const ItemList = ({ items }) => {
  return (
    <div className="flex flex-col gap-4">
      {items.length > 0 ? (
        items.map((item, index) => (
          <div key={index} className="flex items-center justify-between bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow duration-200 p-3">
            <div className="flex-1 flex flex-col">
              <h3 className="text-base font-medium text-gray-800 group-hover:text-amber-600 transition-colors line-clamp-2">
                {item.name}
              </h3>
              <p className="text-sm text-gray-500 line-clamp-2">
                {item.description || ''}
              </p>
            </div>
            <span className="text-amber-600 font-medium text-base whitespace-nowrap ml-4">
              ₹{item.price}
            </span>
          </div>
        ))
      ) : (
        <div className="col-span-full text-center py-12">
          <p className="text-gray-500">No items found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default ItemList;