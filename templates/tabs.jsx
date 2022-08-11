import a11y from 'core/js/a11y';
import React from 'react';
import { templates, classes, compile } from 'core/js/reactHelpers';

export default function Tabs(props) {

  const {
    _id,
    _items,
    _minHeight,
    _globals,
    onTabItemClicked,
    onTabItemKeyUp,
    itemWidth
  } = props;

  return (
    <div className="tabs__inner component__inner">

      <templates.header {...props} />

      <div className="tabs__widget component__widget clearfix">

        <div className="tabs__nav">
          <div className="tabs__nav-inner" role="tablist">

            {_items.map(({
              tabTitle,
              _isActive,
              _index,
              _isVisited
            }, index) =>

              <button
                key={_index}
                role="tab"
                aria-selected={_isActive}
                aria-controls={`${_id}-${index}-tabpanel`}
                aria-label={`${tabTitle}.${_isVisited ? ` ${_globals._accessibility._ariaLabels.visited}` : ''}`}
                className={classes([
                  'tabs__nav-item-btn',
                  'js-tabs-nav-item-btn-click',
                  _isVisited && 'is-visited',
                  _isActive && 'is-selected'
                ])}
                tabIndex={_isActive ? 0 : -1}
                onClick={onTabItemClicked}
                onKeyUp={onTabItemKeyUp}
                style={{ width: itemWidth }}
                data-index={_index}>

                <div id={`${_id}-${index}-tabtitle`} className="tabs__nav-item-btn-inner">{tabTitle}</div>
              </button>

            )}

          </div>
        </div>

        <div className="tabs__content" style={{ minHeight: _minHeight }}>
          <div className="tabs__content-inner">

            {_items.map(({
              _isActive,
              _classes,
              _index,
              title,
              body,
              _graphic
            }, index) =>
              <div
                key={_index}
                id={`${_id}-${index}-tabpanel`}
                role="tabpanel"
                aria-hidden={!_isActive || null}
                aria-labelledby={`${_id}-${index}-tabtitle`}
                tabIndex={_isActive ? 0 : -1}
                data-index={_index}
                className={classes([
                  'tabs__content-item',
                  `item-${index}`,
                  _classes,
                  _isActive && 'is-active'
                ])}
              >
                <div className="tabs__content-item-inner">

                  {title &&
                    <div className="tabs__content-item-title">
                      <div className="tabs__content-item-title-inner" role="heading" aria-level={a11y.ariaLevel({ id: _id, level: 'componentItem' })} dangerouslySetInnerHTML={{ __html: compile(title) }}>
                      </div>
                    </div>
                  }

                  {body &&
                    <div className="tabs__content-item-body">
                      <div className="tabs__content-item-body-inner" dangerouslySetInnerHTML={{ __html: compile(body) }}>
                      </div>
                    </div>
                  }

                  <templates.image {..._graphic}
                    classNamePrefixes={['component__item', 'tabs__content-item']}
                    attributionClassNamePrefixes={['component', 'tabs__content-item']}
                  />

                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
