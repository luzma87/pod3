import { DateTime } from 'luxon';
import React, { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';

const lngs = {
  en: { nativeName: 'English' },
  de: { nativeName: 'Deutsch' },
  es: { nativeName: 'Español' },
};

const getGreetingTime = (d = DateTime.now()) => {
  const splitAfternoon = 12; // 24hr time to split the afternoon
  const splitEvening = 17; // 24hr time to split the evening
  const currentHour = parseFloat(d.toFormat('HH'));

  if (currentHour >= splitAfternoon && currentHour <= splitEvening) {
    return 'afternoon';
  } if (currentHour >= splitEvening) {
    return 'evening';
  }
  return 'morning';
};

function I18nDemo() {
  const { t, i18n } = useTranslation();
  const [count, setCounter] = useState(0);

  return (
    <div>
      <div className="App">
        <header className="App-header">
          <div>
            {Object.keys(lngs).map((lng) => (
              <button
                key={lng}
                style={{ fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal' }}
                type="submit"
                onClick={() => {
                  i18n.changeLanguage(lng);
                  setCounter(count + 1);
                }}
              >
                {lngs[lng].nativeName}
              </button>
            ))}
          </div>
          <p>
            <i>{t('counter', { count })}</i>
          </p>
          <p>
            <Trans i18nKey="description.part1">
              Edit
              <strong>src/App.js</strong>
              and save to reload.
            </Trans>
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('description.part2')}
          </a>
        </header>
      </div>
      <div className="Footer">
        <div>
          {t('footer.date', { date: new Date(), context: getGreetingTime() })}
        </div>
      </div>
    </div>
  );
}

I18nDemo.propTypes = {};

export default I18nDemo;
