import { AriaAttributes, DOMAttributes } from 'react';

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    on?: string;
    tabIndex?: string;
    tabindex?: string;
    'next-page-hide'?: string;
    nextPageHide?: Boolean;
  }
}
