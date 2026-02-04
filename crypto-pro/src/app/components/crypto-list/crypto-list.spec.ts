import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoList } from './crypto-list';

describe('CryptoList', () => {
  let component: CryptoList;
  let fixture: ComponentFixture<CryptoList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CryptoList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CryptoList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
