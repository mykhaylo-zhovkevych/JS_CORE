import { CanDeactivateFn } from '@angular/router';

export interface HasUnsavedChanges {
  hasUnsavedChanges(): boolean;
}

export const unsavedChangesGuard: CanDeactivateFn<HasUnsavedChanges> = (component) => {
  //console.log('[unsavedChangesGuard]', component.hasUnsavedChanges());

  return !component.hasUnsavedChanges() || confirm('You have an unsaved comment. Leave anyway?');
};
