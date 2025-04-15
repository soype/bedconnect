import styles from './CartPage.module.scss'
import Cart from '@/components/Cart/Cart';

export default function CartPage() {
  return (
    <div className="clear-nav">
      <h1>Cart</h1>
      <Cart></Cart>
    </div>
  );
}