import React from "react";
import { WaitForWsAndAuth } from "../auth/WaitForWsAndAuth";
import { HeaderController } from "../display/HeaderController";
import { DefaultDesktopLayout } from "../layouts/DefaultDesktopLayout";
import { FeedController } from "./FeedController";

export const DashboardPage = ({}) => {
  return (
    <WaitForWsAndAuth>
      <HeaderController embed={{}} title="Dashboard" />
      <DefaultDesktopLayout>
        <FeedController />
      </DefaultDesktopLayout>
    </WaitForWsAndAuth>
  );
};
