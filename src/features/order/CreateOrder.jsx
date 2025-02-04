import { useState } from 'react';
import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: 'Mediterranean',
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: 'Vegetale',
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: 'Spinach and Mushroom',
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  // const [withPriority, setWithPriority] = useState(false);
  const cart = fakeCart;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  const formError = useActionData();

  return (
    <div className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-6 text-center text-xl font-bold">
        Ready to order? Let's go!
      </h2>

      <Form method="POST" className="space-y-4">
        {/* First Name */}
        <div className="flex flex-col">
          <label className="font-medium">First Name</label>
          <input
            type="text"
            name="customer"
            required
            className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-yellow-400 focus:outline-none"
          />
        </div>

        {/* Phone Number */}
        <div className="flex flex-col">
          <label className="font-medium">Phone number</label>
          <input
            type="tel"
            name="phone"
            required
            className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-yellow-400 focus:outline-none"
          />
          {formError?.phone && (
            <p className="mt-1 text-sm text-red-500">{formError.phone}</p>
          )}
        </div>

        {/* Address */}
        <div className="flex flex-col">
          <label className="font-medium">Address</label>
          <input
            type="text"
            name="address"
            required
            className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-yellow-400 focus:outline-none"
          />
        </div>

        {/* Priority Checkbox */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-5 w-5 rounded border-gray-300 text-yellow-500 focus:ring-yellow-400"
          />
          <label htmlFor="priority" className="text-sm font-medium">
            Want to give your order priority?
          </label>
        </div>

        {/* Submit Button */}
        <input type="hidden" name="cart" value={JSON.stringify(cart)} />
        <button
          disabled={isSubmitting}
          className="w-full rounded-full bg-yellow-400 px-4 py-2 font-bold uppercase tracking-wide text-stone-800 shadow-md transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          {isSubmitting ? 'Placing order...' : 'Order now'}
        </button>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'on',
  };

  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone = 'please give us your correct phone number';

  if (Object.keys(errors).length > 0) return errors;

  //if everything is okay, then redirect
  const newOrder = await createOrder(order);
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
