import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { UserService } from '../auth/user.service';

export const adminMatch: CanMatchFn = (route, segments) => {
  const isAdmin = inject(UserService).role() === 'admin';
  //console.log('[adminMatch]', segments.join('/'), isAdmin);
  return isAdmin;
};
