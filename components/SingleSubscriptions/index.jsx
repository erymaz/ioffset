import { Button } from 'antd';
import './index.scss';

const SingleSubscription = props => {
  const {
    subscription,
    selectedSubscription,
    payFrequency,
    item,
    plan
  } = props;
  const popularList = subscription.popular_with.popular_list.split(',\n');
  let subscriptionPrice = subscription.price;
  return (
    <div className="single-subscription">
      <p className="section-title">{subscription.title}</p>
      <p className="page-title price">
        {subscriptionPrice.toString().slice(-2) !== '00'
          ? (subscription.price / 100).toFixed(2)
          : subscription.price / 100}
      </p>
      <span className="text-primary-opacity-50">
        {payFrequency === 'monthly' ? 'per month' : 'total per year'}
      </span>
      <p className="subtext">
        Based on carbon footprint of {subscription.carbon_footprint}
        /t
      </p>
      <p className="text-primary-opacity-50">
        {subscription.popular_with.title}
      </p>
      <ul className="popular-with-list">
        {popularList.map((popular_item, key) => (
          <li key={key} dangerouslySetInnerHTML={{ __html: popular_item }}></li>
        ))}
      </ul>
      <div className="button-container">
        <Button
          type="primary"
          onClick={() =>
            selectedSubscription({
              id: subscription.id,
              name: subscription.title,
              plan: plan,
              price: subscription.price
            })
          }
        >
          Offset Now
        </Button>
      </div>
    </div>
  );
};

export default SingleSubscription;
