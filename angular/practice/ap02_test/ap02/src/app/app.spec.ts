import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { App } from './app';
import { MyLayout } from './components/navigation/layout.component';
import { FormsModule } from '@angular/forms';
import { SimpleCalc } from './calc/simple-calc';
import { AdvancedCalc } from './calc/advanced-calc';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        FormsModule,
        MyLayout
      ],
      declarations: [
        App, SimpleCalc, AdvancedCalc
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('ap02');
  });
});
