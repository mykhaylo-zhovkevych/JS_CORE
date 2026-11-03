import { Component, inject, signal, viewChild } from '@angular/core';
import { RandomApi } from './core/random-api';
import { Shell, ShellAside } from './layout/shell';
import { TopBar } from './layout/top-bar';
import { StatusBar } from './layout/status-bar';
import { NavItem, SideNav } from './layout/side-nav';
import { DashboardPage } from './dashboard/dashboard-page';

@Component({
  selector: 'app-root',
  imports: [Shell, ShellAside, TopBar, StatusBar, SideNav, NavItem, DashboardPage],
  templateUrl: './app.html',
})
export class App {
  protected readonly api = inject(RandomApi);

  protected readonly section = signal<string | null>('generate');

  // viewChild by component type: instead of a template reference like #shell we pass the
  // class itself, and Angular looks for the first instance of that component in App's view.
  // Both <app-shell> and <app-dashboard-page> are written in App's OWN template (app.html),
  // so App's view queries can see them - even though <app-dashboard-page> ends up being
  // projected (rendered) inside <app-shell>'s <main>. Where an element is written decides
  // who can query it, not where it is finally displayed.
  // .required() means "this is always there": the signal returns Shell instead of Shell | undefined,
  // and Angular throws if it is read before the view exists or the element is missing.
  private readonly shell = viewChild.required(Shell);
  private readonly page = viewChild.required(DashboardPage);

  protected toggleMenu(): void {
    this.shell().toggleAside();
  }

  protected navigate(section: string): void {
    this.page().reveal(section);
  }
}
