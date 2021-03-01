import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HashService } from 'src/app/services/hash-service';
import { MessageService } from 'src/app/services/msgs';
import { OpResponse } from 'src/app/domain/responses';

@Component({
  selector: 'hash-form-component',
  templateUrl: './hash-form.component.html',
  styleUrls: ['./hash-form.component.scss']
})
export class HashFormComponent {

  public form : FormGroup = this.fb.group({
    text: ['', Validators.compose([Validators.required, Validators.maxLength(500)])],
  });

  public algorithm?: string;
  public result?: string;

  constructor(
    private fb: FormBuilder,
    private hashService: HashService,
    private route: ActivatedRoute,
    private msgs: MessageService
  ) { }

  ngOnInit() {
    this.form.valueChanges.subscribe((values) => {
      this.result = '';
    });
    this.route.params.subscribe(params => {
      this.algorithm = params['alg'];
      this.result = '';
    });
  }

  public send() {
    if (this.form.valid) {
      this.hashService.hash(this.algorithm!, this.form.get('text')!.value)
          .subscribe((resp: OpResponse) => {
            this.result = resp.result;
          });
    }
  }


}

