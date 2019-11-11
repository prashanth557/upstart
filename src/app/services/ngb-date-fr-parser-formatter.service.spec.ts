import { TestBed, inject } from '@angular/core/testing';

import { NgbDateFrParserFormatterService } from './ngb-date-fr-parser-formatter.service';

describe('NgbDateFrParserFormatterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgbDateFrParserFormatterService]
    });
  });

  it('should be created', inject([NgbDateFrParserFormatterService], (service: NgbDateFrParserFormatterService) => {
    expect(service).toBeTruthy();
  }));
});
