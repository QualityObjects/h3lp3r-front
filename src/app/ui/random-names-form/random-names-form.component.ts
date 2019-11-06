import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HashService } from 'src/app/services/hash-service';
import { MessageService } from 'src/app/services/msgs';
import { OpResponse } from 'src/app/domain/responses';
import { BaseEncodingService } from 'src/app/services/base-encoding-service';
import { RandomService } from 'src/app/services/random-service';
import { RandomName } from 'src/app/domain/random-data';

@Component({
  selector: 'random-names-form',
  templateUrl: './random-names-form.component.html',
  styleUrls: ['./random-names-form.component.scss']
})
export class RandomNamesFormComponent {

  public form : FormGroup = this.fb.group({
    total: [1, Validators.compose([Validators.min(0), Validators.required])],
    lang: [null, ],
  });

  public title: string;
  public result: RandomName[];

  constructor(
    private fb: FormBuilder,
    private randomService: RandomService,
    private route: ActivatedRoute,
    private msgs: MessageService
  ) { }

  ngOnInit() {
    this.form.valueChanges.subscribe((values) => {
      this.result = null;
    });

  }


  public send() {
    if (this.form.valid) {
      this.randomService.names(this.form.get('total').value, this.form.get('lang').value)
          .subscribe((resp: OpResponse) => {
            this.result = resp.result;
          });
    }
  }


}

