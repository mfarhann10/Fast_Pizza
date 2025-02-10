import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';
import { useSelector } from 'react-redux';
import { clearCart, getCart, getTotalCartPrice } from '../cart/cartSlice';
import EmptyCart from '../cart/EmptyCart';
import store from '../../store';
import { formatCurrency } from '../../utils/helpers';
import { useState } from 'react';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);

  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const username = useSelector((state) => state.user.username);
  const formError = useActionData();

  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);

  const priority = withPriority ? totalCartPrice * 0.2 : 0;

  const totalPrice = totalCartPrice + priority;
  if (!cart.length) return <EmptyCart />;

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
            className="input"
            defaultValue={username}
          />
        </div>

        {/* Phone Number */}
        <div className="flex flex-col">
          <label className="font-medium">Phone number</label>
          <input type="tel" name="phone" required className="input" />
          {formError?.phone && (
            <p className="mt-1 text-sm text-red-500">{formError.phone}</p>
          )}
        </div>

        {/* Address */}
        <div className="flex flex-col">
          <label className="font-medium">Address</label>
          <input type="text" name="address" required className="input" />
        </div>

        {/* Priority Checkbox */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
            className="h-5 w-5 rounded border-gray-300 text-yellow-500 focus:ring-yellow-400"
          />
          <label htmlFor="priority" className="text-sm font-medium">
            Want to give your order priority?
          </label>
        </div>

        {/* Submit Button */}
        <input type="hidden" name="cart" value={JSON.stringify(cart)} />
        <Button type="primary" disabled={isSubmitting}>
          {isSubmitting
            ? 'Placing order...'
            : `Order now ${formatCurrency(totalPrice)}`}
        </Button>
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
    priority: data.priority === 'true',
  };

  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone = 'please give us your correct phone number';

  if (Object.keys(errors).length > 0) return errors;

  //if everything is okay, then redirect
  const newOrder = await createOrder(order);

  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
