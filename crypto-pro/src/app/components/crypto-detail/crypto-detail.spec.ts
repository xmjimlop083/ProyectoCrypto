import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoDetail } from './crypto-detail';

describe('CryptoDetail', () => {
  let component: CryptoDetail;
  let fixture: ComponentFixture<CryptoDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CryptoDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CryptoDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
