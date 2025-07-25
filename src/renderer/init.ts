/*
 * Copyright: (c) 2024, Alex Kaul
 * GNU General Public License v3.0 or later (see COPYING or https://www.gnu.org/licenses/gpl-3.0.txt)
 */

import { createDragEndUseCase } from '@/application/useCases/dragDrop/dragEnd';
import { createDragLeaveTargetUseCase } from '@/application/useCases/dragDrop/dragLeaveTarget';
import { createDragOverTopBarListUseCase } from '@/application/useCases/dragDrop/dragOverTopBarList';
import { createDragOverWorktableLayoutUseCase } from '@/application/useCases/dragDrop/dragOverWorktableLayout';
import { createDragWidgetFromPaletteUseCase } from '@/application/useCases/dragDrop/dragWidgetFromPalette';
import { createDragWidgetFromTopBarListUseCase } from '@/application/useCases/dragDrop/dragWidgetFromTopBarList';
import { createDragWidgetFromWorktableLayoutUseCase } from '@/application/useCases/dragDrop/dragWidgetFromWorktableLayout';
import { createDropOnTopBarListUseCase } from '@/application/useCases/dragDrop/dropOnTopBarList';
import { createDropOnWorktableLayoutUseCase } from '@/application/useCases/dragDrop/dropOnWorktableLayout';
import { createResizeLayoutItemUseCase, createResizeLayoutItemEndUseCase, createResizeLayoutItemStartUseCase } from '@/application/useCases/worktable/resizeLayoutItem';
import { uuidv4IdGenerator } from '@/infra/idGenerator/uuidv4IdGenerator';
import { createAppComponent } from '@/ui/components/app';
import { createPaletteComponent } from '@/ui/components/palette';
import { createPaletteViewModelHook } from '@/ui/components/palette/paletteViewModel';
import { createTopBarComponent } from '@/ui/components/topBar';
import { createShelfComponent, createShelfItemComponent } from '@/ui/components/topBar/shelf';
import { createShelfViewModelHook } from '@/ui/components/topBar/shelf/shelfViewModel';
import { createWorktableComponent } from '@/ui/components/worktable';
import { createWidgetLayoutComponent, createWidgetLayoutItemComponent } from '@/ui/components/worktable/widgetLayout';
import { createWidgetLayoutViewModelHook } from '@/ui/components/worktable/widgetLayout/widgetLayoutViewModel';
import { createWorkflowSwitcherComponent, createWorkflowSwitcherViewModelHook } from '@/ui/components/workflowSwitcher';
import { createProjectSwitcherComponent, createProjectSwitcherViewModelHook } from '@/ui/components/projectSwitcher';
import { createSwitchProjectUseCase } from '@/application/useCases/projectSwitcher/switchProject';
import { createSwitchWorkflowUseCase } from '@/application/useCases/workflowSwitcher/switchWorkflow';
import { createDragOverWorkflowSwitcherUseCase } from '@/application/useCases/dragDrop/dragOverWorkflowSwitcher';
import { createDragWorkflowFromWorkflowSwitcherUseCase } from '@/application/useCases/dragDrop/dragWorkflowFromWorkflowSwitcher';
import { createDropOnWorkflowSwitcherUseCase } from '@/application/useCases/dragDrop/dropOnWorkflowSwitcher';
import { registry } from '@/registry/registry';
import { createWidgetComponent, createWidgetViewModelHook } from '@/ui/components/widget';
import { createOpenWidgetSettingsUseCase } from '@/application/useCases/widgetSettings/openWidgetSettings';
import { createWidgetSettingsComponent, createWidgetSettingsViewModelHook } from '@/ui/components/widgetSettings';
import { createCloseWidgetSettingsUseCase } from '@/application/useCases/widgetSettings/closeWidgetSettings';
import { createSaveWidgetSettingsUseCase } from '@/application/useCases/widgetSettings/saveWidgetSettings';
import { createWidgetByIdComponent } from '@/ui/components/widget/widgetById';
import { createWidgetByIdViewModelHook } from '@/ui/components/widget/widgetByIdViewModel';
import { createEditModeToggleComponent, createEditModeToggleViewModelHook } from '@/ui/components/editModeToggle';
import { createToggleEditModeUseCase } from '@/application/useCases/toggleEditMode';
import { createToggleMenuBarUseCase } from '@/application/useCases/toggleMenuBar';
import { createAppStore } from '@/data/appStore';
import { createAppState } from '@/base/state/app';
import { entityStateActions } from '@/base/state/actions';
import { createAppStateHook } from '@/ui/hooks/appState';
import { createAppStateStorage } from '@/data/appStateStorage';
import { createAppDataStorage } from '@/infra/dataStorage/appDataStorage';
import { createOsContextMenuProvider } from '@/infra/contextMenuProvider/osContextMenuProvider';
import { createClickContextMenuItemUseCase } from '@/application/useCases/contextMenu/clickContextMenuItem';
import { createShowWidgetContextMenuUseCase } from '@/application/useCases/widget/showWidgetContextMenu';
import { createClipboardProvider } from '@/infra/clipboardProvider/clipboardProvider';
import { createShellProvider } from '@/infra/shellProvider/shellProvider';
import { createProcessProvider } from '@/infra/processProvider/processProvider';
import { createGetWidgetApiUseCase } from '@/application/useCases/widget/getWidgetApi';
import { DataStorageRenderer } from '@/application/interfaces/dataStorage';
import { DataStorage } from '@common/application/interfaces/dataStorage';
import { setTextOnlyIfChanged } from '@common/infra/dataStorage/setTextOnlyIfChanged';
import { withJson } from '@common/infra/dataStorage/withJson';
import { createObjectManager } from '@common/base/objectManager';
import { copyWidgetDataStorage, createWidgetDataStorage } from '@/infra/dataStorage/widgetDataStorage';
import { createWorktableViewModelHook } from '@/ui/components/worktable/worktableViewModel';
import { createAppViewModelHook } from '@/ui/components/app/appViewModel';
import { createUpdateWidgetCoreSettingsUseCase } from '@/application/useCases/widgetSettings/updateWidgetCoreSettings';
import { createGetWidgetSettingsApiUseCase } from '@/application/useCases/widgetSettings/getWidgetSettingsApi';
import { createOpenWorkflowSettingsUseCase } from '@/application/useCases/workflowSettings/openWorkflowSettings';
import { createWorkflowSettingsComponent, createWorkflowSettingsViewModelHook } from '@/ui/components/workflowSettings';
import { createCloseWorkflowSettingsUseCase } from '@/application/useCases/workflowSettings/closeWorkflowSettings';
import { createSaveWorkflowSettingsUseCase } from '@/application/useCases/workflowSettings/saveWorkflowSettings';
import { createUpdateWorkflowSettingsUseCase } from '@/application/useCases/workflowSettings/updateWorkflowSettings';
import { createProjectManagerComponent, createProjectManagerViewModelHook } from '@/ui/components/projectManager';
import { createAddProjectInProjectManagerUseCase } from '@/application/useCases/projectManager/addProjectInProjectManager';
import { createSaveChangesInProjectManagerUseCase } from '@/application/useCases/projectManager/saveChangesInProjectManager';
import { createSwitchProjectInProjectManagerUseCase } from '@/application/useCases/projectManager/switchProjectInProjectManager';
import { createToggleDeletionInProjectManagerUseCase } from '@/application/useCases/projectManager/toggleDeletionInProjectManager';
import { createUpdateProjectSettingsInProjectManagerUseCase } from '@/application/useCases/projectManager/updateProjectSettingsInProjectManager';
import { createUpdateProjectsOrderInProjectManagerUseCase } from '@/application/useCases/projectManager/updateProjectsOrderInProjectManager';
import { createCloseProjectManagerUseCase } from '@/application/useCases/projectManager/closeProjectManager';
import { createManageProjectsButtonComponent, createManageProjectsButtonViewModelHook } from '@/ui/components/manageProjectsButton';
import { createOpenProjectManagerUseCase } from '@/application/useCases/projectManager/openProjectManager';
import { createAddWorkflowUseCase } from '@/application/useCases/workflowSwitcher/addWorkflow';
import { createRenameWorkflowUseCase } from '@/application/useCases/workflowSwitcher/renameWorkflow';
import { createDeleteWorkflowUseCase } from '@/application/useCases/workflowSwitcher/deleteWorkflow';
import { createOsDialogProvider } from '@/infra/dialogProvider/osDialogProvider';
import { createDeleteWidgetUseCase } from '@/application/useCases/widget/deleteWidget';
import { createAddWidgetToWorkflowUseCase } from '@/application/useCases/workflow/addWidgetToWorkflow';
import { createInitAppMenuUseCase } from '@/application/useCases/appMenu/initAppMenu';
import { createAppMenuProvider } from '@/infra/appMenuProvider/appMenuProvider';
import { createClickAppMenuItemUseCase } from '@/application/useCases/appMenu/clickAppMenuItem';
import { createInitMainShortcutUseCase } from '@/application/useCases/globalShortcut/initMainShortcut';
import { createGlobalShortcutProvider } from '@/infra/globalShortcut/globalShortcutProvider';
import { createApplicationSettingsComponent, createApplicationSettingsViewModelHook } from '@/ui/components/applicationSettings';
import { createGetMainHotkeyOptionsUseCase } from '@/application/useCases/applicationSettings/getMainHotkeyOptions';
import { createOpenApplicationSettingsUseCase } from '@/application/useCases/applicationSettings/openApplicationSettings';
import { createCloseApplicationSettingsUseCase } from '@/application/useCases/applicationSettings/closeApplicationSettings';
import { createSaveApplicationSettingsUseCase } from '@/application/useCases/applicationSettings/saveApplicationSettings';
import { createUpdateApplicationSettingsUseCase } from '@/application/useCases/applicationSettings/updateApplicationSettings';
import { createInitTrayMenuUseCase } from '@/application/useCases/trayMenu/initTrayMenu';
import { createTrayMenuProvider } from '@/infra/trayMenuProvider/trayMenuProvider';
import { createClickTrayMenuItemUseCase } from '@/application/useCases/trayMenu/clickTrayMenuItem';
import { createShowBrowserWindowUseCase } from '@/application/useCases/browserWindow/showBrowserWindow';
import { createBrowserWindowProvider } from '@/infra/browserWindowProvider/browserWindowProvider';
import { createAboutComponent } from '@/ui/components/about';
import { createAboutViewModelHook } from '@/ui/components/about/aboutViewModel';
import { createCloseAboutUseCase } from '@/application/useCases/about/closeAbout';
import { createOpenAboutUseCase } from '@/application/useCases/about/openAbout';
import { createGetAboutInfoUseCase } from '@/application/useCases/about/getAboutInfo';
import { createProductInfoProvider } from '@/infra/productInfoProvider/productInfoProvider';
import { createOpenSponsorshipUrlUseCase } from '@/application/useCases/about/openSponsorshipUrl';
import { createTerminalProvider } from '@/infra/terminalProvider/terminalProvider';
import { createShowContextMenuUseCase } from '@/application/useCases/contextMenu/showContextMenu';
import { createDuplicateProjectInProjectManagerUseCase } from '@/application/useCases/projectManager/duplicateProjectInProjectManager';
import { createCloneWidgetSubCase } from '@/application/useCases/widget/subs/cloneWidget';
import { createCloneWorkflowSubCase } from '@/application/useCases/workflow/subs/cloneWorkflow';
import { createCloneWidgetLayoutItemSubCase } from '@/application/useCases/workflow/subs/cloneWidgetLayoutItem';
import { createCopyWidgetUseCase } from '@/application/useCases/widget/copyWidget';
import { createCopyWorkflowUseCase } from '@/application/useCases/workflow/copyWorkflow';
import { createPasteWidgetToShelfUseCase } from '@/application/useCases/shelf/pasteWidgetToShelf';
import { createPasteWidgetToWorkflowUseCase } from '@/application/useCases/workflow/pasteWidgetToWorkflow';
import { createPasteWorkflowUseCase } from '@/application/useCases/workflowSwitcher/pasteWorkflow';
import { createAddItemToWidgetListSubCase } from '@/application/useCases/shelf/subs/addItemToWidgetList';
import { createAddItemToWidgetLayoutSubCase } from '@/application/useCases/workflow/subs/addItemToWidgetLayout';
import { createCloneWidgetToWidgetLayoutSubCase } from '@/application/useCases/workflow/subs/cloneWidgetToWidgetLayout';
import { createCloneWidgetToWidgetListSubCase } from '@/application/useCases/shelf/subs/cloneWidgetToWidgetList';
import { createAddWidgetToShelfUseCase } from '@/application/useCases/shelf/addWidgetToShelf';
import { createCreateWidgetSubCase } from '@/application/useCases/widget/subs/createWidget';
import { createCreateWorkflowSubCase } from '@/application/useCases/workflow/subs/createWorkflow';
import { createTopBarViewModelHook } from '@/ui/components/topBar/topBarViewModel';
import { createAppManagerComponent, createAppManagerViewModelHook } from '@/ui/components/appManager';
import { createAddAppInAppManagerUseCase } from '@/application/useCases/appManager/addAppInAppManager';
import { createSaveChangesInAppManagerUseCase } from '@/application/useCases/appManager/saveChangesInAppManager';
import { createSwitchAppInAppManagerUseCase } from '@/application/useCases/appManager/switchAppInAppManager';
import { createToggleDeletionInAppManagerUseCase } from '@/application/useCases/appManager/toggleDeletionInAppManager';
import { createDuplicateAppInAppManagerUseCase } from '@/application/useCases/appManager/duplicateAppInAppManager';
import { createUpdateAppSettingsInAppManagerUseCase } from '@/application/useCases/appManager/updateAppSettingsInAppManager';
import { createUpdateAppsOrderInAppManagerUseCase } from '@/application/useCases/appManager/updateAppsOrderInAppManager';
import { createCloseAppManagerUseCase } from '@/application/useCases/appManager/closeAppManager';
import { createOpenAppManagerUseCase } from '@/application/useCases/appManager/openAppManager';
import { createShowOpenFileDialogUseCase } from '@/application/useCases/dialog/showOpenFileDialog';
import { createInitMemSaverUseCase } from '@/application/useCases/memSaver/initMemSaver';
import { createDeactivateWorkflowUseCase } from '@/application/useCases/memSaver/deactivateWorkflow';
import { createToggleTopBarUseCase } from '@/application/useCases/toggleTopBar';
import { createSetProjectSwitcherPositionUseCase } from '@/application/useCases/projectSwitcher/setProjectSwitcherPosition';
import { createSetEditTogglePositionUseCase } from '@/application/useCases/setEditTogglePosition';
import { createGetWidgetsInCurrentWorkflowUseCase } from '@/application/useCases/widget/widgetApiWidgets/getWidgetsInCurrentWorkflow';
import { createSetExposedApiUseCase } from '@/application/useCases/widget/setExposedApi';

