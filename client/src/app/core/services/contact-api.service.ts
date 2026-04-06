import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { ContactSubmissionPayload, ContactSubmissionResponse } from '../../shared/models/portfolio-content.model';

@Injectable({
  providedIn: 'root',
})
export class ContactApiService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = '/api/contact';

  submitProjectBrief(payload: ContactSubmissionPayload): Observable<ContactSubmissionResponse> {
    return this.http.post<ContactSubmissionResponse>(this.apiUrl, payload);
  }
}
