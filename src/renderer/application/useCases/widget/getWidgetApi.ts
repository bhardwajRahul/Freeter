/*
 * Copyright: (c) 2024, Alex Kaul
 * GNU General Public License v3.0 or later (see COPYING or https://www.gnu.org/licenses/gpl-3.0.txt)
 */

import { ClipboardProvider } from '@/application/interfaces/clipboardProvider';
import { ProcessProvider } from '@/application/interfaces/processProvider';
import { ShellProvider } from '@/application/interfaces/shellProvider';
import { DataStorageRenderer } from '@/application/interfaces/dataStorage';
import { EntityId } from '@/base/entity';
import { WidgetApiExposeApiHandler, WidgetApiModuleName, WidgetApiSetContextMenuFactoryHandler, WidgetApiUpdateActionBarHandler, createWidgetApiFactory } from '@/base/widgetApi';
import { ObjectManager } from '@common/base/objectManager';
import { TerminalProvider } from '@/application/interfaces/terminalProvider';
import { GetWidgetsInCurrentWorkflowUseCase } from '@/application/useCases/widget/widgetApiWidgets/getWidgetsInCurrentWorkflow';

interface Deps {
  clipboardProvider: ClipboardProvider;
  widgetDataStorageManager: ObjectManager<DataStorageRenderer>;
  processProvider: ProcessProvider;
  shellProvider: ShellProvider;
  terminalProvider: TerminalProvider;
  getWidgetsInCurrentWorkflowUseCase: GetWidgetsInCurrentWorkflowUseCase;
}
function _createWidgetApiFactory({
  clipboardProvider,
  processProvider,
  shellProvider,
  widgetDataStorageManager,
  terminalProvider,
  getWidgetsInCurrentWorkflowUseCase,
}: Deps, forPreview: boolean) {
  return createWidgetApiFactory(
    (_widgetId, updateActionBarHandler, setWidgetContextMenuFactoryHandler, exposeApiHandler) => ({
      updateActionBar: !forPreview ? (actionBarItems) => {
        updateActionBarHandler(actionBarItems);
      } : () => undefined,
      setContextMenuFactory: !forPreview ? (factory) => {
        setWidgetContextMenuFactoryHandler(factory);
      } : () => undefined,
      exposeApi: !forPreview ? (api) => {
        exposeApiHandler(api)
      } : () => undefined,
    }),
    {
      clipboard: () => ({
        writeBookmark: (title, url) => clipboardProvider.writeBookmark(title, url),
        writeText: (text) => clipboardProvider.writeText(text)
      }),
      dataStorage: (widgetId) => {
        const widgetDataStorage = widgetDataStorageManager.getObject(widgetId);
        return {
          clear: async () => (await widgetDataStorage).clear(),
          getJson: async (key) => (await widgetDataStorage).getJson(key),
          getText: async (key) => (await widgetDataStorage).getText(key),
          remove: async (key) => (await widgetDataStorage).deleteItem(key),
          setJson: async (key, value) => (await widgetDataStorage).setJson(key, value),
          setText: async (key, value) => (await widgetDataStorage).setText(key, value),
          getKeys: async () => (await widgetDataStorage).getKeys()
        }
      },
      process: () => ({
        getProcessInfo: () => processProvider.getProcessInfo()
      }),
      shell: () => ({
        openApp: (appPath, args) => shellProvider.openApp(appPath, args),
        openExternalUrl: (url) => shellProvider.openExternal(url),
        openPath: (path) => shellProvider.openPath(path)
      }),
      terminal: () => ({
        execCmdLines: (cmdLines, cwd) => terminalProvider.execCmdLines(cmdLines, cwd)
      }),
      widgets: () => ({
        getWidgetsInCurrentWorkflow: (widgetTypeId) => getWidgetsInCurrentWorkflowUseCase(widgetTypeId)
      })
    }
  )
}

export function createGetWidgetApiUseCase(deps: Deps) {
  const widgetApiFactory = _createWidgetApiFactory(deps, false);
  const widgetApiPreviewFactory = _createWidgetApiFactory(deps, true);

  function getWidgetApiUseCase(
    widgetId: EntityId,
    forPreview: boolean,
    updateActionBarHandler: WidgetApiUpdateActionBarHandler,
    setContextMenuFactoryHandler: WidgetApiSetContextMenuFactoryHandler,
    exposeApiHandler: WidgetApiExposeApiHandler,
    requiredModules: WidgetApiModuleName[]
  ) {
    return forPreview
      ? widgetApiPreviewFactory(widgetId, updateActionBarHandler, setContextMenuFactoryHandler, exposeApiHandler, requiredModules)
      : widgetApiFactory(widgetId, updateActionBarHandler, setContextMenuFactoryHandler, exposeApiHandler, requiredModules);
  }

  return getWidgetApiUseCase;
}

export type GetWidgetApiUseCase = ReturnType<typeof createGetWidgetApiUseCase>;
