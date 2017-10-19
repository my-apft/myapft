import { InstructionsComponent } from './instructions.component'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { Component } from '@angular/core'
import { InstructionsModule } from './instructions.module'
import { FirebaseDatabaseService } from '../shared/services/firebase-database.service'
import { of } from 'rxjs/observable/of'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'

describe(InstructionsComponent.name, () => {
  let fixture: ComponentFixture<InstructionsComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [InstructionsModule, NoopAnimationsModule],
      declarations: [TestComponent],
      providers: [
        { provide: FirebaseDatabaseService, useValue: new MockDb() }
      ]
    }).compileComponents()
  }))

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InstructionsComponent)
  }))

  afterEach(async(() => {
    TestBed.resetTestingModule()
  }))

  test.skip('should compile', async(() => {
    fixture.detectChanges()
    expect(fixture.nativeElement).toBeDefined()
    expect(fixture).toMatchSnapshot()
  }))
})

@Component({
  selector: 'test-component',
  template: '<pm-about></pm-about>'
})
class TestComponent {}

class MockDb {
  get() {
    return of('test')
  }
  getList() {
    return of([])
  }
}
