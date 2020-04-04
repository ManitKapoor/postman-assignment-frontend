import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { User } from 'src/app/models/user';

describe('AuthServiceService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should provide user details', () => {
    let userData = service.getUserDetails();
    expect(userData).toBeTruthy();
    expect(userData).toBeInstanceOf(User);
  });

  it('should authenticate user', () => {
    let userData = service.isAuthenticated();
    expect(userData).toBeInstanceOf(Boolean);
  });

});
