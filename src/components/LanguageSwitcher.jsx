import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import * as Select from '@radix-ui/react-select';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';

const LanguageSwitcher = () => {
  const { language, changeLanguage } = useLanguage();

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ja', name: '日本語' },
  ];

  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

  return (
    <Select.Root
      value={language}
      onValueChange={(value) => changeLanguage(value)}
    >
      <Select.Trigger className="w-[120px] flex items-center justify-between">
        <Select.Value placeholder={currentLanguage.name} />
        <Select.Icon>
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content 
          className="bg-white rounded-md shadow-lg z-[60] overflow-hidden no-scrollbar"
          sideOffset={5}
        >
          <Select.ScrollUpButton className="flex items-center justify-center h-6 bg-white cursor-default">
            <ChevronUpIcon />
          </Select.ScrollUpButton>
          <Select.Viewport 
            className="p-2 w-full max-h-[var(--radix-select-content-available-height)] overflow-y-auto no-scrollbar"
          >
            {languages.map((lang) => (
              <Select.Item
                key={lang.code}
                value={lang.code}
                className="relative flex items-center px-8 py-2 text-sm rounded hover:bg-gray-100 focus:bg-gray-100 outline-none"
              >
                <Select.ItemText>{lang.name}</Select.ItemText>
                <Select.ItemIndicator className="absolute left-2">
                  <CheckIcon />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
          <Select.ScrollDownButton className="flex items-center justify-center h-6 bg-white cursor-default">
            <ChevronDownIcon />
          </Select.ScrollDownButton>
          <Select.Arrow className="fill-white" />
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export default LanguageSwitcher;
