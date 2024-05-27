import React from "react";
import { Skeleton } from "antd";

const PageSkeleton: React.FC = () => (
  <Skeleton avatar paragraph={{ rows: 4 }} />
);

export default PageSkeleton;
