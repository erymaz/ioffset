import { Row, Col, Icon, Button } from 'antd';
import { useState } from 'react';
import './index.scss';

const QandA = props => {
  const [openAnswers, setopenAnswers] = useState(['question-0']);

  const renderAnswers = id => {
    let answers = [...openAnswers];
    console.log(id);
    openAnswers.includes(id)
      ? answers.splice(answers.indexOf(id), 1)
      : answers.push(id);
    setopenAnswers(answers);
  };
  return (
    <Row type="flex" justify="center">
      <Col span={20} lg={{ span: 10 }}>
        <div className="block qanda">
          {props.qanda.map((questionAnswers, key) => (
            <div key={key}>
              <div
                id={`question-${key}`}
                className="question page-subtitle"
                onClick={e => renderAnswers(e.target.id)}
              >
                {questionAnswers.question}
                <span id={`question-${key}`}>
                  <Button
                    id={`question-${key}`}
                    className="arrow"
                    onClick={e => renderAnswers(e.target.id)}
                  >
                    {openAnswers.includes(`question-${key}`) ? (
                      <Icon type="arrow-up" className={`question-${key}`} />
                    ) : (
                      <Icon type="arrow-down" className={`question-${key}`} />
                    )}
                  </Button>
                </span>
              </div>
              <div
                className={`answer ${
                  openAnswers.includes(`question-${key}`)
                    ? 'slideDown'
                    : 'slideUp'
                }`}
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: questionAnswers.answer
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </Col>
    </Row>
  );
};

export default QandA;
