import React from 'react';
import styles from './index.css';
import { Layout, Panel, Sidebar } from 'react-toolbox/lib/layout';
import classNames from 'classnames';

const { Page: pageClass } = styles;

interface PageProps {
  sidebarOpen: boolean;
  body: Element[] | string | Function;
  sidebar?: Element[] | string | Function;
  className?: string;
}

const Page = ({ body, sidebar, sidebarOpen, className }: PageProps) => (
  <div className={classNames(pageClass, className)}>
    <Layout>
      <Panel>{body}</Panel>
      <Sidebar pinned={sidebarOpen}>{sidebar}</Sidebar>
    </Layout>
  </div>
);

export default Page;
