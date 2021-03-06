jest.unmock('../src/I18nextProvider');
import React from 'react';
import PropTypes from 'prop-types';
import  I18nextProvider from '../src/I18nextProvider';

describe('I18nextProvider', () => {
  it('should provide i18n context', () => {
    const i18n = {
      options: {},
      services: {
        resourceStore: {
          data: {}
        }
      },
      changeLanguage: () => {}
    };
    const wrapper = new I18nextProvider({ i18n, initialI18nStore: {}, initialLanguage: 'en' });
    expect(wrapper.getChildContext().i18n).toBe(i18n);
    expect(I18nextProvider.childContextTypes.i18n)
      .toBe(PropTypes.object.isRequired);
  });
  it('should throw an exception if you try to change i18n object', () => {
    const i18n = {};
    const wrapper = new I18nextProvider({ i18n });
    wrapper.props.i18n = { anoter: true };
    function willReceiveProps() {
      wrapper.componentWillReceiveProps({ i18n: {} });
    }
    expect(willReceiveProps).toThrowError('[react-i18next][I18nextProvider]does not support changing the i18n object.');
  });
  it('should render children', () => {
    const div = React.createFactory('div');
    const child = React.createElement(div);
    const wrapper = new I18nextProvider({ i18n: {}, children: child });
    const render = wrapper.render();
    expect(render).toBe(child);
  });
  it('should provide defaultNS', () => {
    const i18n = {
      options: {},
      services: {
        resourceStore: {
          data: {}
        }
      },
      changeLanguage: () => {}
    };
    const wrapper = new I18nextProvider({ i18n, defaultNS: 'provided-namespace', initialI18nStore: {}, initialLanguage: 'en' });
    expect(wrapper.getChildContext().defaultNS).toBe('provided-namespace');
    expect(I18nextProvider.childContextTypes.defaultNS)
      .toBe(PropTypes.string);
  });
  it('should provide reportNS', () => {
    const i18n = {
      options: {},
      services: {
        resourceStore: {
          data: {}
        }
      },
      changeLanguage: () => {}
    };
    const wrapper = new I18nextProvider({ i18n, defaultNS: '', initialI18nStore: {}, initialLanguage: 'en', reportNS: (ns) => ns });
    expect(wrapper.getChildContext().reportNS('_ns_')).toBe('_ns_');
    expect(I18nextProvider.childContextTypes.reportNS)
      .toBe(PropTypes.func);
  });
  it('should have i18n proptype required', () => {
    expect(I18nextProvider.propTypes.i18n)
      .toBe(PropTypes.object.isRequired);
  });
  it('should have defaultNS proptype optional string', () => {
    expect(I18nextProvider.propTypes.defaultNS)
      .toBe(PropTypes.string);
  });
  it('should have children proptype required', () => {
    expect(I18nextProvider.propTypes.children)
      .toBe(PropTypes.element.isRequired);
  });
});
