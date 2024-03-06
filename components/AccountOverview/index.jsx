import React, { useState, useEffect } from 'react';
import { Progress, Button } from 'antd';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { UsergroupAddOutlined } from '@ant-design/icons';
import Loader from 'components/Loader';
import Http from '../../utils/Http';
import './index.scss';

const copy = require('clipboard-copy');

const AccountOverview = () => {
  const [overview, setoverview] = useState('');
  const [loading, setloading] = useState(false);
  const user = useSelector(state => state.auth.user);
  useEffect(() => {
    setloading(true);
    Http.get('/dashboard/overview')
      .then(function (response) {
        setoverview(response.data.data);
        setloading(false);
      })
      .catch(function (error) {
        setloading(false);
      });
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div className="overview">
      <h1 className="title">Your iOffset Status</h1>
      <p>Individually we can make a difference. Together we can make change.</p>
      <div className="contribution">
        <p>Overview of your contribution to tackling climate change.</p>
        <div className="contribution-data">
          <p className="tonnes-pretext">
            Since {user && moment(user.created_at).format('Do MMMM YYYY')}...
          </p>
          <div className="progress-circles">
            <Progress
              type="circle"
              percent={overview.tonnage_offset}
              width={180}
              strokeWidth={10}
              format={percent => (
                <div>
                  <p className="tonnes">
                    {percent} tonnes <span className="subtext">of CO2</span>
                  </p>
                </div>
              )}
            />
            <Progress
              type="circle"
              percent={0}
              width={180}
              strokeWidth={10}
              format={percent => (
                <div>
                  <p className="tonnes">
                    {percent} Network{' '}
                    <span className="subtext">connections</span>
                  </p>
                </div>
              )}
            />
          </div>
        </div>
      </div>
      <div className="social text-center">
        <p>Share your profile</p>
        {user && (
          <div className="icons">
            <a
              href={`http://www.facebook.com/sharer.php?u=${window.location.host}/${user.username}`}
              target="_blank"
            >
              <img
                className="fb-icon"
                src="images/icons/facebook-darkblue.svg"
              />
            </a>
            <a
              href={`http://twitter.com/share?text=Check out my iOffset profile&url=http://${window.location.host}/${user.username}`}
              target="_blank"
            >
              <img className="twitter-icon" src="images/icons/Twitter.svg" />
            </a>
            <a
              href={`whatsapp://send?text=${window.location.host}/${user.username}`}
              data-action="share/whatsapp/share"
            >
              <img className="whatsapp-icon" src="images/icons/whatsapp.svg" />
            </a>
          </div>
        )}
      </div>
      {overview.referals && overview.referals.length > 0 && (
        <p className="refferals-header">
          List of friends and contacts that have offset thanks to you
        </p>
      )}
      {overview.referals &&
        overview.referals.length > 0 &&
        overview.referals.completed_referals.map((referals, key) => (
          <div key={key} className="refferals">
            <div className="refferal-name">
              {referals.first_name} {referals.last_name}
            </div>
            <div className="refferal-date">
              Signed up on {moment(referals.created_at).format('DD/MM/YYYY')}
            </div>
            <div className="refferal-trees">10 Trees Planted</div>
          </div>
        ))}

      <div className="invite">
        <UsergroupAddOutlined
          style={{ fontSize: '50px', float: 'left', marginRight: '20px' }}
        />
        <p className="invite-header">Invite Others</p>
        <p className="subtext">
          Together we can make a change. Simply copy the link below and share
          with others.
        </p>
        <div className="referral-link">
          <p className="disabled-input text-primary-opacity-50">
            {overview.referals && overview.referals.referal_link}
          </p>
          <Button
            type="secondary"
            onClick={() => copy(overview.referals.referal_link)}
          >
            Copy Link
          </Button>
        </div>
      </div>
      <div className="offset-list">
        For every friend that subscribes via the link above iOffset will:
        <br />- Add the tonnes they offset against your extended network
        <br />- When 10 friends subscribe iOffset will pay for your next year
      </div>
    </div>
  );
};

export default AccountOverview;
