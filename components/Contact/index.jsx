import { Row, Col, Button, Input, Form } from 'antd';
import { useState } from 'react';
import Http from 'utils/Http';
import Loader from 'components/Loader';
import { toast } from 'react-toastify';
import './index.scss';

const Contact = props => {
  const [loading, setloading] = useState(false);
  const handleSubmit = e => {
    e.preventDefault();
    const data = new FormData(e.target);
    setloading(true);
    Http.post('/contact-form', data)
      .then(function(response) {
        setloading(false);
        toast.success(response.data.data);
      })
      .catch(function(response) {
        setloading(false);
        response.data
          ? toast.warning(response.data.data)
          : toast.warning('Error submitting form, please try later');
      });
  };

  const form = () => (
    <div>
      <p className="text-lighter">{props.data.page_hero.pre_title}</p>
      <p className="page-title">{props.data.page_hero.title}</p>
      <form name="contact-form" className="form" onSubmit={handleSubmit}>
        <Form.Item label="Your Name">
          <Input
            type="text"
            name="name"
            placeholder="..."
            size="large"
            required
          />
        </Form.Item>

        <Form.Item label="Your Email">
          <Input
            type="email"
            name="email"
            placeholder="..."
            size="large"
            required
          />
        </Form.Item>
        <Form.Item label="Your Message">
          <Input.TextArea
            rows="5"
            name="message"
            placeholder="..."
            size="large"
            required
          />
        </Form.Item>

        <Button type="secondary" loading={loading} block htmlType="submit">
          Submit
        </Button>
      </form>
      <p className="text-lighter">{props.data.address_title}</p>
      <div
        dangerouslySetInnerHTML={{
          __html: props.data.address
        }}
      ></div>
    </div>
  );

  return (
    <Row type="flex" justify="center">
      <Col span={24}>
        <div className="block contact text-center">{form()}</div>
      </Col>
    </Row>
  );
};

export default Contact;