function prepareDataStorageForRenderer(dataStorage: DataStorage): DataStorageRenderer {
  return setTextOnlyIfChanged(withJson(dataStorage));
}

function createStore() {
  const { promise: appStoreReady, resolve } = Promise.withResolvers<boolean>();

  const firstRunState = createAppState();

  const appState = entityStateActions.widgetTypes.setAll(firstRunState, registry.getWidgetTypes());
  const dataStorage = prepareDataStorageForRenderer(createAppDataStorage());
  const [appStore, appStoreForUi] = createAppStore({
    stateStorage: createAppStateStorage(
      dataStorage,
    )
  }, appState, () => {
    resolve(true);
  });

  return {
    appStore,
    appStoreForUi,
    appStoreReady,
  } as const;
}

async function createUseCases(store: ReturnType<typeof createStore>) {
  const deps = {
    appStore: store.appStore,
    idGenerator: uuidv4IdGenerator,
  }

  const openAppManagerUseCase = createOpenAppManagerUseCase(deps);

  const osDialogProvider = createOsDialogProvider();

  const openWidgetSettingsUseCase = createOpenWidgetSettingsUseCase(deps);
  const closeWidgetSettingsUseCase = createCloseWidgetSettingsUseCase(deps);
  const saveWidgetSettingsUseCase = createSaveWidgetSettingsUseCase(deps);
  const getWidgetSettingsApiUseCase = createGetWidgetSettingsApiUseCase({
    ...deps,
    dialogProvider: osDialogProvider,
    openAppManagerUseCase
  });
  const updateWidgetCoreSettingsUseCase = createUpdateWidgetCoreSettingsUseCase(deps);

  const resizeLayoutItemUseCase = createResizeLayoutItemUseCase(deps);
  const resizeLayoutItemStartUseCase = createResizeLayoutItemStartUseCase(deps);
  const resizeLayoutItemEndUseCase = createResizeLayoutItemEndUseCase(deps);

  const deactivateWorkflowUseCase = createDeactivateWorkflowUseCase(deps);
  const initMemSaverUseCase = createInitMemSaverUseCase({
    ...deps,
    deactivateWorkflowUseCase
  })

  const switchProjectUseCase = createSwitchProjectUseCase({
    ...deps,
    deactivateWorkflowUseCase
  });

  const createWorkflowSubCase = createCreateWorkflowSubCase(deps)

  const switchWorkflowUseCase = createSwitchWorkflowUseCase({
    ...deps,
    deactivateWorkflowUseCase
  });
  const addWorkflowUseCase = createAddWorkflowUseCase({
    ...deps,
    createWorkflowSubCase,
    deactivateWorkflowUseCase
  });
  const renameWorkflowUseCase = createRenameWorkflowUseCase(deps);
  const openWorkflowSettingsUseCase = createOpenWorkflowSettingsUseCase(deps);
  const closeWorkflowSettingsUseCase = createCloseWorkflowSettingsUseCase(deps);
  const saveWorkflowSettingsUseCase = createSaveWorkflowSettingsUseCase(deps);
  const updateWorkflowSettingsUseCase = createUpdateWorkflowSettingsUseCase(deps);
  const deleteWorkflowUseCase = createDeleteWorkflowUseCase({
    ...deps,
    dialog: osDialogProvider,
    deactivateWorkflowUseCase
  });

  const toggleEditModeUseCase = createToggleEditModeUseCase(deps);
  const toggleMenuBarUseCase = createToggleMenuBarUseCase(deps);
  const toggleTopBarUseCase = createToggleTopBarUseCase(deps);
  const setProjectSwitcherPositionUseCase = createSetProjectSwitcherPositionUseCase(deps);
  const setEditTogglePositionUseCase = createSetEditTogglePositionUseCase(deps);

  const clickContextMenuItemUseCase = createClickContextMenuItemUseCase();
  const osContextMenuProvider = createOsContextMenuProvider({ clickContextMenuItemUseCase });

  const showWidgetContextMenuUseCase = createShowWidgetContextMenuUseCase({
    ...deps,
    contextMenuProvider: osContextMenuProvider,
  });

  const showOpenFileDialogUseCase = createShowOpenFileDialogUseCase({
    ...deps,
    dialog: osDialogProvider
  })

  const getWidgetsInCurrentWorkflowUseCase = createGetWidgetsInCurrentWorkflowUseCase(deps);

  const clipboardProvider = createClipboardProvider();
  const shellProvider = createShellProvider();
  const processProvider = await createProcessProvider();
  const widgetDataStorageManager = createObjectManager(
    async widgetId => prepareDataStorageForRenderer(createWidgetDataStorage(widgetId)),
    copyWidgetDataStorage
  )
  const terminalProvider = createTerminalProvider();
  const getWidgetApiUseCase = createGetWidgetApiUseCase({
    clipboardProvider,
    processProvider,
    shellProvider,
    widgetDataStorageManager,
    terminalProvider,
    getWidgetsInCurrentWorkflowUseCase,
  })
  const deleteWidgetUseCase = createDeleteWidgetUseCase({
    ...deps,
    dialog: osDialogProvider
  })

  const cloneWidgetSubCase = createCloneWidgetSubCase({
    ...deps,
    widgetDataStorageManager
  })
  const cloneWidgetLayoutItemSubCase = createCloneWidgetLayoutItemSubCase({
    ...deps,
    cloneWidgetSubCase
  });
  const cloneWorkflowSubCase = createCloneWorkflowSubCase({
    ...deps,
    cloneWidgetLayoutItemSubCase,
  })

  const addProjectInProjectManagerUseCase = createAddProjectInProjectManagerUseCase(deps);
  const saveChangesInProjectManagerUseCase = createSaveChangesInProjectManagerUseCase({
    ...deps,
    cloneWorkflowSubCase,
    createWorkflowSubCase,
    deactivateWorkflowUseCase,
  });
  const switchProjectInProjectManagerUseCase = createSwitchProjectInProjectManagerUseCase(deps);
  const toggleDeletionInProjectManagerUseCase = createToggleDeletionInProjectManagerUseCase(deps);
  const duplicateProjectInProjectManagerUseCase = createDuplicateProjectInProjectManagerUseCase(deps);
  const updateProjectSettingsInProjectManagerUseCase = createUpdateProjectSettingsInProjectManagerUseCase(deps);
  const updateProjectsOrderInProjectManagerUseCase = createUpdateProjectsOrderInProjectManagerUseCase(deps);
  const closeProjectManagerUseCase = createCloseProjectManagerUseCase(deps);
  const openProjectManagerUseCase = createOpenProjectManagerUseCase(deps);

  const addAppInAppManagerUseCase = createAddAppInAppManagerUseCase(deps);
  const saveChangesInAppManagerUseCase = createSaveChangesInAppManagerUseCase(deps);
  const switchAppInAppManagerUseCase = createSwitchAppInAppManagerUseCase(deps);
  const toggleDeletionInAppManagerUseCase = createToggleDeletionInAppManagerUseCase(deps);
  const duplicateAppInAppManagerUseCase = createDuplicateAppInAppManagerUseCase(deps);
  const updateAppSettingsInAppManagerUseCase = createUpdateAppSettingsInAppManagerUseCase(deps);
  const updateAppsOrderInAppManagerUseCase = createUpdateAppsOrderInAppManagerUseCase(deps);
  const closeAppManagerUseCase = createCloseAppManagerUseCase(deps);

  const productInfoProvider = createProductInfoProvider();
  const openAboutUseCase = createOpenAboutUseCase(deps);
  const closeAboutUseCase = createCloseAboutUseCase(deps);
  const getAboutInfoUseCase = createGetAboutInfoUseCase({
    ...deps,
    processProvider,
    productInfoProvider
  });
  const openSponsorshipUrlUseCase = createOpenSponsorshipUrlUseCase({ shellProvider });

  const getMainHotkeyOptionsUseCase = createGetMainHotkeyOptionsUseCase({
    ...deps,
    process: processProvider
  })
  const openApplicationSettingsUseCase = createOpenApplicationSettingsUseCase(deps);
  const closeApplicationSettingsUseCase = createCloseApplicationSettingsUseCase(deps);
  const saveApplicationSettingsUseCase = createSaveApplicationSettingsUseCase(deps);
  const updateApplicationSettingsUseCase = createUpdateApplicationSettingsUseCase(deps);

  const clickAppMenuItemUseCase = createClickAppMenuItemUseCase();
  const appMenuProvider = createAppMenuProvider({
    clickAppMenuItemUseCase
  });
  const initAppMenuUseCase = createInitAppMenuUseCase({
    ...deps,
    appMenu: appMenuProvider,
    processProvider,
    shellProvider,
    toggleEditModeUseCase,
    toggleMenuBarUseCase,
    toggleTopBarUseCase,
    setProjectSwitcherPositionUseCase,
    setEditTogglePositionUseCase,
    openApplicationSettingsUseCase,
    openAboutUseCase,
    openAppManagerUseCase,
    openProjectManagerUseCase
  });

  const browserWindow = createBrowserWindowProvider();
  const showBrowserWindowUseCase = createShowBrowserWindowUseCase({ browserWindow });

  const clickTrayMenuItemUseCase = createClickTrayMenuItemUseCase();
  const trayMenuProvider = createTrayMenuProvider({
    clickTrayMenuItemUseCase
  })
  const initTrayMenuUseCase = createInitTrayMenuUseCase({
    ...deps,
    trayMenu: trayMenuProvider,
    switchProjectUseCase,
    showBrowserWindowUseCase,
  });

  const globalShortcutProvider = createGlobalShortcutProvider();
  const initMainShortcutUseCase = createInitMainShortcutUseCase({
    ...deps,
    globalShortcut: globalShortcutProvider
  })

  const showContextMenuUseCase = createShowContextMenuUseCase({ contextMenu: osContextMenuProvider })

  const createWidgetSubCase = createCreateWidgetSubCase(deps);
  const addItemToWidgetListSubCase = createAddItemToWidgetListSubCase(deps);
  const copyWidgetUseCase = createCopyWidgetUseCase(deps);
  const cloneWidgetToWidgetListSubCase = createCloneWidgetToWidgetListSubCase({
    ...deps,
    addItemToWidgetListSubCase,
    cloneWidgetSubCase
  })
  const addWidgetToShelfUseCase = createAddWidgetToShelfUseCase({
    ...deps,
    addItemToWidgetListSubCase,
    createWidgetSubCase
  })
  const pasteWidgetToShelfUseCase = createPasteWidgetToShelfUseCase({
    ...deps,
    cloneWidgetToWidgetListSubCase
  });
  const addItemToWidgetLayoutSubCase = createAddItemToWidgetLayoutSubCase(deps);
  const cloneWidgetToWidgetLayoutSubCase = createCloneWidgetToWidgetLayoutSubCase({
    ...deps,
    addItemToWidgetLayoutSubCase,
    cloneWidgetSubCase
  })
  const pasteWidgetToWorkflowUseCase = createPasteWidgetToWorkflowUseCase({
    ...deps,
    cloneWidgetToWidgetLayoutSubCase
  });

  const copyWorkflowUseCase = createCopyWorkflowUseCase(deps);
  const pasteWorkflowUseCase = createPasteWorkflowUseCase({
    ...deps,
    cloneWorkflowSubCase,
    deactivateWorkflowUseCase,
  });

  const dragWidgetFromWorktableLayoutUseCase = createDragWidgetFromWorktableLayoutUseCase(deps);
  const dragOverWorktableLayoutUseCase = createDragOverWorktableLayoutUseCase(deps);
  const dropOnWorktableLayoutUseCase = createDropOnWorktableLayoutUseCase({
    ...deps,
    cloneWidgetToWidgetLayoutSubCase,
    addItemToWidgetLayoutSubCase,
    createWidgetSubCase
  });
  const dragWidgetFromTopBarListUseCase = createDragWidgetFromTopBarListUseCase(deps);
  const dragOverTopBarListUseCase = createDragOverTopBarListUseCase(deps);
  const dragLeaveTargetUseCase = createDragLeaveTargetUseCase(deps);
  const dropOnTopBarListUseCase = createDropOnTopBarListUseCase({
    ...deps,
    cloneWidgetToWidgetListSubCase,
    addItemToWidgetListSubCase,
    createWidgetSubCase
  });
  const dragWidgetFromPaletteUseCase = createDragWidgetFromPaletteUseCase(deps);
  const addWidgetToWorkflowUseCase = createAddWidgetToWorkflowUseCase({
    ...deps,
    addItemToWidgetLayoutSubCase,
    createWidgetSubCase
  });
  const dragEndUseCase = createDragEndUseCase(deps);
  const dragOverWorkflowSwitcherUseCase = createDragOverWorkflowSwitcherUseCase(deps);
  const dragWorkflowFromWorkflowSwitcherUseCase = createDragWorkflowFromWorkflowSwitcherUseCase(deps);
  const dropOnWorkflowSwitcherUseCase = createDropOnWorkflowSwitcherUseCase(deps);

  const setExposedApiUseCase = createSetExposedApiUseCase(deps);

  return {
    dragWidgetFromWorktableLayoutUseCase,
    dragOverWorktableLayoutUseCase,
    dropOnWorktableLayoutUseCase,
    dragWidgetFromTopBarListUseCase,
    dragOverTopBarListUseCase,
    dragLeaveTargetUseCase,
    dropOnTopBarListUseCase,
    dragWidgetFromPaletteUseCase,
    addWidgetToWorkflowUseCase,
    dragEndUseCase,
    dragOverWorkflowSwitcherUseCase,
    dragWorkflowFromWorkflowSwitcherUseCase,
    dropOnWorkflowSwitcherUseCase,
    openWidgetSettingsUseCase,
    closeWidgetSettingsUseCase,
    saveWidgetSettingsUseCase,
    getWidgetSettingsApiUseCase,
    updateWidgetCoreSettingsUseCase,
    resizeLayoutItemUseCase,
    resizeLayoutItemStartUseCase,
    resizeLayoutItemEndUseCase,
    switchProjectUseCase,
    switchWorkflowUseCase,
    addWorkflowUseCase,
    renameWorkflowUseCase,
    openWorkflowSettingsUseCase,
    closeWorkflowSettingsUseCase,
    saveWorkflowSettingsUseCase,
    updateWorkflowSettingsUseCase,
    deleteWorkflowUseCase,

    toggleEditModeUseCase,
    toggleMenuBarUseCase,

    clickContextMenuItemUseCase,

    showWidgetContextMenuUseCase,

    showOpenFileDialogUseCase,

    getWidgetApiUseCase,
    deleteWidgetUseCase,

    addProjectInProjectManagerUseCase,
    saveChangesInProjectManagerUseCase,
    switchProjectInProjectManagerUseCase,
    toggleDeletionInProjectManagerUseCase,
    duplicateProjectInProjectManagerUseCase,
    updateProjectSettingsInProjectManagerUseCase,
    updateProjectsOrderInProjectManagerUseCase,
    closeProjectManagerUseCase,
    openProjectManagerUseCase,

    addAppInAppManagerUseCase,
    saveChangesInAppManagerUseCase,
    switchAppInAppManagerUseCase,
    toggleDeletionInAppManagerUseCase,
    duplicateAppInAppManagerUseCase,
    updateAppSettingsInAppManagerUseCase,
    updateAppsOrderInAppManagerUseCase,
    closeAppManagerUseCase,
    openAppManagerUseCase,

    initAppMenuUseCase,
    initTrayMenuUseCase,
    initMainShortcutUseCase,

    getMainHotkeyOptionsUseCase,
    openApplicationSettingsUseCase,
    closeApplicationSettingsUseCase,
    saveApplicationSettingsUseCase,
    updateApplicationSettingsUseCase,

    showBrowserWindowUseCase,

    openAboutUseCase,
    closeAboutUseCase,
    getAboutInfoUseCase,
    openSponsorshipUrlUseCase,

    showContextMenuUseCase,

    copyWidgetUseCase,
    addWidgetToShelfUseCase,
    pasteWidgetToShelfUseCase,
    pasteWidgetToWorkflowUseCase,
    copyWorkflowUseCase,
    pasteWorkflowUseCase,

    deactivateWorkflowUseCase,
    initMemSaverUseCase,

    setExposedApiUseCase
  }
}

