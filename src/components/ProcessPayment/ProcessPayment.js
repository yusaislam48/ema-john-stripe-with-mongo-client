import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SimpleCardForm from './SimpleCardForm';
import SplitCardForm from './SplitCardForm';

const stripePromise = loadStripe('pk_test_51Ie0YiCybs1eYJ8ib7G2nWe5LNKoXoDoQZaLKs4ZBsBtVf8VTmAhWXwba7ANYUgMWyE0kaj0a5p3Wqv4zENrgsOZ001MKQdHXm');

const ProcessPayment = ({handlePayment}) => {
    return (
        <Elements stripe={stripePromise}>
            <SimpleCardForm handlePayment={handlePayment}></SimpleCardForm>
            {/* <SplitCardForm></SplitCardForm> */}
        </Elements>
    );
};

export default ProcessPayment;


