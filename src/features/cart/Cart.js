import { Fragment, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  deleteItemFromCartAsync,
  selectCartLoaded,
  selectCartStatus,
  selectItems,
  updateCartAsync,
} from './cartSlice';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { discountedPrice } from '../../app/constants';
import { Grid } from 'react-loader-spinner';
import Modal from '../common/Modal';

export default function Cart() {
  const dispatch = useDispatch();

  const items = useSelector(selectItems);
  const status = useSelector(selectCartStatus);
  const cartLoaded = useSelector(selectCartLoaded)
  const [openModal, setOpenModal] = useState(null);

  const totalAmount = items.reduce(
    (amount, item) => discountedPrice(item.product) * item.quantity + amount,
    0
  );
  const totalItems = items.reduce((total, item) => item.quantity + total, 0);

  const handleQuantity = (e, item) => {
    dispatch(updateCartAsync({id:item.id, quantity: +e.target.value }));
  };
  const gradientStyle = {
    background: 'linear-gradient(to right,#cffafe,#ffedd5)', // Adjust colors for desired skin tone gradient
  };
  const handleRemove = (e, id) => {
    dispatch(deleteItemFromCartAsync(id));
  };

  return (
    <>
      {status === 'loading' && (
        <div className="flex items-center justify-center h-screen">
          <Grid
            height={80}
            width={80}
            color="rgb(79, 70, 229) "
            ariaLabel="grid-loading"
            radius={12.5}
            wrapperStyle={{}}ffffff
            wrapperClass=""
            visible={true}
          />
        </div>
      )}

      {!items.length && cartLoaded && (
        <div className="flex items-center justify-center h-screen">
        <Navigate to="/" replace={true}></Navigate>
        </div>
      )}
      <div className="flex items-center justify-center min-h-screen" style={gradientStyle}>
        <div className="w-full max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-600 px-4 py-6 sm:px-6">
            <h1 className="text-4xl my-5 font-bold tracking-tight">
              Cart
            </h1>
            <div className="flow-root">
              <ul className="-my-6 divide-y divide-gray-600">
                {items.map((item) => (
                  <li key={item.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-400">
                    <img
                        src={item.product.thumbnail}
                        alt={item.product.title}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium">
                          <h3>
                          <a href={item.product.id}>{item.product.title}</a>
                          </h3>
                          <p className="ml-4">${discountedPrice(item.product)}</p>
                        </div>
                        <p className="mt-1 text-sm text-black-300">
                        {item.product.brand}
                        </p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="text-black-300">
                          <label
                            htmlFor="quantity"
                            className="inline mr-5 font-medium leading-6"
                          >
                            Qty
                          </label>
                          <select
                            onChange={(e) => handleQuantity(e, item)}
                            value={item.quantity}
                            className="bg-transparent text-black focus:outline-none"
                          >
                            {[1, 2, 3, 4, 5].map((qty) => (
                              <option key={qty} value={qty}>
                                {qty}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="flex">
                          <Modal
                            title={`Delete ${item.title}`}
                            message="Are you sure you want to delete this Cart item?"
                            dangerOption="Delete"
                            cancelOption="Cancel"
                            dangerAction={(e) => handleRemove(e, item.id)}
                            cancelAction={() => setOpenModal(null)}
                            showModal={openModal === item.id}
                          ></Modal>
                          <button
                            onClick={() => setOpenModal(item.id)}
                            type="button"
                            className="flex items-center justify-center text-sm text-red-600 font-medium hover:text-red-700 focus:outline-none"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 mr-1"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M14.293 5.293a1 1 0 00-1.414-1.414L10 8.586l-2.879-2.88a1 1 0 00-1.414 1.414L8.586 10l-2.88 2.879a1 1 0 001.414 1.414L10 11.414l2.879 2.88a1 1 0 001.414-1.414L11.414 10l2.88-2.879z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {items.length > 0 && (
            <div className="border-t border-gray-600 px-4 py-6 sm:px-6">
              <div className="flex justify-between my-2 text-base font-medium">
                <p>Subtotal</p>
                <p>${totalAmount}</p>
              </div>
              <div className="flex justify-between my-2 text-base font-medium">
                <p>Total Items in Cart</p>
                <p>{totalItems} items</p>
              </div>
              <p className="mt-0.5 text-sm text-black-300">
                Shipping and taxes calculated at checkout.
              </p>
              <div className="mt-6">
              <Link
to="/checkout"
className="flex items-center justify-center rounded-md bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none"
>
Checkout
</Link>



              </div>
              <div className="mt-6 flex justify-center text-center text-sm text-black-300">
                <p>
                  or{' '}
                  <Link to="/">
                    <span className="font-medium text-indigo-600 hover:text-indigo-500">
                      Continue Shopping
                      <span aria-hidden="true"> &rarr;</span>
                    </span>
                  </Link>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}