import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
// import ImmutablePropTypes from 'react-immutable-proptypes';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from './OasisFooter.scss';
import CSSModules from 'react-css-modules';

const propTypes = PropTypes && {
  actions: PropTypes.object,
};


const sections = [
  {
    // header: "Information",
    links: [
      {
        label: 'Twitter',
        url: 'https://twitter.com/hawk_dex',
      },
    ]
  },
  {
    // header: "MakerDAO",
    links: [
      {
        label: 'Github',
        url: 'https://github.com/HawkDex',
      },
    ]
  },
  {
    // header: "MakerDAO",
    links: [
      {
        label: 'Discord',
        url: 'https://discord.gg/kUCKqKqrF9',
      },
    ]
  },
];

export class OasisFooterWrapper extends PureComponent {
  render() {
    const rowClassNames = `row ${styles.OasisFooter} ${window.mist ? styles.MistBrowser : ''}`;
    return (
      <div className={rowClassNames}>
        {sections.map((section, index) => (
          <div key={index}>
            <div className="row">
              <div className={styles.LinksSection}>
                {/*<h4 className={styles.Heading}>{section.header}</h4>*/}
                {
                  section.links.map((link, index) =>
                    <a
                      rel="noopener noreferrer" className={styles.Link} key={index} href={link.url} target="_blank"
                    >{link.label}
                    </a>
                  )
                }
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export function mapStateToProps() {
  return {};
}

export function mapDispatchToProps(dispatch) {
  const actions = {};
  return {actions: bindActionCreators(actions, dispatch)};
}

OasisFooterWrapper.propTypes = propTypes;
OasisFooterWrapper.displayName = 'OasisFooterWrapper';
export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(OasisFooterWrapper, styles));
