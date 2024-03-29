import React from "react";
import { Spin, Icon } from "antd";

const antIcon = <Icon type="loading" style={{ fontSize: 40 }} spin />;

const Loader = () => {
  return <Spin indicator={antIcon} />;
};

export default Loader;