function createUiHooks(store: ReturnType<typeof createStore>, _useCases: Awaited<ReturnType<typeof createUseCases>>) {
  const {
    appStoreForUi,
  } = store;

  return {
    useAppState: createAppStateHook(appStoreForUi),
  }
}

function createUI(stateHooks: ReturnType<typeof createUiHooks>, useCases: Awaited<ReturnType<typeof createUseCases>>) {
  const deps = {
    ...stateHooks,
    ...useCases,
  }

  const useProjectSwitcherViewModel = createProjectSwitcherViewModelHook(deps);
  const ProjectSwitcher = createProjectSwitcherComponent({
    useProjectSwitcherViewModel
  })

  const usePaletteViewModel = createPaletteViewModelHook(deps);
  const Palette = createPaletteComponent({
    usePaletteViewModel
  });

  const useWidgetViewModel = createWidgetViewModelHook(deps);
  const Widget = createWidgetComponent({
    useWidgetViewModel
  });

  const useWidgetByIdViewModel = createWidgetByIdViewModelHook(deps);
  const WidgetById = createWidgetByIdComponent({
    Widget,
    useWidgetByIdViewModel
  })

  const useWidgetLayoutViewModel = createWidgetLayoutViewModelHook(deps);
  const WidgetLayoutItem = createWidgetLayoutItemComponent({
    WidgetById
  })

  const WidgetLayout = createWidgetLayoutComponent({
    WidgetLayoutItem,
    useWidgetLayoutViewModel
  });

  const useEditModeToggleViewModel = createEditModeToggleViewModelHook(deps);
  const EditModeToggle = createEditModeToggleComponent({
    useEditModeToggleViewModel
  })

  const ShelfItem = createShelfItemComponent({
    Widget
  })
  const useShelfViewModel = createShelfViewModelHook(deps);
  const Shelf = createShelfComponent({
    ShelfItem,
    useShelfViewModel
  });

  const useManageProjectsButtonViewModel = createManageProjectsButtonViewModelHook(deps);
  const ManageProjectsButton = createManageProjectsButtonComponent({
    useManageProjectsButtonViewModel
  })

  const useTopBarViewModel = createTopBarViewModelHook(deps);
  const TopBar = createTopBarComponent({
    EditModeToggle,
    ProjectSwitcher,
    ManageProjectsButton,
    Shelf,
    Palette,
    useTopBarViewModel
  });

  const useWidgetSettingsViewModel = createWidgetSettingsViewModelHook(deps);
  const WidgetSettings = createWidgetSettingsComponent({
    Widget,
    useWidgetSettingsViewModel
  })

  const useWorkflowSettingsViewModel = createWorkflowSettingsViewModelHook(deps);
  const WorkflowSettings = createWorkflowSettingsComponent({
    useWorkflowSettingsViewModel
  })

  const useWorkflowSwitcherViewModel = createWorkflowSwitcherViewModelHook(deps);
  const WorkflowSwitcher = createWorkflowSwitcherComponent({
    useWorkflowSwitcherViewModel,
    EditModeToggle,
    ManageProjectsButton,
    Palette,
    ProjectSwitcher,
  })
  const useWorktableViewModel = createWorktableViewModelHook(deps);
  const Worktable = createWorktableComponent({
    WidgetLayout,
    useWorktableViewModel
  });

  const useProjectManagerViewModel = createProjectManagerViewModelHook(deps);
  const ProjectManager = createProjectManagerComponent({
    useProjectManagerViewModel
  })

  const useApplicationSettingsViewModel = createApplicationSettingsViewModelHook(deps);
  const ApplicationSettings = createApplicationSettingsComponent({
    useApplicationSettingsViewModel
  })

  const useAboutViewModel = createAboutViewModelHook(deps);
  const About = createAboutComponent({ useAboutViewModel });

  const useAppManagerViewModel = createAppManagerViewModelHook(deps);
  const AppManager = createAppManagerComponent({
    useAppManagerViewModel
  })
  const useAppViewModel = createAppViewModelHook({
    ...deps,
    WidgetSettings,
    WorkflowSettings,
    ProjectManager,
    ApplicationSettings,
    AppManager,
    About,
  });

  const App = createAppComponent({
    TopBar,
    WorkflowSwitcher,
    Worktable,
    useAppViewModel,
  });

  return { App };
}

export async function init() {
  const store = createStore();
  const useCases = await createUseCases(store);

  const { initAppMenuUseCase, initMainShortcutUseCase, initTrayMenuUseCase, initMemSaverUseCase } = useCases;
  store.appStoreReady.then(_ => {
    initMainShortcutUseCase();
    initAppMenuUseCase();
    initTrayMenuUseCase();
    initMemSaverUseCase();
  })

  const stateHooks = createUiHooks(store, useCases);
  const { App } = createUI(stateHooks, useCases);

  return { App };
}
