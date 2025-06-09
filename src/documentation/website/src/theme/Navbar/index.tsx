import React from 'react';
import Navbar from '@theme-original/Navbar';
import type NavbarType from '@theme/Navbar';
import type {WrapperProps} from '@docusaurus/types';

type Props = WrapperProps<typeof NavbarType>;

export default function NavbarWrapper(props: Props) {
  return (
    <>
      <a className="announce-container" href="https://workflowengine.io/documentation?utm_source=formengine&utm_medium=topbanner"
         target="_blank">
        <p className="announce-content">
          Introducing Workflow Engine, try for FREE workflowengine.io.
        </p>
      </a>
      <Navbar {...props} />
    </>
  );
}
