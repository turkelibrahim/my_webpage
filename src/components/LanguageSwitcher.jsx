import { Globe2 } from 'lucide-react';
import { useLanguage } from '../i18n/useLanguage';

const LANGUAGES = [
  { code: 'tr', labelKey: 'language.tr', shortLabel: 'TR' },
  { code: 'en', labelKey: 'language.en', shortLabel: 'EN' },
];

export default function LanguageSwitcher() {
  const { currentLanguage, setLanguage, t } = useLanguage();

  return (
    <div className="language-switcher" aria-label={t('language.label')} role="group">
      <Globe2 size={15} aria-hidden="true" />
      {LANGUAGES.map(language => {
        const isActive = currentLanguage === language.code;

        return (
          <button
            key={language.code}
            type="button"
            className={`language-option${isActive ? ' active' : ''}`}
            onClick={() => setLanguage(language.code)}
            aria-pressed={isActive}
            aria-label={t(language.labelKey)}
            title={t(language.labelKey)}
          >
            {language.shortLabel}
          </button>
        );
      })}
    </div>
  );
}
