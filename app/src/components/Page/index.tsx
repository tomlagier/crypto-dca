import React from 'react';
import styles from './index.css';
import { Layout, Panel, Sidebar } from 'react-toolbox/lib/layout';
import classNames from 'classnames';

const { Page: pageClass } = styles;

interface PageProps {
  sidebarOpen?: boolean;
  body: JSX.Element | string | Function;
  sidebar?: JSX.Element | string | Function;
  className?: string;
}

const Page = ({
  body,
  sidebar,
  sidebarOpen = false,
  className
}: PageProps) => (
  <div className={classNames(pageClass, className)}>
    <Layout>
      <Panel>{body}</Panel>
        {sidebar &&
          <Sidebar pinned={sidebarOpen}>{sidebar}</Sidebar>}
    </Layout>
  </div>
);

export default Page;
