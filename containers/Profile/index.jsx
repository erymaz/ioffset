import React, { useEffect, useState } from 'react';
import Meta from 'components/Meta';
import PageContainer from 'components/PageContainer';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Hero from 'components/Hero';
import withAuth from 'components/AuthProvider';
import Articles from 'components/Articles';
import { Button } from 'antd';
import FooterHero from 'components/FooterHero';
import Contributions from 'components/Contributions';
import Http from 'utils/Http';
import ErrorPage from 'components/Error';
import Loader from 'components/Loader';
import Router from 'next/router';
import { useRouter } from 'next/router';
import './index.scss';

const Profile = ({ projects }) => {
  const [profileUser, setprofileUser] = useState('');
  const [loading, setloading] = useState(false);
  const {
    query: { username },
  } = useRouter();

  useEffect(() => {
    setloading(true);

    Http.get(`/profile/${username}`)
      .then(function (response) {
        setprofileUser(response.data.data);
        setloading(false);
      })
      .catch(function (error) {
        console.log(error);
        setloading(false);
      });
  }, []);

  const data = {
    data: {
      page_hero: {
        title: `${profileUser && profileUser.first_name} ${profileUser && profileUser.last_name}`,
        description: 'iOffset support high impact carbon reduction projects',
      },
      first_articles: {
        section_title: `Projects ${profileUser && profileUser.first_name} contributed to`,
        greenBackground: true,
        article: [
          {
            title: projects && projects.content.first_articles.article[0].title,
            subtitle: projects && projects.content.first_articles.article[0].subtitle,
            description: projects && projects.content.first_articles.article[0].description,
            image_url: projects && projects.content.first_articles.article[0].image_url,
          },
          {
            title: projects && projects.content.first_articles.article[1].title,
            subtitle: projects && projects.content.first_articles.article[1].subtitle,
            description: projects && projects.content.first_articles.article[1].description,
            image_url: projects && projects.content.first_articles.article[1].image_url,
          },
        ],
      },
    },
  };

  return (
    <>
      {projects.seo ? (
        <Meta title={projects.seo.title} description={projects.seo.description} />
      ) : (
        <Meta title="Profile" description="Profile" />
      )}
      {profileUser ? (
        <PageContainer>
          <Header />
          <Hero hero={data.data.page_hero} noImage={true} />
          <div className="profile-content">
            <div className="social text-center">
              <p>Share your profile</p>
              <div className="icons">
                <a
                  href={`http://www.facebook.com/sharer.php?u=${window.location.host}/${username}`}
                  target="_blank"
                >
                  <img className="fb-icon" src="/images/icons/facebook-darkblue.svg" />
                </a>
                <a
                  href={`http://twitter.com/share?text=Check out my iOffset profile&url=http://${window.location.host}/${username}`}
                  target="_blank"
                >
                  <img className="twitter-icon" src="/images/icons/Twitter.svg" />
                </a>
                <a
                  href={`whatsapp://send?text=${window.location.host}/${username}`}
                  data-action="share/whatsapp/share"
                >
                  <img className="whatsapp-icon" src="/images/icons/whatsapp.svg" />
                </a>
              </div>
            </div>
            <Contributions profile={profileUser} />
            <Button
              type="primary"
              className="offset-profile"
              onClick={() => Router.push(`/subscribe?token=${profileUser.referral_link}`)}
            >
              Offset Now
            </Button>
          </div>
          <Articles
            articles={data.data.first_articles}
            backgroudColor={data.data.first_articles.greenBackground}
          />
          <FooterHero />
          <Footer />
        </PageContainer>
      ) : loading ? (
        <PageContainer>
          <div
            style={{
              position: 'fixed',
              display: 'flex',
              width: '100vw',
              height: '100vh',
              justifyContent: 'center',
              alignItems: 'center',
              top: 0,
              left: 0,
            }}
          >
            <Loader />
          </div>
        </PageContainer>
      ) : (
        <ErrorPage />
      )}
    </>
  );
};

// true or false as second parameter means authentication is required for this page.
export default withAuth(Profile, false);
