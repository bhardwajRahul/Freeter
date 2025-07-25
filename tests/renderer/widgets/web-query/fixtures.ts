/*
 * Copyright: (c) 2024, Alex Kaul
 * GNU General Public License v3.0 or later (see COPYING or https://www.gnu.org/licenses/gpl-3.0.txt)
 */

import { Settings, SettingsMode } from '@/widgets/web-query/settings';

export function fixtureSettings(settings: Partial<Settings>): Settings {
  return {
    descr: 'Descr',
    engine: 'ddgo',
    mode: SettingsMode.Browser,
    query: '',
    url: '',
    ...settings
  }
}
