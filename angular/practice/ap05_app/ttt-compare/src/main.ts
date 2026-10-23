import { bootstrapApplication } from '@angular/platform-browser';
import { provideZoneChangeDetection, provideZonelessChangeDetection } from '@angular/core';
import { App } from './app/app';
 
// ?zone=1  -> old world: Zone.js triggers change detection after every async task
// (no param) -> new world: zoneless, Angular only renders when something notifies it
const useZone = new URLSearchParams(location.search).get('zone') === '1';
 
async function start() {
  if (useZone) {
    await import('zone.js'); // must be loaded BEFORE bootstrap
  }
  await bootstrapApplication(App, {
    providers: [useZone ? provideZoneChangeDetection() : provideZonelessChangeDetection()],
  });
}
 
start().catch(console.error);
