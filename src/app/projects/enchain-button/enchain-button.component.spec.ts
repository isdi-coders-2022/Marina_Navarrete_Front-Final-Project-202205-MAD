import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { AppState } from 'src/app/store/app.state';

import { EnchainButtonComponent } from './enchain-button.component';

const mockInitialState: AppState = {
  schools: { schools: [] },
  sectors: { sectors: [] },
  routes: { routes: [] },
  user: {
    user: {
      _id: '123456',
      name: 'test-user',
      psw: '123456789',
      img: 'src',
      email: 'usertest@gmail.com',
      address: {
        community: '',
        province: '',
      },
      role: 'user',
      routes: [
        {
          route: {
            name: '',
            length: 1,
            grade: '',
            voteGrade: [{ user: '', vote: 1 }],
          },
          isProject: false,
          isEnchain: false,
        },
      ],
    },
    token: '',
  },
};

describe('EnchainButtonComponent', () => {
  let component: EnchainButtonComponent;
  let fixture: ComponentFixture<EnchainButtonComponent>;
  let initialState = mockInitialState;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [EnchainButtonComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(EnchainButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When handleEnchainToggle is calling with token', () => {
    it('should update routes object property', () => {
      component.user.token = 'token';
      component.route = {
        _id: '1234',
        name: '',
        length: 2,
        grade: '2',
        voteGrade: [{ user: '123456', vote: 3 }],
      };
      component.user.user.routes = [
        {
          route: {
            name: '',
            length: 1,
            grade: '',
            voteGrade: [{ user: '', vote: 1 }],
          },
          isProject: false,
          isEnchain: false,
        },
        {
          route: {
            _id: '1234',
            name: '',
            length: 1,
            grade: '',
            voteGrade: [{ user: '', vote: 1 }],
          },
          isProject: false,
          isEnchain: false,
        },
      ];
      spyOn(component.apiUser, 'updateUser').and.returnValue(
        of({ name: 'pepito', psw: '', email: '', address: {}, routes: [] })
      );
      spyOn(component.store, 'dispatch');

      fixture.detectChanges();

      component.handleEnchainToggle();

      expect(component.store.dispatch).toHaveBeenCalled();
    });
  });
  describe('When handleEnchainToggle is calling with token button but the route is not in the array', () => {
    it('should update routes object property', () => {
      component.user.token = 'token';
      component.route = {
        _id: '1234',
        name: '',
        length: 2,
        grade: '2',
        voteGrade: [{ user: '123456', vote: 3 }],
      };
      component.user.user.routes = [
        {
          route: {
            name: '',
            length: 1,
            grade: '',
            voteGrade: [{ user: '', vote: 1 }],
          },
          isProject: false,
          isEnchain: false,
        },
      ];
      spyOn(component.apiUser, 'updateUser').and.returnValue(
        of({ name: 'pepito', psw: '', email: '', address: {}, routes: [] })
      );
      spyOn(component.store, 'dispatch');

      fixture.detectChanges();

      component.handleEnchainToggle();
      expect(component.store.dispatch).toHaveBeenCalled();
    });
  });
  describe('When handleEnchain is calling without token', () => {
    it('should navigate to sign in page', () => {
      component.user.token = '';
      spyOn(component.router, 'navigate');
      fixture.detectChanges();

      component.handleEnchainToggle();
      expect(component.router.navigate).toHaveBeenCalled();
    });
  });
});
