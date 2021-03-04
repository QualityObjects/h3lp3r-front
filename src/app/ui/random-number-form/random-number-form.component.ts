import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HashService } from 'src/app/services/hash-service';
import { MessageService } from 'src/app/services/msgs';
import { OpResponse } from 'src/app/domain/responses';
import { BaseEncodingService } from 'src/app/services/base-encoding-service';
import { RandomService } from 'src/app/services/random-service';

@Component({
  selector: 'random-number-form',
  templateUrl: './random-number-form.component.html',
  styleUrls: ['./random-number-form.component.scss']
})
export class RandomNumberFormComponent {

  public form : FormGroup = this.fb.group({
    min: ['', Validators.min(0)],
    max: ['', Validators.min(0)],
  });

  public title?: string;
  public numType: 'int' | 'decimal' = 'int';
  public result: number | null = null;

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
    this.route.params.subscribe(params => {
      this.numType = params['num_type'];
      this.result = null;
      this.title = this.generateTitle(this.numType);
    });
  }

  private generateTitle(numType: string) : string{
    let str = `Random ${numType} number generator`;
    return str;
  }

  public send() {
    if (this.form.valid) {
      this.randomService.number(this.numType, this.form.get('min')?.value, this.form.get('max')?.value)
          .subscribe((resp: OpResponse) => {
            this.result = resp.result;
          });
    }
  }


}

